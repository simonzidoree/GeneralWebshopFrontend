import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {CartService} from '../services/cart.service';
import {CartUpdaterService} from '../services/cart-updater.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart: Product[] = [];
  products: Product[];
  productCategories: string[] = [];

  constructor(private cartService: CartService, private _cartUpdaterService: CartUpdaterService, private productService: ProductService) {
    this._cartUpdaterService.listen().subscribe((m: any) => {
      if (m === 'UpdateCartCount') {
        this.updateCart();
      }
    });
  }

  ngOnInit() {
    this.updateCart();
    this.productService.getProducts()
      .subscribe(listOfProducts => {
        this.products = listOfProducts;

        this.productCategories = this.products.map(value => value.category)
          .filter((value, index, array) => index === array.indexOf(value));
      });
  }

  updateCart() {
    this.cart = JSON.parse(this.cartService.getFromCart() || 0);
  }
}
