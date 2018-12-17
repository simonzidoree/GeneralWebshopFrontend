import {Injectable} from '@angular/core';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productsInCart: Product[] = [];

  constructor() {
    if (localStorage.getItem('cartProducts') != null) {
      this.productsInCart = JSON.parse(this.getFromCart());
    }
  }

  addToCart(product: Product) {
    if (localStorage.getItem('cartProducts') != null) {
      this.productsInCart = JSON.parse(this.getFromCart());
    }

    this.productsInCart.push(product);
    localStorage.setItem('cartProducts', JSON.stringify(this.productsInCart));
  }

  getFromCart() {
    return localStorage['cartProducts'];
  }

  removeFromCart(product: Product) {
    const cart_items = JSON.parse(localStorage['cartProducts']);
    for (let i = 0; i < cart_items.length; i++) {
      if (cart_items[i].id === product.productId) {
        cart_items.splice(i, 1);

        break;
      }
    }
    localStorage['cartProducts'] = JSON.stringify(cart_items);
  }
}
