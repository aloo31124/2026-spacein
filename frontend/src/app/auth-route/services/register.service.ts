import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private DOMAIN = environment.domain;
  private CONTEXT = "/api/auth";
  private BASE_URL = this.DOMAIN + this.CONTEXT;

  constructor(private http: HttpClient) {}

  login(email:string, password:string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/login`, { email, password });
  }

  sendMail(email: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/regist/mail`, { email });
  }

  addUser(email: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/regist/user/add`, {email});
  }

  updateUser(newUser: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/regist/user/update`, {newUser});
  }

  sendCode(email: string, code: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/regist/verify/code`, { newUser: {email, code} });
  }

  changePassword(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/regist/user/password`, { newUser: {email, password} });
  }

  findUser(email: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/user/${email}`);
  }

}
