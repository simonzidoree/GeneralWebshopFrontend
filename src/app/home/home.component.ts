import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Product} from '../shared/models/product';
import {ProductService} from '../shared/services/product.service';
import {CartService} from '../shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  products: Product[];

  constructor(private productService: ProductService, private elementRef: ElementRef, private cartService: CartService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.productService.getProducts()
      .subscribe(listOfProducts => {
        this.products = listOfProducts.filter(p => p.featured);
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'grey';
  }
}
