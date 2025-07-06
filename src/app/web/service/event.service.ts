import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../interface/api_config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = new url().value
  constructor(private _http:HttpClient) { }

  // AddEventLs Add
  AddEventList( data:any):Observable<any>{
    let api = this.baseUrl + 'AddEventLs';
    return this._http.post(api, data);
  }
  // ViewEventLs List
  getEventList():Observable<any>{
    let api = this.baseUrl + 'ViewEventLs';
    return this._http.get(api);
  }
  // ViewEventLs Delete
  deleteEventList(id:any):Observable<any>{
    let api = this.baseUrl + 'DelEventLs?eventTran=' + id;
    return this._http.delete(api);
  }
  // ViewEventLs update
  updateEventList(data:any):Observable<any>{
    let api = this.baseUrl + 'updatEventLs';
    return this._http.post(api, data);
  }


  // EventDetails List
  eventDetailsList(eventTran:any):Observable<any>{
    let api = this.baseUrl + `getEventDetilsId?eventTrn=${eventTran}`;
    return this._http.get(api);
  }

  // AddEventDetails Add
  eventDetailsAdd(data:any):Observable<any>{
    let api = this.baseUrl + 'updateEventDtls';
    return this._http.post(api, data);
  }

}
