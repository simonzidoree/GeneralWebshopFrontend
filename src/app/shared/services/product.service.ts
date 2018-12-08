import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  getProducts(): Observable<Product[]> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    return this.http.get<Product[]>(environment.apiUrl + '/api/products', httpOptions);
  }

  addProduct(product: Product): Observable<Product> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    return this.http.post<Product>(environment.apiUrl + '/api/products', product, httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    return this.http.delete(environment.apiUrl + '/api/products/' + id, httpOptions);
  }

  getProductById(id: number): Observable<Product> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    return this.http.get<Product>(environment.apiUrl + '/api/products/' + id, httpOptions);
  }

  updateProduct(product: Product): Observable<Product> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    return this.http.put<Product>(environment.apiUrl + '/api/products/' + product.id, product, httpOptions);
  }

}
