import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../../interface/api_config';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  baseUrl:any = new url().value;
  constructor(private _http:HttpClient) { }

  updateUser(model:any):Observable<any>{
    let url = this.baseUrl+'ProfileRec';
    return this._http.post(url, model);
  }
  GetUser(userId:any):Observable<any>{
    let url = `${this.baseUrl}GTProfUpdate?userId=${userId}`;
    return this._http.get(url);
  }
}
