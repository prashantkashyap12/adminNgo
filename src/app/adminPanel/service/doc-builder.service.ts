import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../interface/api_config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocBuilderService {

  baseUrl = new url().value;
  constructor(private _http:HttpClient) { }

  getRecord():Observable<any>{
    let url = `${this.baseUrl}GTProfUpdate?userId=0`;
    return this._http.get(url);
  }
  sendImg(data:any):Observable<any>{
    let url = `${this.baseUrl}`;
    return this._http.post(url, data);
  }

}
