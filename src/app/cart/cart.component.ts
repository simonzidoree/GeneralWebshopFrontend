import {Component, OnInit} from '@angular/core';
import {CartService} from '../shared/services/cart.service';
import {Product} from '../shared/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Product[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cart = JSON.parse(this.cartService.getFromCart());

    const allProductIds = this.cart.map(p => p.id).filter((value, index, array) => index === array.indexOf(value));
    for (const allProductId of allProductIds) {
      const amountOfSpecificProduct = this.cart.filter(value => value.id === allProductId).length;
    }
  }
}
