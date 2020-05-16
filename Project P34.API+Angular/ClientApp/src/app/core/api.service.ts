import { SignInModel } from './../Models/login.model';
import { RegisterModel } from './../Models/register.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult } from '../Models/result.model';
import { EventEmitter } from '@angular/core';
import { NewsModel } from '../Models/news.model';
import { NewsModeld } from '../Areas/adminarea/admin.area/Models/newsmodeld';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = '/api/Account';
  loginStatus = new EventEmitter<boolean>();

  SingUp(UserRegisterDto: RegisterModel): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl + '/register', UserRegisterDto);
  }

  

  logout(){
    localStorage.removeItem('token');
    this.loginStatus.emit(false);
    
  }

  SignIn(UserLoginDto: SignInModel) {
    return this.http.post<ApiResult>(this.baseUrl + '/login', UserLoginDto);
  }

  AddNews(newsmodeldto: NewsModeld): Observable<ApiResult>{
    return this.http.post<ApiResult>('/api/news/addnews', newsmodeldto);
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    if (token !== null) {

      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);

      if (decodedJwtData.roles === 'User') {
        return false;
      } else if (decodedJwtData.roles === 'Admin') {
        return true;
      }

    } else {
      return false;
    }
  }
  isLoggedIn(){
    const token = localStorage.getItem('token');
    if(token!== null)
    {
      return true;
    }
    else{
      return false;
    }
  }
}
