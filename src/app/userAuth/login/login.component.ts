import { Component, OnInit } from '@angular/core';
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
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private _router:Router, private _auth:AuthserviceService, private _fb:FormBuilder){}
  ngOnInit(): void {
    this.Init();
  }
  signupForm!:FormGroup;

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
    if(!this.signupForm.valid){
      alert("form is not Valid");
      return
    }
    let model = this.Ismodel();
    this._auth.signIn(model).subscribe(res=>{
      if(res.state == true){
        location.reload();        
        sessionStorage.setItem('email', this.signupForm.value.email);
        sessionStorage.setItem('password', this.signupForm.value.password);
        sessionStorage.setItem('token', res.token);
      }else{
        alert(res.message);
      }
    })
  }
}
