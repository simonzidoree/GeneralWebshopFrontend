import {OrderLine} from './OrderLine';

export class Product {
  productId?: number;
  title: string;
  description: string;
  price: number;
  image: string;
  amountInStock: number;
  featured: boolean;
  category: string;
  orderLines?: OrderLine[];
}
