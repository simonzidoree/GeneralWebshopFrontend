import {Component, OnInit} from '@angular/core';
import {Order} from '../../../shared/models/order';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.orderService.getOrders()
      .subscribe(listOfOrders => {
        this.orders = listOfOrders;
      });
  }

  delete(id: number) {
    this.orderService.deleteOrder(id)
      .subscribe(() => {
        this.refresh();
      });
  }

}
