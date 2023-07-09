import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../components/dto/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  public saveCustomer(customer: Customer):Observable<any>{
    return this.http.post("http://localhost:3000/api/v1/customer/save", {
      name: customer.name,
      address: customer.address,
      salary: customer.salary
    });
  }

  public customerList():Observable<any>{
    return this.http.get('http://localhost:3000/api/v1/customer/getAll');
  }

  public getCustomer(id: any):Observable<any>{
    return this.http.get('http://localhost:3000/api/v1/customer/getOne/', {
      headers:{
        id: id
      }
    });
  }

  public deleteCustomer(id: any):Observable<any>{
    return this.http.delete('http://localhost:3000/api/v1/customer/delete', {
      headers:{
        id: id
      }
    });
  }

  public updateCustomer(customer: Customer, id: any):Observable<any>{
    return this.http.post("http://localhost:3000/api/v1/customer/update", {
      name: customer.name,
      address: customer.address,
      salary: customer.salary
    }, {headers: {id:id}});
  }
}
