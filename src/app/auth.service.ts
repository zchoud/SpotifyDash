import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"
import { environment } from './../environments/environment';

import User from './User';
import RegisterUser from './RegisterUser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  key: string = "access_token";

  constructor( private http: HttpClient) { }

  getToken():string{
    const token = localStorage.getItem(this.key) 
    return token ? token : "";
  }

  readToken():User | null{
    if (this.isAuthenticated()){
      const jwtHelper = new JwtHelperService();
      const token = this.getToken();
      const payload = jwtHelper.decodeToken(token);
      return {
        _id: payload._id,
        userName: payload.userName,
        password: payload.password
      };
    }
    else
      return null;
  }

  isAuthenticated():boolean{
    const token = this.getToken();
    const jwtHelper = new JwtHelperService();
    return token != "" && !jwtHelper.isTokenExpired(token);
  }

  login(user: User): Observable<any>{
    return this.http.post<any>(`${environment.userAPIBase}/api/user/login`, user);
  }

  logout():void{
    localStorage.removeItem(this.key);
  }

  register(registerUser: RegisterUser): Observable<any>{
    return this.http.post<any>(`${environment.userAPIBase}/api/user/register`, registerUser);
  }

} 