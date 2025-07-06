import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../../interface/api_config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = new url().value;
  constructor(private _http:HttpClient) { }

  // Get all projects Ls - done
  getProjectsLs():Observable<any>  {
    let url = this.baseUrl + 'getProjLs';
    return this._http.get(url);
  }
  // Add a new project Ls - done
  AddProjectLs(data: any): Observable<any> {
    let url = this.baseUrl + 'AddProjLs';
    return this._http.post(url, data);
  }
  // Delete a project Ls - done
  deleteProjectLs(projectTran: any): Observable<any> {
    let url = this.baseUrl + `delProjectLs?projectTran=${projectTran}`;
    return this._http.delete(url);
  }
  // Update a project Ls - done
  updateProjectLs(data: any): Observable<any> {
    let url = this.baseUrl + 'updateProjectLs';
    return this._http.post(url, data);
  }

  // Get all projectsDetails
  getProjectDetails(projectTran: any): Observable<any> {
    let url = this.baseUrl + `GetDetailsProjId?ProjTran=${projectTran}`;
    return this._http.get(url);
  }
  // Update projectDetails
  updateProjectDetails(data: any): Observable<any> {
    let url = this.baseUrl + 'updateProjectDtls';
    return this._http.post(url, data);
  }


}
