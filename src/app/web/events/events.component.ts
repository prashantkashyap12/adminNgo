import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../interface/api_config';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AutocompleteLibModule, HttpClientModule, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

    constructor(private _fb:FormBuilder){}
    ngOnInit(){
      this.Init()
    }


    private baseUrl = new url().value;
    EventLsForm!:FormGroup;
    keyword="linkText1";
    data:any = [  ]

  
    showList:boolean = true;
    updateAct:boolean = true;
    imagePreview:any = null;
    ProjTran:any;
  
    Init(){
      this.EventLsForm = this._fb.group({
        date: ['', [Validators.required]],
        heading: ['', [Validators.required]],
        pera: ['', [Validators.required]],
        place: ['', [Validators.required]],
        address: ['', [Validators.required]],
        imgPath: ['', [Validators.required]],
        link: ['', [Validators.required]],
        linkText: ['', [Validators.required]]
      })
    }
  
    // autoComplete 
    selectEvent(data:any){
    }
    
    fileUpdate(file:any){}
  
    onSubmit(){
      console.log(this.EventLsForm.value);
    }
    delet(){}
    allot(){}
    fresh(){}
  

}
