import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id)
      .subscribe(productFromRest => {
        this.product = productFromRest;
      });
  }
}
