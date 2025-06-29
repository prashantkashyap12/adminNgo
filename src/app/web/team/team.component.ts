import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../interface/api_config';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule, AutocompleteLibModule],
  
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

  constructor(private _fb:FormBuilder){}
  ngOnInit(){
    this.Init()
  }
    private baseUrl = new url().value;
    TeamForm!:FormGroup;
    keyword="linkText1";
    data:any = [  ]
    showList:boolean = true;
    updateAct:boolean = true;
    imagePreview:any = null;
    ProjTran:any;
  
    // autoComplete 

    Init(){
     this.TeamForm = this._fb.group({
      imgPath: ['', [Validators.required]],
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
     })
    }


    selectEvent(data:any){
    }
    
    fileUpdate(file:any){}
  
    onSubmit(){}
    delet(){}
    allot(){}
    fresh(){}
  

}
