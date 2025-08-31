import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UsePanelService } from '../service/user-panel.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { url } from '../../interface/api_config';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { TurncateWordPipe } from '../../interface/turncate-word.pipe';

@Component({
  selector: 'app-comming-event',
  standalone: true,
  imports: [AutocompleteLibModule, ReactiveFormsModule,FormsModule,CommonModule, HttpClientModule, MatButtonModule, MatDialogModule, TurncateWordPipe],
  providers:[UsePanelService],
  templateUrl: './comming-event.component.html',
  styleUrls: ['./comming-event.component.css', './comming-event.component.scss'],
})
export class CommingEventComponent {  
  
  readonly dialog = inject(MatDialog);

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
      Object.assign(this.eventRec[0], {type:'event'});
      // this.eventRec[0]['type'] = 'event';
      // this.eventRec[0].type = 'event';

    })
  }

  selectEvent(data:any){
    const windowWidth = window.outerWidth - 60;
    const windowHeight = window.outerHeight - 60;
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      width: `${windowWidth}px`,
      height: `${windowHeight}px`,
      data: this.eventRec[0],
      autoFocus: true,
      disableClose: false
    });
  }
  del(a:any){}
  allot(){}
}
