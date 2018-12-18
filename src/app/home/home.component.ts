import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Product} from '../shared/models/product';
import {ProductService} from '../shared/services/product.service';
import {CartService} from '../shared/services/cart.service';
import {CartUpdaterService} from '../shared/services/cart-updater.service';
import {NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() onFilter = new EventEmitter();

  products: Product[];

  @ViewChild('toggleAddedIcon') tai;
  @ViewChild('addedText') aTxt;

  private addToCartTxt = 'LÆG I KURV';
  private addedToCartTxt = 'LAGT I KURV';
  private addBtnTxt = this.addToCartTxt;

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

  addToCart(product: Product) {
    if (this.addBtnTxt === this.addToCartTxt) {
      this.addBtnTxt = this.addedToCartTxt;
    } else {
      this.addBtnTxt = this.addToCartTxt;
    }

    this.toggleIcon();

    if (!this.toggleAdded) {
      this.cartService.addToCart(product);
    }

    this.toggleAdded = !this.toggleAdded;
    this.showToast(NbToastStatus.SUCCESS, product);
    this.cartUpdate();
  }

  toggleIcon() {
    if (this.toggleAdded) {
      this.tai.nativeElement.classList.add('fa-shopping-basket');
      this.tai.nativeElement.classList.remove('fa-check');
    } else {
      this.tai.nativeElement.classList.add('fa-check');
      this.tai.nativeElement.classList.remove('fa-shopping-basket');
    }
  }

  showToast(status, product) {
    this.toastrService.show(
      status || 'Success',
      `${product.title} tilføjet til kurven.`,
      {status, hasIcon: true});
  }
}
