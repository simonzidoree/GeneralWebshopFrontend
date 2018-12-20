import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../shared/services/order.service';
import {OrderLine} from '../../../shared/models/OrderLine';
import {Order} from '../../../shared/models/order';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  orderId: number;
  orderNumber: number;
  orderComment: string;
  orderDate: string;
  orderLinesFromRest: OrderLine[] = [];

  orderForm = new FormGroup({
    fullName: new FormControl(''),
    address: new FormControl(''),
    zipcode: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    isDelivered: new FormControl('')
  });
  orderDelivered: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderId = +this.route.snapshot.paramMap.get('orderId');

    this.orderService.getOrderById(this.orderId)
      .subscribe(orderFromRest => {
        this.orderForm.patchValue({
          fullName: orderFromRest.fullName,
          address: orderFromRest.address,
          zipcode: orderFromRest.zipcode,
          city: orderFromRest.city,
          country: orderFromRest.country,
          phoneNumber: orderFromRest.phoneNumber,
          email: orderFromRest.email
        });
        this.orderNumber = orderFromRest.orderNumber;
        this.orderDelivered = orderFromRest.isDelivered;
        this.orderComment = orderFromRest.comment;
        this.orderDate = orderFromRest.orderDate;
        this.orderLinesFromRest = orderFromRest.orderLines;
      });
  }

  save() {
    const order: Order = this.orderForm.value;
    order.orderId = this.orderId;
    order.orderNumber = this.orderNumber;
    order.comment = this.orderComment;
    order.orderDate = this.orderDate;

    order.orderLines = [];

    this.orderLinesFromRest.forEach(product => {
      const prod = product as OrderLine;
      order.orderLines.push({
        productId: prod.productId,
        qty: prod.qty,
        priceWhenBought: prod.priceWhenBought
      });
    });

    this.orderService.updateOrder(order)
      .subscribe(() => {
        this.router.navigateByUrl('/admin/orders');
      });
  }

}
