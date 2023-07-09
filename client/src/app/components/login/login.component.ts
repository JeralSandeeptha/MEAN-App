import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAPIService} from "../../services/user-api.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private userapi: UserAPIService,
              private toaster: ToastrService,
              private cookieService: AuthService,
              private router: Router){}


  ngOnInit(): void {
    if(this.cookieService.isExist()){
      this.router.navigateByUrl('/dashboard');
    }}


  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required, Validators.email
    ]),
    password: new FormControl(null,[
      Validators.required
    ])
  });

  login(){
    this.userapi.loginUser(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value,
    ).subscribe(res => {
      console.log('Logged In');
      this.cookieService.createUser(res.data.token);
      this.router.navigateByUrl('/dashboard');
    }, error => {
      console.log('Error');
    })
  }

}
