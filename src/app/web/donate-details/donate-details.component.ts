import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../interface/api_config';
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
  keyword="SumryPera";
  doanteKey:any;
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
    this.datapatch(evt);
  }
  datapatch(evt:any){

    this.doanteKey = evt.DonationTran;
    this.imagePreview1 =  evt.Img;
    this.imagePreview2 = evt.SmrImg1;
    this.imagePreview3 = evt.SmrImg2;

    this.donateDetails.patchValue({
      colAmt: evt.colAmt,
      raised: evt.raised,
      progres: evt.progres,
      notes: evt.notes,
      fix_amt1: evt.fix_amt1,
      fix_amt2: evt.fix_amt2,
      fix_amt3: evt.fix_amt3,
      fix_amt4: evt.fix_amt4,
      fix_amt5: evt.fix_amt5,
      sumryPera: evt.sumryPera,
      sumryLi1: evt.sumryLi1,
      sumryLi2: evt.sumryLi2,
      sumryLi3: evt.sumryLi3,
      sumryLi4: evt.sumryLi4,
      sumryLi5: evt.sumryLi5,
      sumryLi6: evt.sumryLi6,
      sumryLi7: evt.sumryLi7,
      sumryLi8: evt.sumryLi8,
      smr_img1: evt.smr_img1,
      smr_img2: evt.smr_img2,
      smr_pra1: evt.smr_pra1,
      smr_blockqt: evt.smr_blockqt,
      smr_pra2: evt.smr_pra2
    });
  }
  
  onSubmit(){
    let Fd = new FormData();
    Fd.append('Img', this.img1)
    Fd.append('ColAmt', this.donateDetails.get('colAmt')?.value);
    Fd.append('Raised', this.donateDetails.get('raised')?.value);
    Fd.append('Progres', this.donateDetails.get('progres')?.value);
    Fd.append('Notes', this.donateDetails.get('notes')?.value);
    Fd.append('FixAmt1', this.donateDetails.get('fix_amt1')?.value);
    Fd.append('FixAmt2', this.donateDetails.get('fix_amt2')?.value);
    Fd.append('FixAmt3', this.donateDetails.get('fix_amt3')?.value);
    Fd.append('FixAmt4', this.donateDetails.get('fix_amt4')?.value);
    Fd.append('FixAmt5', this.donateDetails.get('fix_amt5')?.value);
    Fd.append('SumryPera', this.donateDetails.get('sumryPera')?.value);
    Fd.append('SumryLi1', this.donateDetails.get('sumryLi1')?.value);
    Fd.append('SumryLi2', this.donateDetails.get('sumryLi2')?.value);
    Fd.append('SumryLi3', this.donateDetails.get('sumryLi3')?.value);
    Fd.append('SumryLi4', this.donateDetails.get('sumryLi4')?.value);
    Fd.append('SumryLi5', this.donateDetails.get('sumryLi5')?.value);
    Fd.append('SumryLi6', this.donateDetails.get('sumryLi6')?.value);
    Fd.append('SumryLi7', this.donateDetails.get('sumryLi7')?.value);
    Fd.append('SumryLi8', this.donateDetails.get('sumryLi8')?.value);
    Fd.append('SmrImg1',this.img2);
    Fd.append('SmrImg2',this.img3);
    Fd.append('SmrPra1', this.donateDetails.get('smr_pra1')?.value);
    Fd.append('SmrBlockqt', this.donateDetails.get('smr_blockqt')?.value);
    Fd.append('SmrPra2', this.donateDetails.get('smr_pra2')?.value);
    Fd.append('DonationTran', this.doanteKey)

    for(let data of (Fd as any).Keys()){
      console.log(data, Fd.get(data));
    }
    this._donate.updateListDetails(Fd).subscribe(res=>{
      this.showList = true;
        this.clear();
        this.allot();
        alert("Record Updated");
    })
  }

  allot(){
    this._donate.getDonationDetails().subscribe(res => {
      this.data = res.list;
      this.showList = true;
      this.isVisible = true;
      this.updateAct = false;
    }, err => {
      console.error(err);
    });
  }
  
  clear(){
    this.Init();
  }
  
}
