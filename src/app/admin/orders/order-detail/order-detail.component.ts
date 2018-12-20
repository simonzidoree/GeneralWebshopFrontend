import {Component, OnInit} from '@angular/core';
import {Order} from '../../../shared/models/order';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../shared/services/order.service';
import {ProductAndQty} from '../../../shared/models/productAndQty';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  products: ProductAndQty[] = [];
  disabled: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit() {
    const orderId = +this.route.snapshot.paramMap.get('orderId');
    this.orderService.getOrderById(orderId)
      .subscribe(orderFromRest => {
        this.order = orderFromRest;
        this.disabled = orderFromRest.isDelivered;

        this.order.orderLines.forEach(value => {
          const productAndQty: ProductAndQty = {
            product: value.product,
            qty: value.qty
          };

          this.products.push(productAndQty);
        });
      });
  }

  shipped() {
    const order = this.order;
    order.isDelivered = true;

    order.orderLines.forEach(value => value.product = null);

    this.orderService.updateOrder(order)
      .subscribe(() => {
        this.router.navigateByUrl('/admin/orders');
      });
  }
}
