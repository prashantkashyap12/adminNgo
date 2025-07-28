import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../../interface/api_config';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AutocompleteLibModule, HttpClientModule, CommonModule],
  providers: [EventService],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
    loader:boolean = false;
    constructor(private _fb:FormBuilder, private _evtServ:EventService){}
    ngOnInit(){
      this.Init()
      this.allot();
    }

    private baseUrl = new url().value;
    EventLsForm!:FormGroup;
    keyword="Heading";
    data:any = [ ]

  
    showList:boolean = true;
    updateAct:boolean = true;
    imagePreview:any = null;
    EvtTran:any;
  
    Init(){
      this.EventLsForm = this._fb.group({
        date: ['', [Validators.required]],
        heading: ['', [Validators.required]],
        pera: ['', [Validators.required]],
        place: ['', [Validators.required]],
        address: ['', [Validators.required]],
        link: ['', [Validators.required]],
        linkText: ['', [Validators.required]],
        imgPath: [null, [Validators.required]],
      })
    }
  
    // Autocomplete Select and Patch data with form 
    selectEvent(data:any){
      this.updateAct = false;
      this.EvtTran = data.EventTran;
      this.imagePreview = this.baseUrl + data.ImgPath;
      this.EventLsForm.patchValue({
        date: data.Date,
        heading: data.Heading,
        pera: data.Para,
        place: data.Place,
        address: data.Address,
        link: data.Link,
        linkText: data.LinkText,
        imgPath: data.ImgPath
      })
    }
    

    // get IFromFile set with
    IFromFile:any;
    fileUpdate(file:any){
      if(file.target.files.length == 1){
        this.IFromFile = file.target.files[0];
      }
    }
  
    onSubmit(){
      this.loader = true;
        let formData = new FormData();
        formData.append('date', this.EventLsForm.value.date);
        formData.append('heading', this.EventLsForm.value.heading);
        formData.append('pera', this.EventLsForm.value.pera);
        formData.append('place', this.EventLsForm.value.place);
        formData.append('address', this.EventLsForm.value.address);
        formData.append('imgPath', this.IFromFile as File);
        formData.append('link', this.EventLsForm.value.link);
        formData.append('linkText', this.EventLsForm.value.linkText);

        if(this.updateAct){
          // Add Event
          this._evtServ.AddEventList(formData).subscribe(res=>{
            if(res.state){
              alert('Event Added Successfully');
              this.Init();
              this.allot();
              this.loader = false;
            }
          })
        }else{
          // Update Event
          formData.append('eventTran', this.EvtTran);
          this._evtServ.updateEventList(formData).subscribe(res=>{
            if(res.state){
              alert('Event Updated Successfully');
              this.Init();
              this.allot();
              this.updateAct = true;
              this.imagePreview = null;
              this.loader = false;
            }
          })
        }
    } 

    // Done
    delet(){
      this.loader = true;
      this._evtServ.deleteEventList(this.EvtTran).subscribe(res=>{
        if(res.state){
          this.allot();
          this.Init();
          this.updateAct = true;
          alert('Event Deleted Successfully');
          this.loader = false;
        }
      })
    }

  // get Event List
  allot(){
    this._evtServ.getEventList().subscribe(res=>{
      this.data = res.result;
    })
  }

  fresh(){
    this.Init();
    this.updateAct = true;
    this.imagePreview = null;
  }
}
