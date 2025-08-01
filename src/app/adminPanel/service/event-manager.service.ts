import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../../interface/api_config';

@Injectable({
  providedIn: 'root'
})

export class EventManagerService {
  
  constructor(private _http:HttpClient) { }
  private baseUrl = new url().value;
  getEvent(userId:any):Observable<any>{
    let url = `${this.baseUrl}GetAllEvent?userId=${userId}`;
    return this._http.get(url);
  }

  AddLiveEvent(fromData:any):Observable<any>{
    let url = this.baseUrl + 'AddLiveEvent';
    return this._http.post(url, fromData);
  }

}
