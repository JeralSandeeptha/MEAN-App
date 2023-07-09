import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./components/guard/auth.guard";
import {CustomerComponent} from "./components/dashboard/inner-items/customer/customer.component";
import {OrderDetailComponent} from "./components/dashboard/inner-items/order-detail/order-detail.component";
import {ProductComponent} from "./components/dashboard/inner-items/product/product.component";
import {OrderComponent} from "./components/dashboard/inner-items/order/order.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path:'', redirectTo:'/dashboard/customers', pathMatch:'full'},
      {path: 'customers', component: CustomerComponent},
      {path: 'orders', component: OrderComponent},
      {path: 'products', component: ProductComponent},
      {path: 'orderDetails', component: OrderDetailComponent},
    ]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
