import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  token: string = '';

  constructor() { }
  ngOnInit() {
    this.token = sessionStorage.getItem('token') || '';
  }
  dashUser = new Subject<any>();
  getHeaderOptions() {
    return {
      Headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
  }

  


}
