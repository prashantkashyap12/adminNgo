import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../interface/api_config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl = new url().value;
  constructor(private _http:HttpClient) { }

  // get Team List
  getTeam():Observable<any>{
    let url = this.baseUrl+'GetTeamList';
    return this._http.get(url)
  }

  // Add Team List
  AddTeam(data:any):Promise<any>{
    let url = this.baseUrl +'AddTeam';
    let res = this._http.post(url, data).toPromise();
    return res;
  }

  // Delete Team List
  DeleteTeam(TeamId:any):Promise<any>{
    let url = `${this.baseUrl}DeleteTeam2?teamTranId=${TeamId}`;
    let res = this._http.delete(url).toPromise();
    return res;
  }

  // Update Team 
  updateTeam(data:any):Promise<any>{
    let url = this.baseUrl+'TeamUpdate';
    let res = this._http.post(url, data).toPromise();
    return res;
  }
}
