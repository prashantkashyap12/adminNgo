import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthserviceService } from '../authservice.service';
import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-varify',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [AuthserviceService],
  templateUrl: './varify.component.html',
  styleUrl: './varify.component.css'
})
export class VarifyComponent implements OnInit {

  userVerify!: FormGroup;
  constructor(private _fb:FormBuilder, 
    @Inject(PLATFORM_ID) private platformId: Object, 
    private _auth:AuthserviceService,
    private _router:Router
  ){}

  email:any;
  password:any;

  tempPwd:any;
  ngOnInit(){
    this.TimeCoutner();
    this.password == "000000" ? this.tempPwd = true : this.tempPwd = false;
    if (isPlatformBrowser(this.platformId)) {
      this.email = sessionStorage.getItem('email');
      this.password = sessionStorage.getItem('password');
      this.password = this.password == "000000" ? "" : this.password; 
      if(this.password == "000000"){
        this.tempPwd = true;
      }
    }
    this.initForm();  
  }

  initForm(){
    this.userVerify = this._fb.group({
      email: [this.email, Validators.required,],
      password: [this.password, Validators.required],
      otp: ['', Validators.required]
    })

  }

  // Timer 10 Min
  minStr:any;
  secStr:any;
  TimeCoutner(){
    let minutes = 10;
    let seconds = 0;
    const interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      this.minStr = minutes.toString().padStart(2, '0');
      this.secStr = seconds.toString().padStart(2, '0');
    }, 1000);
  }
  
  datamodel(){
    return {
      email :this.userVerify.value.email ?? '',
      password : this.userVerify.value.password ?? '',
      otp:this.userVerify.value.otp ?? ''
    };
  }

  onSubmit(){
    if(this.userVerify.invalid){
      alert("form Invalid");
      return;
    }
    const model = this.datamodel();
    this._auth.varify(model).subscribe(res=>{
      if(res.state==true){
        alert("Password set successfully")
        this._router.navigate(['/login']);
      }else{
        alert(res.Message)
      }
    })


  }
}
