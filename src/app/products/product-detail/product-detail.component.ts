import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {CartService} from '../../shared/services/cart.service';
import {CartUpdaterService} from '../../shared/services/cart-updater.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService, private cartService: CartService,
              private _cartUpdaterService: CartUpdaterService, private toastrService: NbToastrService) {
  }

  ngOnInit() {
    const productId = +this.route.snapshot.paramMap.get('productId');
    this.productService.getProductById(productId)
      .subscribe(productFromRest => {
        this.product = productFromRest;
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.showToast(NbToastStatus.SUCCESS, product);
    this.cartUpdate();
  }

  showToast(status, product) {
    this.toastrService.show(
      status || 'Success',
      `${product.title} tilføjet til kurven.`,
      {status, hasIcon: true});
  }

  cartUpdate(): void {
    this._cartUpdaterService.filter('UpdateCartCount');
  }
}
