import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../interface/api_config';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule, CommonModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {
    constructor(private _fb:FormBuilder){}
    ngOnInit(){
      this.Init()
    }
    private baseUrl = new url().value;
    DonateForm!:FormGroup;
    keyword="linkText1";
    data:any = [  ]
      
    showList:boolean = true;
    updateAct:boolean = true;
    imagePreview:any = null;
    ProjTran:any;
  
    Init(){
      this.DonateForm = this._fb.group({
        imgPath: ['', [Validators.required]],
        categ: ['', [Validators.required]],
        rais: ['', [Validators.required]],
        goal: ['', [Validators.required]],
        heading: ['', [Validators.required]],
        para: ['', [Validators.required]],
        progress: ['', [Validators.required]],
        link: ['', [Validators.required]],
      })
    }
  
  
    // autoComplete 
    selectEvent(data:any){
    }
    
    fileUpdate(file:any){}
  
    onSubmit(){}
    delet(){}
    allot(){}
    fresh(){}
  

}
