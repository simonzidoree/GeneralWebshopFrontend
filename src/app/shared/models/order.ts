import {Product} from './product';

export class Order {
  id: number;
  orderNumber: number;
  fullName: string;
  address: string;
  zipcode: number;
  city: string;
  country: string;
  phoneNumber: number;
  email: string;
  comment: string;
  orderDate: string;
  isDelivered: boolean;
  products: Product[];
}
