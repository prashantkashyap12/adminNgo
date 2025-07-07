import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DocBuilderService } from '../service/doc-builder.service';
import { url } from '../../interface/api_config';
import html2canvas from 'html2canvas';
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
      // find UserId
      // Make Image Base64 Encripted, 'UserProFolder'
      // save OverRight Img url with profileTable Col
      
      // this.UId // userImg/UId/IdCard.jpg
      const img = await html2canvas(IdCard1);
      img.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'IdCard.png', { type: 'image/png' });
          let dataForm = new FormData();
          dataForm.append('Img', file);

          // service Call
            console.log(dataForm);

        }
      },'image/png');
    }
    else if(data=='OfferLetter'){
        const img = await html2canvas(IdCard2);
        img.toBlob((Blob)=>{
          if(Blob){
            const file = new File([Blob], 'OfferLetter.png', {type:'image/png'});
            let dataForm = new FormData();
            dataForm.append('Img', file);

            // service Call
            console.log(dataForm);
          }
        })
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
