import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/models/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.productService.getProducts()
      .subscribe(listOfProducts => {
        this.products = listOfProducts;
      });
  }

  delete(id: number) {
    this.productService.deleteProduct(id)
      .subscribe(() => {
        this.refresh();
      });
  }


}
