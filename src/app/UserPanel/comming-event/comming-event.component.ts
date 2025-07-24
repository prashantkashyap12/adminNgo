import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsePanelService } from '../service/user-panel.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comming-event',
  standalone: true,
  imports: [AutocompleteLibModule, ReactiveFormsModule,FormsModule,CommonModule, HttpClientModule],
  providers:[UsePanelService],
  templateUrl: './comming-event.component.html',
  styleUrl: './comming-event.component.css'
})
export class CommingEventComponent {
  loader:boolean = false;
  updateEvent!:FormGroup
  keyword="";
  data:any = [];
  eventRec:any=[]
  constructor(private _usrcommon:UsePanelService){}
  ngOnInit(){
    this.record();
  }
  record(){
    this._usrcommon.getEvent().subscribe(res=>{
      this.eventRec = res;
      console.log(this.eventRec)
    })
  }
  selectEvent(data:any){}
  del(a:any){}
  allot(){}
}
