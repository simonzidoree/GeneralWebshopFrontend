import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  getOrders(): Observable<Order[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    return this.http.get<Order[]>(environment.apiUrl + '/api/orders', httpOptions);
  }

  addOrder(order: Order): Observable<Order> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    return this.http.post<Order>(environment.apiUrl + '/api/orders', order, httpOptions);
  }

  deleteOrder(orderId: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    return this.http.delete(environment.apiUrl + '/api/orders/' + orderId, httpOptions);
  }

  getOrderById(orderId: number): Observable<Order> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    return this.http.get<Order>(environment.apiUrl + '/api/orders/' + orderId, httpOptions);
  }

  updateOrder(order: Order): Observable<Order> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());
    return this.http.put<Order>(environment.apiUrl + '/api/orders/' + order.orderId, order, httpOptions);
  }
}
