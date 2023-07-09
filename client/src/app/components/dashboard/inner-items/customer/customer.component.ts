import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAPIService} from "../../../../services/user-api.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../../services/auth-service";
import {Router} from "@angular/router";
import {CustomerService} from "../../../../services/customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{

  customerList:any[]=[];

  selectedCustomer:any;

  customerForm = new FormGroup({
    customerName: new FormControl(null, [
      Validators.required
    ]),
    customerAddress: new FormControl(null, [
      Validators.required
    ]),
    customerSalary: new FormControl(null, [
      Validators.required
    ]),
  });

  constructor(private customerService: CustomerService,
              private toaster: ToastrService,
              private cookieService: AuthService,
              private router: Router){}

  ngOnInit(): void {
    this.getCUstomers();
  }

  saveCustomer() {
    this.customerService.saveCustomer({
      name: this.customerForm.get('customerName')?.value,
      address: this.customerForm.get('customerAddress')?.value,
      salary: Number(this.customerForm.get('customerSalary')?.value)
    }).subscribe(res => {
      this.clearData();
      this.getCUstomers();
    }, error => {
      console.log(error);
    });
  }
  private getCUstomers(){
    this.customerService.customerList().subscribe(res => {
      this.customerList = res.data.value;
    }, error => {
      console.log(error);
    });
  }

  private clearData(){
    this.customerForm.patchValue({
      customerName: null,
      customerAddress: null,
      customerSalary: null
    });
  }

  setUpdateData(_id: any) {
    this.customerService.getCustomer(_id).subscribe(res => {
      if (res.data.value != null){
        console.log(_id);
        this.selectedCustomer = res.value;
        this.customerForm.patchValue({
          customerName: this.selectedCustomer.name,
          customerAddress: this.selectedCustomer.address,
          customerSalary: this.selectedCustomer.salary
        });
      }else{
        console.log('User not found');
      }
    }, error => {
      console.log('Error!');
    });
  }

  deleteCustomer(id: any) {
    if (confirm('Are your sure?')){
      this.customerService.deleteCustomer(id).subscribe(res => {
        console.log('Customer deleted');
        this.getCUstomers();
      }, error => {
        console.log('Error!');
      });
    }
  }
}
