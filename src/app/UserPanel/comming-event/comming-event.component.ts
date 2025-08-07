import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsePanelService } from '../service/user-panel.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { url } from '../../interface/api_config';

@Component({
  selector: 'app-comming-event',
  standalone: true,
  imports: [AutocompleteLibModule, ReactiveFormsModule,FormsModule,CommonModule, HttpClientModule],
  providers:[UsePanelService],
  templateUrl: './comming-event.component.html',
  styleUrls: ['./comming-event.component.css', './comming-event.component.scss'],
})
export class CommingEventComponent {
  loader:boolean = false;
  updateEvent!:FormGroup
  keyword="";
  data:any = [];
  eventRec:any=[]
  public baseUrl = new url().value;
  background:any = "";
  constructor(private _usrcommon:UsePanelService){}
  ngOnInit(){
    this.record();
  }
  record(){
    let userId:string = sessionStorage.getItem('userId') as string;
    this._usrcommon.getEvent(userId?.toString()).subscribe(res=>{
      this.eventRec = res.record;
      console.log(this.eventRec)
    })
  }

  selectEvent(data:any){}
  del(a:any){}
  allot(){}
}
