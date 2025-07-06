import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../../interface/api_config';
import { DonateService } from '../service/donate.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-donate-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AutocompleteLibModule, HttpClientModule],
  providers: [DonateService],
  templateUrl: './donate-details.component.html',
  styleUrl: './donate-details.component.css'
})
export class DonateDetailsComponent {

  @ViewChild('img1') img1A!:ElementRef;
  @ViewChild('smrImg1') smrImg1!:ElementRef;
  @ViewChild('smrImg2') smrImg2!:ElementRef;

  constructor(private _fb:FormBuilder, private _donate:DonateService){}
  ngOnInit(){
    this.Init();
    this.allot();
  }
  private baseUrl = new url().value;

  donateDetails!:FormGroup;
  isVisible:boolean=false;
  updateAct:boolean=true;

  imagePreview1:any="";
  imagePreview2:any="";
  imagePreview3:any="";
  
  showList:boolean=true
  blogListHding:any="";
  data:any = []
  keyword="Heading";
  doanteKey:any;
  Init(){
    this.donateDetails = this._fb.group({
      img: [null],
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
      smr_img1: [null],
      smr_img2: [null],
      smr_pra1: ['', [Validators.required]],
      smr_blockqt: ['', [Validators.required]],
      smr_pra2: ['', [Validators.required]],
    })
  }


  img1:any;
  check1(evt:any){
    if (evt.target.files.length == 1) {
      let file = evt.target.files[0];
      this.img1 = file;
    }
  }

  img2:any;
  check2(evt:any){
    if (evt.target.files.length == 1) {
      let file = evt.target.files[0];
      this.img2 = file;
    }
  }

  img3:any;
  check3(evt:any){
    if (evt.target.files.length == 1) {
      let file = evt.target.files[0];
      this.img3 = file;
    }
  }

  selectEvent(evt:any){
    this.isVisible = true
    this.doanteKey = evt.DonationTran;
     this._donate.getDonationDetails(evt.DonationTran).subscribe(res=>{
      let resp = res.result[0]
      this.datapatch(resp)
    })
  }
  datapatch(evt:any){

    this.imagePreview1 = this.baseUrl+evt.Img !=null ? this.baseUrl+evt.Img:'Image not Marked';
    this.imagePreview2 = this.baseUrl+evt.SmrImg1 !=null ? this.baseUrl+evt.SmrImg1:'Image not Marked';
    this.imagePreview3 = this.baseUrl+evt.SmrImg2 !=null ? this.baseUrl+evt.SmrImg2:'Image not Marked';
    this.donateDetails.patchValue({
      colAmt: evt.ColAmt,
      raised: evt.Raised,
      progres: evt.Progres,
      notes: evt.Notes,
      fix_amt1: evt.FixAmt1,
      fix_amt2: evt.FixAmt2,
      fix_amt3: evt.FixAmt3,
      fix_amt4: evt.FixAmt4,
      fix_amt5: evt.FixAmt5,
      sumryPera: evt.SumryPera,
      sumryLi1: evt.SumryLi1,
      sumryLi2: evt.SumryLi2,
      sumryLi3: evt.SumryLi3,
      sumryLi4: evt.SumryLi4,
      sumryLi5: evt.SumryLi5,
      sumryLi6: evt.SumryLi6,
      sumryLi7: evt.SumryLi7,
      sumryLi8: evt.SumryLi8,
      smr_pra1: evt.SmrPra1,
      smr_blockqt: evt.SmrBlockqt,
      smr_pra2: evt.SmrPra2,
    });

    this.img1A.nativeElement.value = evt.Img;
    this.smrImg1.nativeElement.value = evt.Img;
    this.smrImg2.nativeElement.value = evt.Img;

    // img:evt.Img,
    //   smr_img1: evt.SmrImg1,
    //   smr_img2: evt.SmrImg2



  }
  
  onSubmit(){
    let Fd = new FormData();
    Fd.append('img', this.img1 as File)
    Fd.append('colAmt', this.donateDetails.get('colAmt')?.value);
    Fd.append('raised', this.donateDetails.get('raised')?.value);
    Fd.append('progres', this.donateDetails.get('progres')?.value);
    Fd.append('notes', this.donateDetails.get('notes')?.value);
    Fd.append('fix_amt1', this.donateDetails.get('fix_amt1')?.value);
    Fd.append('fix_amt2', this.donateDetails.get('fix_amt2')?.value);
    Fd.append('fix_amt3', this.donateDetails.get('fix_amt3')?.value);
    Fd.append('fix_amt4', this.donateDetails.get('fix_amt4')?.value);
    Fd.append('fix_amt5', this.donateDetails.get('fix_amt5')?.value);
    Fd.append('sumryPera', this.donateDetails.get('sumryPera')?.value);
    Fd.append('sumryLi1', this.donateDetails.get('sumryLi1')?.value);
    Fd.append('sumryLi2', this.donateDetails.get('sumryLi2')?.value);
    Fd.append('sumryLi3', this.donateDetails.get('sumryLi3')?.value);
    Fd.append('sumryLi4', this.donateDetails.get('sumryLi4')?.value);
    Fd.append('sumryLi5', this.donateDetails.get('sumryLi5')?.value);
    Fd.append('sumryLi6', this.donateDetails.get('sumryLi6')?.value);
    Fd.append('sumryLi7', this.donateDetails.get('sumryLi7')?.value);
    Fd.append('sumryLi8', this.donateDetails.get('sumryLi8')?.value);
    Fd.append('smr_img1',this.img2 as File);
    Fd.append('smr_img2',this.img3 as File);
    Fd.append('smr_pra1', this.donateDetails.get('smr_pra1')?.value);
    Fd.append('smr_blockqt', this.donateDetails.get('smr_blockqt')?.value);
    Fd.append('smr_pra2', this.donateDetails.get('smr_pra2')?.value);
    Fd.append('donationTran', this.doanteKey)

    for(const data of (Fd as any).keys()){
      console.log(data, Fd.get(data));
    }
    this._donate.updateListDetails(Fd).subscribe(res=>{
      if(res.state){
        this.showList = true;
          alert("Record Updated");
          this.clear();
          this.allot();
      }
    })
  }

  allot(){
    this._donate.getList().subscribe(res => {
      this.data = res.res;
      this.showList = true;
      this.isVisible = false;
      this.updateAct = false;
    }, err => {
      console.error(err);
    });
  }
  
  clear(){
    this.Init();
    this.isVisible = false;
    this.img1 =null;
    this.img2 =null;
    this.img3 =null;
  }
  
}
