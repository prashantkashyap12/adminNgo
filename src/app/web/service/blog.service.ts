import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  url ="http://localhost:5181/";

  constructor(private _http:HttpClient) {   }
  

  // Get Result
  async bloglis():Promise<any>{
    let url = this.url+"";
    let res = await this._http.get(url).toPromise(); 
    return res;
  }

  // save List
  
  
  

}
