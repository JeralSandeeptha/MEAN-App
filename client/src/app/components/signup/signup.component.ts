import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAPIService } from 'src/app/services/user-api.service';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit{

  signupForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required, Validators.email
    ]),
    fullName: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null,[
      Validators.required
    ])
  });

  constructor(private userapi: UserAPIService,
              private toaster: ToastrService,
              private cookieService: AuthService,
              private router: Router){}

  ngOnInit(): void {
    if(this.cookieService.isExist()){
      this.router.navigateByUrl('/dashboard');
    }
  }

  signup(){
    //use api call
    this.userapi.signup(
      this.signupForm.get('fullName')?.value,
      this.signupForm.get('email')?.value,
      this.signupForm.get('password')?.value,
    ).subscribe(res => {
      //show success message
      this.success(res.data.message);
      //set cookies
      this.cookieService.createUser(res.data.token);
      //navigate to dashboard
      this.router.navigateByUrl('/dashboard');
    }, error => {
      //show error message
      this.error('Error!');
    })
  }

  //show toast method
  private success(message: string){
    this.toaster.success(message, 'Success', {
      timeOut: 2000
    })
  }

  //show toast method
  private error(message: string){
    this.toaster.error(message, 'Error!', {
      timeOut: 2000
    })
  }
}
