import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../shared/services/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  productId: number;
  products: Product[];
  productCategories: string[] = [];

  productForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
    amountInStock: new FormControl(''),
    existingCategory: new FormControl(''),
    newCategory: new FormControl(''),
    featured: new FormControl('')
  });
  productFeatured: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.productId = +this.route.snapshot.paramMap.get('productId');

    this.productService.getProducts()
      .subscribe(listOfProducts => {
        this.products = listOfProducts;

        this.productCategories = this.products.map(value => value.category)
          .filter((value, index, array) => index === array.indexOf(value));

        this.productService.getProductById(this.productId)
          .subscribe(productFromRest => {
            this.productForm.patchValue({
              title: productFromRest.title,
              description: productFromRest.description,
              price: productFromRest.price,
              image: productFromRest.image,
              amountInStock: productFromRest.amountInStock,
              featured: productFromRest.featured,
              existingCategory: productFromRest.category
            });
            this.productFeatured = productFromRest.featured;
          });
      });
  }

  save() {
    const product: Product = this.productForm.value;
    if (this.productForm.get('newCategory').value === '') {
      product.category = this.productForm.get('existingCategory').value;
    } else {
      product.category = this.productForm.get('newCategory').value;
    }
    product.productId = this.productId;
    this.productService.updateProduct(product)
      .subscribe(() => {
        this.router.navigateByUrl('/admin');
      });
  }

  toggleExistingCategory() {
    const newCategoryControl = this.productForm.get('newCategory');

    const existingCategoryControl = this.productForm.get('existingCategory');
    if (newCategoryControl.value === '') {
      existingCategoryControl.enable();
    } else {
      existingCategoryControl.disable();
      existingCategoryControl.setValue('');
    }
  }

  toggleNewCategory() {
    const existingCategoryControl = this.productForm.get('existingCategory');

    const newCategoryControl = this.productForm.get('newCategory');
    if (existingCategoryControl.value === 'none') {
      newCategoryControl.enable();
    } else {
      newCategoryControl.disable();
      newCategoryControl.setValue('');
    }
  }

}
