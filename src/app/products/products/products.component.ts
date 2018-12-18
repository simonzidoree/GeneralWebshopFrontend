import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/models/product';
import {CartService} from '../../shared/services/cart.service';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {CartUpdaterService} from '../../shared/services/cart-updater.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Output() onFilter = new EventEmitter();

  products: Product[];
  category: string;

  @ViewChild('toggleAddedIcon') tai;
  @ViewChild('addedText') aTxt;

  private addToCartTxt = 'LÆG I KURV';
  private addedToCartTxt = 'LAGT I KURV';
  private addBtnTxt = this.addToCartTxt;

  private toggleAdded = false;

  constructor(private productService: ProductService, private cartService: CartService,
              private route: ActivatedRoute, private elementRef: ElementRef, private _cartUpdaterService: CartUpdaterService,
              private toastrService: NbToastrService) {
  }

  cartUpdate(): void {
    this._cartUpdaterService.filter('UpdateCartCount');
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const productCategory = params['productCategory'];
        this.refresh(productCategory);

        this.category = this.route.snapshot.paramMap.get('productCategory');
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
