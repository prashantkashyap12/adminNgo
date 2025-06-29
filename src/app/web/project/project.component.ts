import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../interface/api_config';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule, AutocompleteLibModule],
  
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  constructor(private _fb:FormBuilder){}
  ngOnInit(){
    this.Init()
  }
  private baseUrl = new url().value;
  ProjectForm!:FormGroup;
  keyword="linkText1";
  data:any = [  ]
  showList:boolean = true;
  updateAct:boolean = true;
  imagePreview:any = null;
  ProjTran:any;

  Init(){
    this.ProjectForm = this._fb.group({
      imgpath: ['', Validators.required],
      head: ['', Validators.required],
      pera: ['', Validators.required],
      path: ['', Validators.required],
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

