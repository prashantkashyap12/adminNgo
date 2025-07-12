import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DocBuilderService } from '../service/doc-builder.service';
import { url } from '../../interface/api_config';
// import html2canvas from 'html2canvas';
@Component({
  selector: 'app-doc-builder',
  standalone: true,
  imports: [AutocompleteLibModule, CommonModule, HttpClientModule, DatePipe],
  providers:[DocBuilderService],
  templateUrl: './doc-builder.component.html',
  styleUrl: './doc-builder.component.css'
})
export class DocBuilderComponent {
  private baseUrl = new url().value;
  @ViewChild('capture1',{ static: false }) capture1!:ElementRef; 
  @ViewChild('capture2',{static: false}) captrure2!:ElementRef
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
      this. ProfileImg = data.ProfileImg != null || data.ProfileImg != undefined ? this.baseUrl+data.ProfileImg:null
      this.ProfileImg =  this.ProfileImg??'../../../assets/noImg.png';
      this.Name = data.Name;
      this.Post = data.designation??'Designation';
      this.contact = data.Contact;
      this.UId = data.userId
    }
    if(this.docShow){
      this.address = data.AddressFull??'Add Address';
      this.date = data.ExpiryDate;
      this.level = data.join_cat??'Join Category';
    }
  }

  print1(){
    window.print()
  }
  async sendToUser(data:any){
    const IdCard1 = this.capture1.nativeElement;
    const IdCard2 = this.captrure2.nativeElement;
    if(data=='IdCard'){
    }
    else if(data=='OfferLetter'){
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
 
  @ViewChild('printSection') printSect!:ElementRef;
  print(){   // Print
    const printCont = this.printSect.nativeElement.innerHTML;  
    const printBox = window.open('', '_blank', 'width=360,height=500');
    if(printBox){
      printBox.document.open();
      printBox.document.write(`
        <html>
          <head>
          <style>
          .tempDesign > img {
            width: 100%
          }
          .conent{
            font-size: 12px;
            font-family: sans-serif;
          }
          .conent > .hd1{
            position: absolute;
            top: 187px;
            left: 136px;
          }
          .conent > .hd2{
            position: absolute;
            top: 209px;
            left: 160px;
            text-align: start;
          }
          .conent > .hd3{
            position: absolute;
            top: 226px;
            left: 10pc;
          }
          .conent > .subject{
              position: absolute;
              top: 244px;
              left: 160px;
          }
          .conent > .main_p1 { 
              position: absolute;
              top: 285px;
              left: 8pc;
          }
          .conent > .main_p2 { 
              position: absolute; 
              left: 8pc;
              top: 19pc;
              width: 268px;
              text-align: justify;
          }
          .conent > .mainLs { 
              position: absolute; 
              left: 104px;
              top: 22.3pc;
          }
          .conent > .main_p3 { 
              position: absolute; 
              left: 8pc;
              top: 25.5pc;
              width: 271px;
              text-align: justify;
          }
          .conent > .main_p4 { 
              position: absolute;
              top: 28.5pc;
              left: 8pc; 
          }
          .conent .main_p5{
            position: absolute; 
          }
          .conent > .footer { 
              position: absolute; 
              left: 6pc;
              top: 30.5pc;
              list-style: none;
          }

          .footer > li{
          }
          </style>
          </head>
          <body onload="window.print();window.close();">
            ${printCont}
          </body>
        </html>
      `);
      printBox.document.close();
    }
  }
}
