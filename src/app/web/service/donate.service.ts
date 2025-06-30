import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../interface/api_config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor(private _http: HttpClient) { }

  private baseUrl = new url().value;

  // Allot List  -- done
  getList(): Observable<any> {
    let url = `${this.baseUrl}getDontLst`;
    let res = this._http.get(url);
    return res
  }

  // Add List  -- done
  addList(model:any): Observable<any> {
    let url = `${this.baseUrl}AddDontLst`;
    let res = this._http.post(url, model);
    return res
  }

  //   async addList(model:any): Promise<any> {
  //   try{
  //     let url = this.baseUrl+"AddDontLst";
  //     let res = await this._http.post(url, model).toPromise();
  //     return res;
  //   }
  //   catch(err){
  //     console.error("Error in addList:", err);
  //     throw err;
  //   }
  // }


  // Delete List   -- done
  deleteList(donationTran: any): Observable<any> {
    let url = `${this.baseUrl}DelDontLst?donationTran=${donationTran}`;
    let res = this._http.delete(url);
    return res
  }

  // Update List  -- done
  updateList(model: any): Observable<any> {
    let url = `${this.baseUrl}UpdateDontLst`;
    let res = this._http.post(url, model);
    return res
  }

   // Get Donation Details
  getDonationDetails(DonationTran:any): Observable<any> {
    let url = `${this.baseUrl}getDonateDetails?doantTran=${DonationTran}`;
    let res = this._http.get(url);
    return res
  }

   // update Donaton Details
  updateListDetails(donationTran: any): Observable<any> {
    let url = `${this.baseUrl}UpdateDonateDetails`;
    let res = this._http.post(url, donationTran);
    return res
  }


}
