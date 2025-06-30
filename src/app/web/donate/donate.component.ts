import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../interface/api_config';
import { DonateService } from '../service/donate.service';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule, CommonModule],
  providers: [DonateService],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {
  constructor(private _fb: FormBuilder, private _dontSer: DonateService) { }
    ngOnInit(){
      this.Init();
      this.allot();
    }
    private baseUrl = new url().value;
    DonateForm!:FormGroup;
    keyword="Heading";
    data:any = [  ]
    showList:boolean = true;
    updateAct:boolean = true;
    imagePreview:any = null;
    donationTran:any;
  
    Init(){
      this.DonateForm = this._fb.group({
        imgPath: ['', [Validators.required]],
        categ: ['', [Validators.required]],
        rais: ['', [Validators.required]],
        goal: ['', [Validators.required]],
        heading: ['', [Validators.required]],
        para: ['', [Validators.required]],
        progress: ['', [Validators.required]],
        link: ['', [Validators.required]],
      })
    }
  

  IfromFile:any;
  fileUpdate(file: any) {
    console.log(file);
    if (file.target.files.length == 1) {
      this.IfromFile = file.target.files[0];
    }
  }

  // autoComplete 
  selectEvent(data: any) {
    this.datapatch(data);
  }

  datapatch(data:any) {
    this.donationTran = data.DonationTran;
    this.imagePreview = this.baseUrl + data.ImgPath;
    this.updateAct = false;

    this.DonateForm.patchValue({
      ImgPath: data.ImgPath,
      categ: data.Categ ? data.Categ : '',
      rais: data.Rais ? data.Rais : '',
      goal: data.Goal ? data.Goal : '',
      heading: data.Heading ? data.Heading : '',
      para: data.Para ? data.Para : '',
      progress: data.Progress ? data.Progress : '',
      link: data.link ? data.link : '',
    })
  }
  
  onSubmit()
  {
    let fmdata = new FormData();
    fmdata.append('ImgPath', this.IfromFile as File);
    fmdata.append('Categ', this.DonateForm.get('categ')?.value);
    fmdata.append('Rais', this.DonateForm.get('rais')?.value);
    fmdata.append('Goal', this.DonateForm.get('goal')?.value);
    fmdata.append('Heading', this.DonateForm.get('heading')?.value);
    fmdata.append('Para', this.DonateForm.get('para')?.value);
    fmdata.append('Progress', this.DonateForm.get('progress')?.value);
    fmdata.append('Link', this.DonateForm.get('link')?.value);
    
    for(const key of (fmdata as any).keys()){
      console.log(key, fmdata.get(key));
    }

    if (this.updateAct) {
      this._dontSer.addList(fmdata).subscribe(res => {
        this.showList = true;
        this.fresh();
        this.allot();
        alert("Record Added");
      })
    } else {
      fmdata.append('DonationTran', this.donationTran);
      this._dontSer.updateList(fmdata).subscribe(res => {
        this.showList = true;
        this.fresh();
        this.allot();
        alert("Record Updated");
      })
    }
  }

  delet() {   
    this._dontSer.deleteList(this.donationTran).subscribe(res => {
      this.showList = true;
      this.fresh();
      this.allot()
      this.imagePreview = null;
      console.log("Record Deleted")
    })
  }


  allot() {
    this._dontSer.getList().subscribe(res =>{
      this.data = res.res;
    })
  }

  fresh() {
    this.Init();
    this.updateAct = true
  }
  

}
