import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(private cookieService: AuthService,
              private router: Router,
              private toaster: ToastrService,) {
  }

  public logOut(){
    this.cookieService.logOut();
    this.router.navigateByUrl('/login');
    this.logoutToaster('Logged Out!')
  }

  //show toast method for logout
  private logoutToaster(message: string){
    this.toaster.warning(message, 'Info!', {
      timeOut: 2000
    })
  }

  ngOnInit(): void {

  }

}
