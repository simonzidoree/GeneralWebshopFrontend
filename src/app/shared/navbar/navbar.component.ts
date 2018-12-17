import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  products: Product[];
  productCategories: string[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(listOfProducts => {
        this.products = listOfProducts;

        this.productCategories = this.products.map(value => value.category)
          .filter((value, index, array) => index === array.indexOf(value));
      });
  }
}
