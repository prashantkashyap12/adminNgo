import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../../interface/api_config';
import { CommonService } from '../../common.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = new url().value
  url =this.baseUrl;

  constructor(private _http:HttpClient, private _common:CommonService) {   }
  
// Blog List View 
async bloglisView():Promise<any>{
  let url = this.url+"blogList";
  let res = await this._http.get(url).toPromise(); 
  return res;
}

// Add List =
async bloglisAdd(Model:any):Promise<any>{
 try{
    let url = this.url+"blogAdd";
    let res = await this._http.post(url, Model).toPromise(); 
    return res;
  }catch(err){
    console.log(err)
    throw err;
  }
}

// Blog List Delete <blogTran>
 bloglisDelete(BlogTranVal:any):Observable<any>{
  let url = this.url+`blogDel?blogTran=${BlogTranVal}`;
  return this._http.delete(url);
}

// Blog List Update <BlogTran + Model>
 async bloglisUpdate(model:any):Promise<any>{
  try{
    for(const key of (model as any).keys()){
      console.log(key, model.get(key));
    }
    const url = this.url+"blogUpdate";
    const res = await this._http.post(url, model).toPromise();
    return res;
  }catch(err){
    console.error("Error sending blog update request:", err);
    throw err;
  }
}

// Blog Details List 
async blogDetails(blogTrn:any):Promise<any>{
  let url = this.url+`blogDetRec?blogTran=${blogTrn}`;
  let res = await this._http.get(url).toPromise();
  return res;
}

// Blog Details update 
async blogDetailsUpdate(model:any):Promise<any>{
  let url = this.url+"blogDetUpdate";
  let res = await this._http.post(url, model).toPromise();
  return res;
}


  
  
  

}
