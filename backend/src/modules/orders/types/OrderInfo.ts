export interface OrderInfo {
  orderID: string;
  products: Array<{
    productID: string;
    quantity: number;
  }>;
  orderWorth: number;
}
