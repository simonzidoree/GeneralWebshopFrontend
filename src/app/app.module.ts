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
import {NavbarComponent} from './shared/navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbProgressBarModule,
  NbSearchModule,
  NbSearchService,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbTabsetModule,
  NbThemeModule,
  NbToastrModule
} from '@nebular/theme';
import {FooterComponent} from './shared/footer/footer.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {CartComponent} from './cart/cart.component';
import {HeaderComponent} from './shared/header/header.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {ProductsComponent} from './products/products/products.component';

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
    OrderDetailComponent,
    NavbarComponent,
    FooterComponent,
    ProductDetailComponent,
    HeaderComponent,
    CartComponent,
    CheckoutComponent,
    ProductsComponent
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
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbSidebarModule,
    NbSearchModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbSpinnerModule,
    NbProgressBarModule,
    NbActionsModule,
    NbSelectModule,
    NbToastrModule.forRoot({destroyByClick: true, preventDuplicates: true}),
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    NbSidebarService,
    NbSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
