import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  token: string = '';

  constructor() { }

  @Input() language = new BehaviorSubject<string>('en');


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
