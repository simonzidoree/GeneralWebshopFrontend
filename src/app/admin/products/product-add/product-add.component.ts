import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductService} from '../../../shared/services/product.service';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

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

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.productFeatured = false;

    this.productService.getProducts()
      .subscribe(listOfProducts => {
        this.products = listOfProducts;

        this.productCategories = this.products.map(value => value.category)
          .filter((value, index, array) => index === array.indexOf(value));
      });
  }

  save() {
    const product: Product = this.productForm.value;
    if (this.productForm.get('newCategory').value === '') {
      product.category = this.productForm.get('existingCategory').value;
    } else {
      product.category = this.productForm.get('newCategory').value;
    }
    this.productService.addProduct(product)
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
