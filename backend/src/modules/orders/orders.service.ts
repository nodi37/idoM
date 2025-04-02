import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IdosellConfig } from 'src/modules/configs/idosell.config';
import { OrderInfo } from './types/OrderInfo';
import { Parser } from 'json2csv';

@Injectable()
export class OrdersService implements OnModuleInit {
  private readonly apiDomain: string;
  private readonly token: string;
  private readonly logger = new Logger(OrdersService.name);
  private data: Array<OrderInfo> = [];

  constructor(idosellConfig: IdosellConfig) {
    this.apiDomain = idosellConfig.domain;
    this.token = idosellConfig.authToken;
  }

  private async fetchExternalData(page = 0) {
    try {
      const response = await fetch(
        `${this.apiDomain}/api/admin/v5/orders/orders/search`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-API-KEY': this.token,
          },
          body: JSON.stringify({
            params: { ordersStatuses: ['finished'], resultsPage: page },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      this.logger.error('Could not fetch data from external service', error);
      throw error;
    }
  }

  @Cron('0 0 * * *')
  private async handleDataUpdate() {
    try {
      this.logger.log('Starting local data update!');

      const initialRequest = await this.fetchExternalData(0);

      if (!initialRequest || !initialRequest.Results) {
        this.logger.warn('No results found in external API response.');
        return;
      }

      const pagesCount = initialRequest.resultsNumberPage - 1;

      const remainingRequests = new Array(pagesCount)
        .fill(undefined)
        .map((_, index) => this.fetchExternalData(index + 1));

      const responses = await Promise.all(remainingRequests);
      const allOrdersData = [initialRequest, ...responses].flatMap(
        (response) => response.Results ?? [],
      );

      const dataToSave = allOrdersData.map((order) => ({
        orderID: order.orderId,
        products: order.orderDetails.productsResults.map(
          ({ productId, productQuantity }) => ({
            productID: productId,
            quantity: productQuantity,
          }),
        ),
        orderWorth: order.orderDetails.productsResults.reduce(
          (sum, product) =>
            sum + product.productQuantity * product.productOrderPrice,
          0,
        ),
      }));

      this.data = dataToSave;
      this.logger.log(`Successfully loaded ${dataToSave.length} orders!`);
    } catch (error) {
      this.logger.error(
        'Could not fetch orders data from external service. The next data refresh attempt will occur in one hour.',
        error,
      );
      setTimeout(() => this.handleDataUpdate(), 3600000);
    }
  }

  async onModuleInit() {
    await this.handleDataUpdate();
  }

  getOrderById(id: string) {
    return this.data.find((order) => order.orderID === id);
  }

  getDataAsCsv(minWorth?: number, maxWorth?: number) {
    try {
      const data = this.data
        .filter((entry) => (minWorth ? entry.orderWorth >= minWorth : true))
        .filter((entry) => (maxWorth ? entry.orderWorth <= maxWorth : true));

      const parser = new Parser({ flatten: true });
      return parser.parse(data);
    } catch (error) {
      this.logger.error('Error generating CSV', error);
      return '';
    }
  }
}
