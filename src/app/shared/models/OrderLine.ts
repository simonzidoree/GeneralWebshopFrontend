import {Product} from './product';
import {Order} from './order';

export class OrderLine {
  productId?: number;
  product?: Product;
  order?: Order;
  orderId?: number;
  qty: number;
  priceWhenBought: number;
}
