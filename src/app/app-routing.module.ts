import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {ProductAddComponent} from './admin/products/product-add/product-add.component';
import {ProductUpdateComponent} from './admin/products/product-update/product-update.component';
import {OrdersComponent} from './admin/orders/orders/orders.component';
import {OrderUpdateComponent} from './admin/orders/order-update/order-update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'admin/product-add', component: ProductAddComponent, canActivate: [AuthGuard]},
  {path: 'admin/product-update/:id', component: ProductUpdateComponent, canActivate: [AuthGuard]},
  {path: 'admin/orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'admin/order-update/:id', component: OrderUpdateComponent, canActivate: [AuthGuard]},
  // {path: 'admin/orders/:id', component: OrdersDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
