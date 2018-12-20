import {Product} from './product';

export class OrderLine {
  productId?: number;
  product?: Product;
  orderId?: number;
  qty: number;
  priceWhenBought: number;
}
