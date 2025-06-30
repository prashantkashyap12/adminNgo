import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  token: string = '';

  constructor() { }
  ngOnInit() {
    this.token = sessionStorage.getItem('token') || '';
  }
  getHeaderOptions() {
    return {
      Headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
  }

  


}
