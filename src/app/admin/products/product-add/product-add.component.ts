import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductService} from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
    amountInStock: new FormControl(''),
    featured: new FormControl('')
  });
  productFeatured: any;


  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.productFeatured = false;
  }

  save() {
    const product = this.productForm.value;
    this.productService.addProduct(product)
      .subscribe(() => {
        this.router.navigateByUrl('/admin');
      });
  }


}
