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
  
  setPermission(data:any,uid:any):Observable<any>{
    let url = `${this.baseUrl}updateRec?`;
    let model = {
      uid:uid,
      isDocView:data.isEdit,
      designation:data.designaton,
    }
    return this._http.post(url,model);
  }
}
