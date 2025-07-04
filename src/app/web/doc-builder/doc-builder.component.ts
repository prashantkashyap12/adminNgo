import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@Component({
  selector: 'app-doc-builder',
  standalone: true,
  imports: [AutocompleteLibModule, CommonModule],
  templateUrl: './doc-builder.component.html',
  styleUrl: './doc-builder.component.css'
})
export class DocBuilderComponent {

  docShow:boolean = false;
  data:any =[]
  keyword="";
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

}
