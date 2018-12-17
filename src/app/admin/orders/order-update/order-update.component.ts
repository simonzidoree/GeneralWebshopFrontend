import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  id: number;

  orderForm = new FormGroup({
    orderNumber: new FormControl(''),
    fullName: new FormControl(''),
    address: new FormControl(''),
    zipcode: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    comment: new FormControl(''),
    orderDate: new FormControl(''),
    isDelivered: new FormControl('')
  });
  orderDelivered: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('orderId');

    this.orderService.getOrderById(this.id)
      .subscribe(orderFromRest => {
        this.orderForm.patchValue({
          orderNumber: orderFromRest.orderNumber,
          fullName: orderFromRest.fullName,
          address: orderFromRest.address,
          zipcode: orderFromRest.zipcode,
          city: orderFromRest.city,
          country: orderFromRest.country,
          phoneNumber: orderFromRest.phoneNumber,
          email: orderFromRest.email,
          comment: orderFromRest.comment,
          orderDate: orderFromRest.orderDate
        });
        this.orderDelivered = orderFromRest.isDelivered;
      });
  }

  save() {
    const order = this.orderForm.value;
    order.orderId = this.id;
    this.orderService.updateOrder(order)
      .subscribe(() => {
        this.router.navigateByUrl('/admin/orders');
      });
  }

}
