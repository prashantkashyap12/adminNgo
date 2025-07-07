import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DocBuilderService } from '../service/doc-builder.service';
import { url } from '../../interface/api_config';
@Component({
  selector: 'app-doc-builder',
  standalone: true,
  imports: [AutocompleteLibModule, CommonModule, HttpClientModule, DatePipe],
  providers:[DocBuilderService],
  templateUrl: './doc-builder.component.html',
  styleUrl: './doc-builder.component.css'
})
export class DocBuilderComponent {

  private baseUrl = new url().value
  constructor(private _docBuildServ:DocBuilderService){}
  ngOnInit(){
    this.allot()
  }

  docShow:boolean = true;
  data:any =[]
  keyword="Name";

  // show
  IsVisible:any =false;
  // data
  Name:any;
  Post:any; 
  contact:any;
  UId:any
  ProfileImg:any;

  address:any;
  date:any;
  level:any;
  selectEvent(data:any){
    this.IsVisible = true
    if(this.docShow){
      this.ProfileImg = this.baseUrl + data.ProfileImg
      this.Name = data.Name;
      this.Post = data.designation;
      this.contact = data.Contact;
      this.UId = data.userId
    }
    if(this.docShow){
      this.address = data.AddressFull;
      this.date = data.ExpiryDate;
      this.level = data.join_cat;
    }
  }


  print1(){
    window.print()
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
