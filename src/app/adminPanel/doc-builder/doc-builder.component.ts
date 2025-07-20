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
  loader:any = false;
  private baseUrl = new url().value;
  @ViewChild('capture1',{ static: false }) captrure1!:ElementRef; 
  @ViewChild('capture2',{static: false}) captrure2!:ElementRef
  constructor(private _docBuildServ:DocBuilderService){}
  ngOnInit(){
    this.allot()
  }

  docShow:boolean = true;
  data:any =[]
  keyword="Name";

  // show
  IsVisible:any =true;

  // data binding
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

  // Data Calling
  allot(){
    this.loader =true;
    this._docBuildServ.getRecord().subscribe(res=>{
      this.data = res.results;
      this.loader =false;

    })
  }

  // Print Format / Save PDF
  print1(data:any){   
    let printCont;
    if(data=='OfferLetter'){
      printCont = this.captrure2.nativeElement.innerHTML;  
    }else if(data=='IDCard'){
      printCont = this.captrure1.nativeElement.innerHTML;  
    }
    const printBox = window.open('', '_blank', 'width=1000,height=500');
    if(printBox){
      printBox.document.open();
      printBox.document.write(`
        <html>
          <head>
          <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          @media print {
            * {
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-sizing: border-box;
            }
            
            .tempDesign > .offerLetter{
              width:100% !important;
              height:100% !important;
              overflow:hidden
            }
            .printBtn{
              display:none;
            }

            .conent > .hd1{
              position: absolute;
              top: 320px;
              left: 280px;
              font-weight:500;
            }
            .conent > .hd2{
              position: absolute;
              top: 355px;
              left: 320px;
              text-align: start;
            }
            .conent > .hd3{
              position: absolute;
              top: 380px;
              left: 320px;
              width:280px;
              line-height: 20px;
            }
            .conent > .subject{
              position: absolute;
              top: 450px;
              left: 320px;
              line-height: 20px;
              text-align: justify;
            }
            .conent > .main_p1 { 
              position: absolute;
              top: 500px;
              left: 270px;
              width:500px;
              line-height: 23px;
            }
            .conent > .main_p2 { 
              position: absolute;
              top: 530px;
              left: 270px;
              width:450px;
              line-height: 23px;
              text-align: justify;
            }
            .conent > .mainLs { 
              position: absolute; 
              top: 610px;
              left: 280px;
              width:450px;
              line-height: 22px;
              text-align: justify;
            }
            .conent > .main_p3 { 
              position: absolute; 
              top: 685px;
              left: 270px;
              width:450px;
              line-height: 23px;
              text-align: justify;
            }
            .conent > .main_p4 { 
              position: absolute;
              top: 760px;
              left: 270px;
              width:450px;
              line-height: 23px;
              text-align: justify;
            }
            // footer Style - waiting



            // ID CARD _ OPEN
            .content{
              bacground:red;
            }
            .content > .imgPro{
              width: 213px;
              height: 244px;
              position: absolute;
              left: 185px;
              top: 332px;
              border-radius: 8px;
            }
            .content > .name{
              position: absolute;
              left: 85px;
              top: 590px;
              font-size: 38px;
              text-align: center;
              text-transform: uppercase;
              font-weight: 700;
              font-family: "Inter" !important; 
            }
            .content > .post{
              position: absolute;
              left: 130px;
              top: 635px;
              font-size: 35px;
              text-align: center;
            }
            .content > .contact{
              position: absolute;
              left: 168px;
              top: 675px;
              font-size: 32px;
              text-align: center;
              font-weight:500
            } 
            .content > .idnum{
              position: absolute;
              left: 281px;
              top: 765px;
              font-size: 30px;
              text-align: center;
              font-weight:700
            } 
          </style>
          </head>
          <body onload="window.print();" onafterprint="window.close();">
            ${printCont}
          </body>
        </html>
      `);
      printBox.document.close();
    }
  }
}
