import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  //save token as a cookie
  public createUser(token: string){
    this.cookieService.set('user-token', token);
  }

  //logout user
  public logOut(){
    this.cookieService.delete('user-token');
  }

  //for auth guard
  public isExist(): boolean{
    let user = this.cookieService.get('user-token');
    return user.length === 0 ? false : true;
  }

}
