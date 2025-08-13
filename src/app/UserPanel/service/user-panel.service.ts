import { Injectable } from '@angular/core';

import { url } from '../../interface/api_config';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsePanelService {

  baseUrl:any = new url().value;
  constructor(private _http:HttpClient) { }

  // get Event
  getEvent(userId:any):Observable<any>{
    let url =  `${this.baseUrl}EventUserId?userId=${userId}`
    return this._http.get(url);
  }

  // createId
  createPayId(data:any):Observable<any>{
    let url =  `${this.baseUrl}CreatePay`
    return this._http.post(url,data);
  }

}
