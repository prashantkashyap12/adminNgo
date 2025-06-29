import { Component } from '@angular/core';
import { url } from '../interface/api_config';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AutocompleteLibModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {

      constructor(private _fb:FormBuilder){}
      ngOnInit(){
        this.Init()
      }
      private baseUrl = new url().value;
      ProjectDetails!:FormGroup;
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
        this.ProjectDetails = this._fb.group({
          img1: ['', [Validators.required]],
          img2: ['', [Validators.required]],
          img3: ['', [Validators.required]],
          head1: ['', [Validators.required]],
          pera1: ['', [Validators.required]],
          pera11: ['', [Validators.required]],
          head2: ['', [Validators.required]],
          pera2: ['', [Validators.required]],
          head3: ['', [Validators.required]],
          pera3: ['', [Validators.required]],
          cat: ['', [Validators.required]],
          auth: ['', [Validators.required]],
          tag: ['', [Validators.required]],
          cost: ['', [Validators.required]],
          date: ['', [Validators.required]],
        })
      }



      selectEvent(evt:any){}
      
      onSubmit(){}
      allot(){}
      clear(){}
  

}

