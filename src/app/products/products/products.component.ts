import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/models/product';
import {CartService} from '../../shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  products: Product[];

  constructor(private productService: ProductService, private cartService: CartService,
              private route: ActivatedRoute, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const productCategory = params['productCategory'];
        this.refresh(productCategory);
      }
    );

  }

  refresh(productCategory: any) {
    this.productService.getProducts()
      .subscribe(listOfProducts => {
        this.products = listOfProducts.filter(value => value.category === productCategory);
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'grey';
  }
}
