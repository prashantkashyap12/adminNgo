import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../interface/api_config';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AutocompleteLibModule, HttpClientModule],
  providers: [EventService],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {

  constructor(private _fb:FormBuilder, private _evtServ:EventService){}
  ngOnInit(){
    this.Init();
    this.allot();
    this.isVisible = false
  }

    private baseUrl = new url().value;

    EventDetails!:FormGroup;
    isVisible:boolean=true;
    updateAct:boolean=true;
  
    imagePreview1:any="";
    imagePreview2:any="";
    imagePreview3:any="";
    
    showList:boolean=true
    eventListHding:any="";
    data:any = []
    keyword="Heading";

    eventTran:any

    Init(){
      this.EventDetails = this._fb.group({
        img: ['', [Validators.required]],
        dadicat: ['', [Validators.required]],
        head1: ['', [Validators.required]],
        pera11: ['', [Validators.required]],
        pera12: ['', [Validators.required]],
        head2: ['', [Validators.required]],
        pera22: ['', [Validators.required]],
        li1: ['', [Validators.required]],
        li2: ['', [Validators.required]],
        li3: ['', [Validators.required]],
        li4: ['', [Validators.required]],
        li5: ['', [Validators.required]],
        otherHead: ['', [Validators.required]],
        parti1: ['', [Validators.required]],
        parti12: ['', [Validators.required]],
        parti13: ['', [Validators.required]],
        parti14: ['', [Validators.required]],
        parti15: ['', [Validators.required]],
        parti16: ['', [Validators.required]],
        parti17: ['', [Validators.required]],
      })
    }



    selectEvent(evt:any){
      this.isVisible = true;
      this.eventListHding = evt.Heading;
      this.eventTran = evt.EventTran;
      this._evtServ.eventDetailsList(evt.EventTran).subscribe(res=>{
        this.patchData(res.results[0]);
      })
    }

    patchData(evt:any){
      this.updateAct = false;
      this.imagePreview1 = this.baseUrl + evt.ImgPath;
      this.EventDetails.patchValue({
        dadicat: evt.Dedicate,
        head1: evt.Head1,
        pera11: evt.Pera11,
        pera12: evt.Pera12,
        head2: evt.Head2,
        pera22: evt.Pera22,
        li1: evt.Li1,
        li2: evt.Li2,
        li3: evt.Li3,
        li4: evt.Li4,
        li5: evt.Li5,
        otherHead: evt.OtherHead,
        parti1: evt.Parti1,
        parti12: evt.Parti12,
        parti13: evt.Parti13,
        parti14: evt.Parti14,
        parti15: evt.Parti15,
        parti16: evt.Parti16,
        parti17: evt.Parti17,
        img: evt.ImgPath
      })
    }

    IformFile:any;
    onFileSelected1(event:any){
      if(event.target.files.length == 1){
        this.IformFile = event.target.files[0];
      }
    }
    
    onSubmit(){
      let formData = new FormData();
      formData.append('eventTran', this.eventTran);
      formData.append('img', this.IformFile as File);
      formData.append('dadicat', this.EventDetails.value.dadicat);
      formData.append('head1', this.EventDetails.value.head1);
      formData.append('pera11', this.EventDetails.value.pera11);
      formData.append('pera12', this.EventDetails.value.pera12);
      formData.append('head2', this.EventDetails.value.head2);
      formData.append('pera22', this.EventDetails.value.pera22);
      formData.append('li1', this.EventDetails.value.li1);
      formData.append('li2', this.EventDetails.value.li2);
      formData.append('li3', this.EventDetails.value.li3);
      formData.append('li4', this.EventDetails.value.li4);
      formData.append('li5', this.EventDetails.value.li5);
      formData.append('otherHead', this.EventDetails.value.otherHead);
      formData.append('parti1', this.EventDetails.value.parti1);
      formData.append('parti12', this.EventDetails.value.parti12);
      formData.append('parti13', this.EventDetails.value.parti13);
      formData.append('parti14', this.EventDetails.value.parti14);
      formData.append('parti15', this.EventDetails.value.parti15);
      formData.append('parti16', this.EventDetails.value.parti16);
      formData.append('parti17', this.EventDetails.value.parti17);
      if(true){
        this._evtServ.eventDetailsAdd(formData).subscribe(res=>{
          if(res.status){
            alert("Event Details Added Successfully");
            this.ngOnInit();
            this.imagePreview1 = null;
          }
        })
      }
    }
    allot(){
      this._evtServ.getEventList().subscribe(res=>{
        this.data = res.result;
      })
    }

    clear(){
      this.isVisible = false
    }

}
