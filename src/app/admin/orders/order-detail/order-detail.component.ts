import {Component, OnInit} from '@angular/core';
import {Order} from '../../../shared/models/order';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  disabled: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderById(id)
      .subscribe(orderFromRest => {
        this.order = orderFromRest;
        this.disabled = orderFromRest.isDelivered;
      });
  }

  shipped() {
    const order = this.order;
    order.isDelivered = true;
    order.products = null;
    this.orderService.updateOrder(order)
      .subscribe(() => {
        this.router.navigateByUrl('/admin/orders');
      });
  }
}