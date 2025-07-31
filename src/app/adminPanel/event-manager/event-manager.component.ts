import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@Component({
  selector: 'app-event-manager',
  standalone: true,
  imports: [FormsModule, AutocompleteLibModule, CommonModule, ReactiveFormsModule],
  templateUrl: './event-manager.component.html',
  styleUrl: './event-manager.component.css'
})
export class EventManagerComponent {

  constructor(private _fb:FormBuilder){}
  ngOnInit(){
    this.Init();
  }
  loader:boolean = false;
  data:any = []
  keyword="";
  showList:boolean = true;
  updateAct:boolean = false;
  
  eventLive!:FormGroup;
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

  selectEvent(data:any){}
  allot(){}
  del(a:any){}
  onSubmit(){
    console.log(this.eventLive.value);
  }
  clear(){}
}
