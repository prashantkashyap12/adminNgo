import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../../interface/api_config';
import moment, { Moment } from 'moment';
import { UserprofileService } from '../service/profileComp.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile-complete',
  standalone: true,
  imports: [CommonModule, AutocompleteLibModule, ReactiveFormsModule, HttpClientModule],
  providers:[UserprofileService],
  templateUrl: './profile-complete.component.html',
  styleUrl: './profile-complete.component.css'
})
export class ProfileCompleteComponent {

  baseUrl = new url().value;
  loader:any=false;
  constructor(private _fb:FormBuilder, private _userProf:UserprofileService){}
  ngOnInit(){
    this.Init();
    this.allot();
  }

  ProfUpdat!:FormGroup
  updateAct:boolean = false
  imagePreview:any;
  showList:any;
  formRec:any;
  CombinAdd:any;

  data:any=[]
  userId:any = sessionStorage.getItem('userId');
  ProfImg:any;

  Init(){
    var ddMM = moment(sessionStorage.getItem("expiryDate")).format("MM/YY/")
    var regId = "HHS"+ddMM+sessionStorage.getItem('userId');
    this.ProfUpdat = this._fb.group({

      imgPath:[''],

      doj:[moment(sessionStorage.getItem("expiryDate")).format("DD-MM-YYYY")],
      registerId: [regId],
      designation:[''],
      name:[sessionStorage.getItem("Name")],
      contact:[sessionStorage.getItem('contact')],
      email:[sessionStorage.getItem('email')],
      whatCont: [''],
      fName:[''], 
      dob:[''],
      gender:[''],
      maritalStatus:[''],
      hEdu:[''],
      workProf:[''],
      Address:[''],  
      landmark:[''],  
      pin:[''],  
      Member_Type:[''],
      join_cat:[''],
      MemOther:[''],  //
      desination:[''], //
      whatsApp:['']
    })

  
  }

  selectEvent(evt:any){}
  fileUpdate(evt:any){
    this.ProfImg = evt.target.files[0];
  }


  onSubmit(){
    this.loader = true;
    let Address = this.ProfUpdat.get('Address')?.value;
    let landmark = this.ProfUpdat.get('landmark')?.value;
    let pin = this.ProfUpdat.get('pin')?.value;
    this.CombinAdd = `${Address}#${landmark}#${pin}`;
    const dataForm = new FormData();
    dataForm.append('ProfileImg', this.ProfImg?this.ProfImg:"")
    dataForm.append('userId', this.userId ?? "");
    dataForm.append('designation',this.ProfUpdat.get('designation')?.value ?? "");
    dataForm.append('Father_Name', this.ProfUpdat.get('fName')?.value ?? "");
    dataForm.append('DOB', this.ProfUpdat.get('dob')?.value ?? "");
    dataForm.append('Gender', this.ProfUpdat.get('gender')?.value ?? "");
    dataForm.append('MaritalStatus', this.ProfUpdat.get('maritalStatus')?.value ?? "");
    dataForm.append('Education', this.ProfUpdat.get('hEdu')?.value ?? "");
    dataForm.append('Profession', this.ProfUpdat.get('workProf')?.value ?? "");
    dataForm.append('whatApp', this.ProfUpdat.get('whatsApp')?.value ?? "");
    dataForm.append('AddressFull', this.CombinAdd ?? "");
    dataForm.append('Member_Type', this.ProfUpdat.get('Member_Type')?.value ?? "");
    dataForm.append('join_cat', this.ProfUpdat.get('join_cat')?.value ?? "");
    dataForm.append('Already_Join', this.ProfUpdat.get('MemOther')?.value ?? "");
    for(const file of (dataForm as any).keys()){
      console.log(file, dataForm.get(file));
    }
    this._userProf.updateUser(dataForm).subscribe(res=>{
      if(res.state == true){
        this.loader = false;
        this.ngOnInit()
        alert(res.massege)
      }else{
        this.loader = false;
      }
    },(err)=>
      {
        this.loader = false;
        console.log(err);
      })
  }

  patch(data:any){
    this.data = data;
     let ary = this.data.AddressFull.split("#");
    let add = ary[0];
    let landMrk = ary[1];
    let pinCod = ary[2];

    // img Url
    this.imagePreview = this.baseUrl+data.ProfileImg;
    this.ProfUpdat.patchValue({
      designation: this.data.designation,
      fName:this.data.Father_Name,
      dob:this.data.DOB,
      gender:this.data.Gender,
      maritalStatus:this.data.MaritalStatus,
      hEdu:this.data.Education,
      workProf:this.data.Profession,
      Address:add,
      landmark:landMrk,
      pin:pinCod,
      Member_Type:this.data.Member_Type,
      join_cat:this.data.join_cat,
      MemOther:this.data.Already_Join,
      whatsApp:this.data.whatApp
    })
  }
  allot(){
    this._userProf.GetUser(this.userId).subscribe(res=>{
      this.data = res.results[0];
      this.patch(this.data);
    })
  }
  fresh(){}

}
