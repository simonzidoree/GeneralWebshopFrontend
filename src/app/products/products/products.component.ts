import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
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

  private addToCartTxt = 'LÆG I KURV';
  private addedToCartTxt = 'LAGT I KURV';

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
