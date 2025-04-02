import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { GetAsCsvQueryDTO } from './dtos/get-as-csv-query.dto';
import { Response } from 'express';
import { IdParamDTO } from './dtos/id-param.dto';

@UsePipes(new ValidationPipe())
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('csv')
  async getOrdersAsCSV(@Query() query: GetAsCsvQueryDTO, @Res() res: Response) {
    const { minWorth, maxWorth } = query;
    const csvData = await this.ordersService.getDataAsCsv(minWorth, maxWorth);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="orders.csv"');
    res.send(csvData);
  }

  @Get(':id')
  async getById(@Param() params: IdParamDTO) {
    const { id } = params;
    const orderData = this.ordersService.getOrderById(id);
    if (!orderData) {
      throw new NotFoundException({
        message: `Resource with id: "${id}" has not been found!`,
      });
    }
  }
}
