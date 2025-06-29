import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../interface/api_config';

@Component({
  selector: 'app-donate-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AutocompleteLibModule],
  templateUrl: './donate-details.component.html',
  styleUrl: './donate-details.component.css'
})
export class DonateDetailsComponent {

  constructor(private _fb:FormBuilder){}
  ngOnInit(){
    this.Init()
  }
  private baseUrl = new url().value;

  donateDetails!:FormGroup;
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
    this.donateDetails = this._fb.group({
      img: ['', [Validators.required]],
      colAmt: ['', [Validators.required]],
      raised: ['', [Validators.required]],
      progres: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      fix_amt1: ['', [Validators.required]],
      fix_amt2: ['', [Validators.required]],
      fix_amt3: ['', [Validators.required]],
      fix_amt4: ['', [Validators.required]],
      fix_amt5: ['', [Validators.required]],
      sumryPera: ['', [Validators.required]],
      sumryLi1: ['', [Validators.required]],
      sumryLi2: ['', [Validators.required]],
      sumryLi3: ['', [Validators.required]],
      sumryLi4: ['', [Validators.required]],
      sumryLi5: ['', [Validators.required]],
      sumryLi6: ['', [Validators.required]],
      sumryLi7: ['', [Validators.required]],
      sumryLi8: ['', [Validators.required]],
      smr_img1: ['', [Validators.required]],
      smr_img2: ['', [Validators.required]],
      smr_pra1: ['', [Validators.required]],
      smr_blockqt: ['', [Validators.required]],
      smr_pra2: ['', [Validators.required]],

    })
  }
  selectEvent(evt:any){}
  
  onSubmit(){}
  allot(){}
  clear(){}
  
}
