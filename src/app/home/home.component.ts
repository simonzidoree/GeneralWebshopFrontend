import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from '../shared/models/product';
import {ProductService} from '../shared/services/product.service';
import {CartService} from '../shared/services/cart.service';
import {CartUpdaterService} from '../shared/services/cart-updater.service';
import {NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @Output() onFilter = new EventEmitter();

  products: Product[];

  private addToCartTxt = 'LÆG I KURV';
  private addedToCartTxt = 'LAGT I KURV';

  private toggleAdded = false;

  constructor(private productService: ProductService, private elementRef: ElementRef, private cartService: CartService,
              private _cartUpdaterService: CartUpdaterService, private toastrService: NbToastrService) {
  }

  cartUpdate(): void {
    this._cartUpdaterService.filter('UpdateCartCount');
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

  addToCart(product: Product, $event) {
    this.toggleAdded = !this.toggleAdded;
    this.toggleIcon($event);

    setTimeout(() => {
      this.toggleAdded = !this.toggleAdded;
    }, 1000);


    this.cartService.addToCart(product);


    this.showToast(NbToastStatus.SUCCESS, product);
    this.cartUpdate();
  }

  toggleIcon($event) {
    if (this.toggleAdded) {
      if ($event.srcElement.classList.contains('add-to-cart')) {
        $event.srcElement.childNodes.item(0).classList.add('fa-check');
        $event.srcElement.childNodes.item(0).classList.remove('fa-shopping-basket');

        $event.srcElement.childNodes.item(1).textContent = this.addedToCartTxt;
      } else {
        $event.srcElement.parentElement.childNodes.item(0).classList.add('fa-check');
        $event.srcElement.parentElement.childNodes.item(0).classList.remove('fa-shopping-basket');

        $event.srcElement.parentElement.childNodes.item(1).textContent = this.addedToCartTxt;
      }

    }

    setTimeout(() => {
        if ($event.srcElement.classList.contains('add-to-cart')) {
          $event.srcElement.childNodes.item(0).classList.add('fa-shopping-basket');
          $event.srcElement.childNodes.item(0).classList.remove('fa-check');

          $event.srcElement.childNodes.item(1).textContent = this.addToCartTxt;
        } else {
          $event.srcElement.parentElement.childNodes.item(0).classList.add('fa-shopping-basket');
          $event.srcElement.parentElement.childNodes.item(0).classList.remove('fa-check');

          $event.srcElement.parentElement.childNodes.item(1).textContent = this.addToCartTxt;
        }
      },
      1000);
  }

  showToast(status, product) {
    this.toastrService.show(
      status || 'Success',
      `${product.title} tilføjet til kurven.`,
      {status, hasIcon: true});
  }
}
