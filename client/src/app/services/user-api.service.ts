import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  constructor(private http: HttpClient) {}

  public signup(fullName: any, email: any, password: any):Observable<any>{
    return this.http.post("http://localhost:3000/api/v1/user/save", {
      email: email,
      password:password,
      fullName: fullName
    });
  }

  public loginUser(email: any, password: any):Observable<any>{
    return this.http.post("http://localhost:3000/api/v1/user/login", {
      email: email,
      password:password,
    });
  }
}
