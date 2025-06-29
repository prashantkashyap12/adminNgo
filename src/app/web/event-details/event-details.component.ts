import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../interface/api_config';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AutocompleteLibModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {

  constructor(private _fb:FormBuilder){}
  ngOnInit(){
    this.Init()
  }

    private baseUrl = new url().value;

    EventDetails!:FormGroup;
    isVisible:boolean=true;
    updateAct:boolean=true;
  
    imagePreview1:any="";
    imagePreview2:any="";
    imagePreview3:any="";
    
    showList:boolean=true
    blogListHding:any="";
    data:any = []
    keyword="";

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



    selectEvent(evt:any){}
    
    onSubmit(){}
    allot(){}
    clear(){}

}
