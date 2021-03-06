import {OrderLine} from './OrderLine';

export class Order {
  orderId?: number;
  orderNumber?: number;
  fullName?: string;
  address?: string;
  zipcode?: number;
  city?: string;
  country?: string;
  phoneNumber?: number;
  email?: string;
  comment?: string;
  orderDate?: string;
  isDelivered?: boolean;
  orderLines?: OrderLine[];
}
