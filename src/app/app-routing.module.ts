import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
