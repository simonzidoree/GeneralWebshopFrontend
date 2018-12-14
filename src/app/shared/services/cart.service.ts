import {Injectable} from '@angular/core';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productsInCart: Product[] = [];

  constructor() {
  }

  addToCart(product: Product) {
    this.productsInCart.push(product);
    localStorage.setItem('cartProducts', JSON.stringify(this.productsInCart));
  }

  getFromCart() {
    return localStorage.getItem('cartProducts');
  }

  removeFromCart() {

  }
}
