import {Component, OnInit} from '@angular/core';
import {CartService} from '../shared/services/cart.service';
import {Product} from '../shared/models/product';
import {CartProduct} from '../shared/models/cartProduct';
import {FormControl, FormGroup} from '@angular/forms';
import {OrderService} from '../shared/services/order.service';
import {Order} from '../shared/models/order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart: Product[] = [];
  cartProducts: CartProduct[] = [];
  totalPrice = 0;

  checkoutForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    zipcode: new FormControl(''),
    comment: new FormControl('')
  });

  constructor(private router: Router, private cartService: CartService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.cart = JSON.parse(this.cartService.getFromCart());

    const allProductIds = this.cart.map(p => p.productId).filter((value, index, array) => index === array.indexOf(value));
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

  save() {
    const order: Order = this.checkoutForm.value;
    // order.products = this.cart;
    // debugger;
    this.orderService.addOrder(order)
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
