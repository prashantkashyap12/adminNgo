import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  Url = "http://localhost:5181/";

  constructor(private http: HttpClient) { }
  signup(model:any):Observable<any> {
    let url = this.Url+"api/Signup/signup";
    return  this.http.post(url, model)
  }
  
  varify(model:any):Observable<any>{
    let url = this.Url+"api/Signup/ForgetGen2";
    return this.http.post(url, model)
  }

  signIn(model:any):Observable<any>{
    let url = this.Url+"api/Signup/Signin";
    return this.http.post(url, model);
  }

  forget(model:any):Observable<any>{
    let url = this.Url+"api/Signup/ForgetReq";
    return this.http.post(url, model);
  }

}

