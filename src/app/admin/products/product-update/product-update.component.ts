import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../shared/services/product.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  productId: number;

  productForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
    amountInStock: new FormControl(''),
    featured: new FormControl('')
  });
  productFeatured: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.productId = +this.route.snapshot.paramMap.get('productId');

    this.productService.getProductById(this.productId)
      .subscribe(productFromRest => {
        this.productForm.patchValue({
          title: productFromRest.title,
          description: productFromRest.description,
          price: productFromRest.price,
          image: productFromRest.image,
          amountInStock: productFromRest.amountInStock,
          featured: productFromRest.featured
        });
        this.productFeatured = productFromRest.featured;
      });
  }

  save() {
    const product = this.productForm.value;
    product.productId = this.productId;
    this.productService.updateProduct(product)
      .subscribe(() => {
        this.router.navigateByUrl('/admin');
      });
  }

}
