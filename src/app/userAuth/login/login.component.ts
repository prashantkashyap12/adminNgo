import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [AuthserviceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit{

  constructor(private _router:Router, private _auth:AuthserviceService, private _fb:FormBuilder){}
  ngOnInit(): void {
    this.Init();
  }
  signupForm!:FormGroup;
  loader:boolean =false;

  Init(){
    this.signupForm = this._fb.group({
      email:['', Validators.email],
      password:['', Validators.required],
    });
  }

  Ismodel(){
    return {
      email: this.signupForm.value.email ?? '',
      password: this.signupForm.value.password ?? '',
    }
  }
  routForgt(){
    this._router.navigate(['/forget'])
  }
  signup(){
    this._router.navigate(['/signup'])
  }
  onSubmit(){
    this.loader = true;
    if(!this.signupForm.valid){
      alert("form is not Valid");
      this.loader = false;
      return
    }
    let model = this.Ismodel();
    this._auth.signIn(model).subscribe(res=>{
      if(res.state == true){
        sessionStorage.setItem('userId', res.data.userId);
        sessionStorage.setItem('Name', res.data.name);
        sessionStorage.setItem('email', this.signupForm.value.email);
        sessionStorage.setItem('password', this.signupForm.value.password);
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('contact', res.data.contact);
        sessionStorage.setItem('expiryDate', res.data.expiryDate);
        location.reload();
        this.loader = false;
      }else{
        this.loader = false;
        alert(res.message);
      }
    })
  }
}
