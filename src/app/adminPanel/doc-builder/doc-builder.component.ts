import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DocBuilderService } from '../service/doc-builder.service';

@Component({
  selector: 'app-doc-builder',
  standalone: true,
  imports: [AutocompleteLibModule, CommonModule, HttpClientModule],
  providers:[DocBuilderService],
  templateUrl: './doc-builder.component.html',
  styleUrl: './doc-builder.component.css'
})
export class DocBuilderComponent {

  constructor(private _docBuildServ:DocBuilderService){}
  ngOnInit(){
    this.allot()
  }

  docShow:boolean = false;
  data:any =[]
  keyword="Name";
  selectEvent(data:any){
    if(data=="IdCard"){
      // patch interpolations
    }
    if(data=="OfferLetter"){
      // patch interpolations
    }
  }


  sendToUser(data:any){
    if(data=='IdCard'){
      // find UserId
      // Make Image Base64 Encripted, 'UserProFolder'
      // save OverRight Img url with profileTable Col
    }
    else if(data=='OfferLetter'){
      // find UserId
      // Make Image Base64 Encripted, 'UserProFolder'
      // save OverRight Img url with profileTable Col
    }
  }

  allot_ID(){
    this.data // all Id Card Service
  }
  allot_Letter(){
    this.data // all Offer Letter Service
  }
  allot(){
    this._docBuildServ.getRecord().subscribe(res=>{
      this.data = res.results;
    })
  }

}
