import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { EventManagerService } from '../service/event-manager.service';
import { url } from '../../interface/api_config';
import { DocBuilderService } from '../service/doc-builder.service';

@Component({
  selector: 'app-event-manager',
  standalone: true,
  imports: [FormsModule, AutocompleteLibModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [EventManagerService, DocBuilderService],
  templateUrl: './event-manager.component.html',
  styleUrl: './event-manager.component.css'
})
export class EventManagerComponent {
  constructor(private _fb:FormBuilder, private _EvtMang:EventManagerService, private _UserRec:DocBuilderService ){}
  ngOnInit(){
    this.Init();
    this.allot();
  }

  private baseUrl = new url().value; 
  loader:boolean = false;
  data:any = []
  keyword="EventName";
  showList:boolean = true;
  updateAct:boolean = false;
  eventLive!:FormGroup;
  eventManger:any;
  eventImg:any;
  Init(){
    this.eventLive = this._fb.group({
      allowUser:['', [Validators.required]],
      EventName:['', Validators.required],
      ProjectCat:['', Validators.required],
      EventDescription:['', Validators.required],
      EventCategory:['', Validators.required],
      Locat:['', Validators.required],
      LandMark:['', Validators.required],
      OrganizerName:['', Validators.required],
      Contact:['', Validators.required],
      Email:['', Validators.required],
      EventDiscription:['', Validators.required],
      EventPurpose:['', Validators.required],
      ParticipantsNo:['', Validators.required],
      PartnerOrganizations:['', Validators.required],
      Resources:['', Validators.required],
      Comments:['', Validators.required],
      SetImg:['', Validators.required],
      DatTim:['', Validators.required],
    })
  }

  fileRec:any;
  imgMain(event:any){
    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileRec = file;
    }
  }

  selectEvent(data:any){
    this.eventManger = data.IdEvent
    this.eventLive.patchValue({
      allowUser: data.userId,
      EventName:data.EventName,
      ProjectCat: data.ProjectCat,
      EventDescription:data.EventDescription,
      EventCategory:data.EventCategory,
      Locat:data.Locat,
      LandMark:data.LandMark,
      OrganizerName:data.OrganizerName,
      Contact:data.Contact,
      Email:data.Email,
      EventDiscription:data.EventDiscription,
      EventPurpose:data.EventPurpose,
      ParticipantsNo:data.ParticipantsNo,
      PartnerOrganizations:data.PartnerOrganizations,
      Resources:data.Resources,
      Comments:data.Comments,
      DatTim:data.DatTim,
      SetImg:this.baseUrl+data.SetImg,
    })
    this.eventImg = this.baseUrl+data.SetImg;
  }


  allot(){
    this._EvtMang.getEvent("999").subscribe(res=>{
      this.data = res.massage;
    })
    this.allot2();
  }


  userList:any= []
  keyword2="Name";
  allot2(){
    this._UserRec.getRecord().subscribe(res=>{
       this.userList = res.results;
    })
  }

  del(a:any){}
  onSubmit(){
    console.log(this.eventLive.value);
  }
  clear(){}
}
