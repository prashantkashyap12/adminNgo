import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsePanelService } from '../service/user-panel.service';

@Component({
  selector: 'app-comming-event',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers:[UsePanelService],
  templateUrl: './comming-event.component.html',
  styleUrl: './comming-event.component.css'
})
export class CommingEventComponent {

  constructor(private _usrcommon:UsePanelService){}
  ngOnInit(){
    this.record();
  }
  eventRec:any=[]
  record(){
    this._usrcommon.getEvent().subscribe(res=>{
      this.eventRec = res;
      console.log(this.eventRec)
    })
  }
}
