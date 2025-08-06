import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { EventManagerService } from '../service/event-manager.service';
import { url } from '../../interface/api_config';
import { DocBuilderService } from '../service/doc-builder.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@Component({
  selector: 'app-event-manager',
  standalone: true,
  imports: [FormsModule, AutocompleteLibModule, CommonModule, ReactiveFormsModule, HttpClientModule, AngularMultiSelectModule],
  providers: [EventManagerService, DocBuilderService],
  templateUrl: './event-manager.component.html',
  styleUrl: './event-manager.component.css'
})
export class EventManagerComponent {
  constructor(private _fb:FormBuilder, private _EvtMang:EventManagerService, private _UserRec:DocBuilderService ){}
  ngOnInit(){
    this.Init();
    this.multiSelectModel();
    this.allot();
  }

  @ViewChild('agMult') elementRec!:ElementRef;
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

  ngAfterViewInit(){
    if (this.elementRec) {
      console.log(this.elementRec.nativeElement);
    }
  }
    
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings = {};
  multiSelectModel(){
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select Users",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class",
      idField: 'userId',
      textField: 'Name',
    };  
  }
  onItemSelect(item:any){
      console.log(item);
      console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
      console.log(item);
      console.log(this.selectedItems);
  }
  onSelectAll(items: any){
      console.log(items);
  }
  onDeSelectAll(items: any){
      console.log(items);
  }
  fileRec:any;
  imgMain(event:any){
    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileRec = file;
    }
  }

  selectEvent(data:any){
    this.delVar = data.liveEventId;
    this.eventManger = data.IdEvent;
    this.eventImg = this.baseUrl+data.SetImg;
    console.log(this.userListAll);
    let userName = this.userListAll.find((a:any)=>a.userId==data.userId);
    this._EvtMang.getEvent(data.liveEventId).subscribe(res=>{
      this.selectedItems = res.massage.map((data:any)=>({
        id:data.userId,
        itemName:data.Name || 'No Name'
       }))
    })
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
    // get userList
   
  }


  userList:any= [];
  userListAll:any = [];
  allot(){
    this._EvtMang.getEvent("00000").subscribe(res=>{
     let data:any  = new Set(res.massage.map((a:any)=>a.userId));
     let recRc:any[]=[];
     for(let da of data){
      let dataFinal = res.massage.find((a:any)=>(a.userId == da))
      if(dataFinal){
        recRc.push(dataFinal);
      }
     }
     console.log(recRc);
     this.data = recRc
    })

    this._UserRec.getRecord().subscribe(res=>{
       this.userListAll = res.results;
       this.userList = res.results.map((data:any)=>({
        id:data.userId,
        itemName:data.Name || 'No Name'
       }))
      console.log(this.userList)
    },(err)=>{
      console.log("Error Msg"+err);
    })
  }

  delVar:any;
  delete(){
    if(confirm("Are you sure you want to delete this event?")){
      this._EvtMang.deleteEvent(this.delVar).subscribe(res=>{
        if(res.state){
          alert("Event Deleted Successfully");
          this.ngOnInit();
        }else{
          alert(res.state.res);
        }
      }, (err)=>{
        alert(err);
      })
    }

  }

  errorMsg:boolean = false;
  onSubmit(){
    this.errorMsg = true
    if(this.eventLive.invalid){
      alert("Please Fill All Required Fields");
      return;
    }
    let formData = new FormData();
    // formData.append('userId', JSON.(this.eventLive.value.allowUser)), //

    this.eventLive.value.allowUser.forEach((user:any, index:any) => {
      formData.append(`userId[${index}].id`, user.id);
      formData.append(`userId[${index}].Name`, user.Name);
    });
    formData.append('EventName', this.eventLive.value.EventName), //
    formData.append('ProjectCat', this.eventLive.value.ProjectCat), //
    formData.append('EventDescription', this.eventLive.value.EventDescription),//
    formData.append('EventCategory', this.eventLive.value.EventCategory), //
    formData.append('LandMark', this.eventLive.value.LandMark),//
    formData.append('Locat', this.eventLive.value.Locat), // 
    formData.append('OrganizerName', this.eventLive.value.OrganizerName), //
    formData.append('Contact', this.eventLive.value.Contact), //
    formData.append('Email', this.eventLive.value.Email),  //
    formData.append('EventDiscription', this.eventLive.value.EventDiscription), //
    formData.append('EventPurpose', this.eventLive.value.EventPurpose),  //
    formData.append('ParticipantsNo', this.eventLive.value.ParticipantsNo),  //
    formData.append('PartnerOrganizations', this.eventLive.value.PartnerOrganizations), //
    formData.append('Resources', this.eventLive.value.Resources), //
    formData.append('Comments', this.eventLive.value.Comments), //
    formData.append('DatTim', this.eventLive.value.DatTim),//
    formData.append('EventImg', this.fileRec) //
    console.log(this.eventLive.value);
    if(this.updateAct==true){
      this._EvtMang.AddLiveEvent(formData).subscribe(res=>{
        if(res.state){
          alert("Event Add Successfully");
          this.ngOnInit()
        }else{
          alert(res.state.res);
        }
      }, (err)=>{
          alert(err);
      })
    }else{
      this._EvtMang.updateEvnet(formData).subscribe(res=>{
        if(res.state){
          alert("Live Event Updated Successfully");
          this.ngOnInit();
        }else{
          alert(res.state.res);
        }
      }, (err) =>{
        alert(err);
      })
    }
  }
  clear(){
    this.ngOnInit()
  }
}
