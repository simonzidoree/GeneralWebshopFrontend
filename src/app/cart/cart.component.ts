import {Component, OnInit} from '@angular/core';
import {CartService} from '../shared/services/cart.service';
import {Product} from '../shared/models/product';
import {CartProduct} from '../shared/models/cartProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Product[] = [];
  cartProducts: CartProduct[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cart = JSON.parse(this.cartService.getFromCart());

    const allProductIds = this.cart.map(p => p.productId)
      .filter((value, index, array) => index === array.indexOf(value));
    for (const allProductId of allProductIds) {
      const amountOfSpecificProduct = this.cart.filter(value => value.productId === allProductId).length;

      const cartProduct: CartProduct = {
        product: this.cart.find(value => value.productId === allProductId),
        numberOfProduct: amountOfSpecificProduct
      };

      this.cartProducts.push(cartProduct);
    }


    for (const productPrice of this.cartProducts) {
      this.totalPrice = this.totalPrice + (productPrice.product.price * productPrice.numberOfProduct);
    }
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.cartProducts.find(value => value.product === product).numberOfProduct--;

    if (this.cartProducts.find(value => value.product === product).numberOfProduct === 0) {
      this.cartProducts.splice(this.cartProducts.findIndex(value => value.product === product), 1);
    }

    this.totalPrice = 0;
    for (const productPrice of this.cartProducts) {
      this.totalPrice = this.totalPrice + (productPrice.product.price * productPrice.numberOfProduct);
    }
  }
}
