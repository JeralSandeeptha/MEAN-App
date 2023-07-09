import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import {ToastrModule, ToastContainerModule} from "ngx-toastr";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from "ngx-cookie-service";
import { CustomerComponent } from './components/dashboard/inner-items/customer/customer.component';
import { ProductComponent } from './components/dashboard/inner-items/product/product.component';
import { OrderComponent } from './components/dashboard/inner-items/order/order.component';
import { OrderDetailComponent } from './components/dashboard/inner-items/order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    DashboardComponent,
    CustomerComponent,
    ProductComponent,
    OrderComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastContainerModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
