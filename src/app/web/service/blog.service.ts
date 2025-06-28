import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  url ="http://localhost:5181/";

  constructor(private _http:HttpClient) {   }
  
// Blog List Add <Model>
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
// Blog List View 
async bloglisView():Promise<any>{
  let url = this.url+"blogList";
  let res = await this._http.get(url).toPromise(); 
  return res;
}
// Blog List Delete <blogTran>
 bloglisDelete(BlogTranVal:any):Observable<any>{
  let url = this.url+`blogDel?blogTran=${BlogTranVal}`;
  return this._http.delete(url);
}

// Blog List Update <BlogTran + Model>
 async bloglisUpdate(model:any):Promise<any>{
  let url = this.url+"blogUpdate";
  let res = await this._http.post(url, model).toPromise();
  return res;
}
//   Blog Details Add <BlogTran + Model_2>
//   async blogDetailsAdd(model:any):Promise<any>{
//   let url = this.url+"blogDetUpdate";
//   let res = await this._http.delete(url, model);
//   return res;
//  }

// Blog Details List 
 async blogDetailsUpdate(model:any):Promise<any>{
  let url = this.url+"blogDetList";
  let res = await this._http.delete(url, model);
  return res;
}


  
  
  

}
