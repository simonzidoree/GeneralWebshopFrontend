import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './shared/guards/auth.guard';
import {AuthenticationService} from './shared/services/authentication.service';
import {AdminComponent} from './admin/admin.component';
import {ProductAddComponent} from './admin/products/product-add/product-add.component';
import {ButtonsModule, PopoverModule, ProgressbarModule, TabsModule} from 'ngx-bootstrap';
import {ProductUpdateComponent} from './admin/products/product-update/product-update.component';
import {OrdersComponent} from './admin/orders/orders/orders.component';
import {OrderUpdateComponent} from './admin/orders/order-update/order-update.component';
import {OrderDetailComponent} from './admin/orders/order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    OrdersComponent,
    OrderUpdateComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PopoverModule.forRoot(),
    ButtonsModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
