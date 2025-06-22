import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import { AuthserviceService } from '../authservice.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [AuthserviceService]
})
export class SignupComponent implements OnInit{

  userSignup!: FormGroup;
  constructor(private _fb:FormBuilder, 
    private _router:Router, 
    private _auth:AuthserviceService 
   ){}
  ngOnInit() {
    this.initForm();
  }

  select1:any = "selected";

  PwdValidator(form: FormGroup) {
    const pwd = form.get('password')?.value;
    const rePwd = form.get('rePassword')?.value;
    return pwd === rePwd ? null : { mismatch: true };
  }
  
  // Define Form Controller
  initForm(){
    this.userSignup = this._fb.group({
      date: [moment(new Date()).format("DD-MM-YYYY")],
      name:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      rePassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      role:['user', [Validators.required]]
    }, {validators: this.PwdValidator });
  }

  // Data before save validation Model 
  datamodel(){
    return {
      tdate: new Date(),
      name: this.userSignup.value.name ?? '',
      email: this.userSignup.value.email ?? '',
      contact: this.userSignup.value.contact ?? '',
      password: this.userSignup.value.password ?? '',
      role: this.userSignup.value.role ?? '',
    };
  }


  onSubmit(){
    if (this.userSignup.invalid) {
      // this.userSignup.markAllAsTouched();
      alert("Form Invalid")
      return;
    }
    const model= this.datamodel();  // validation
    this._auth.signup(model).subscribe(
      res=>{ 
       if(res.state == true){
        console.log(res)
        sessionStorage.setItem('email', this.userSignup.value.email);
        sessionStorage.setItem('password', this.userSignup.value.password);
        sessionStorage.setItem('user', this.userSignup.value.name);
        sessionStorage.setItem('role', this.userSignup.value.role);
        this._router.navigate(['/verify']);
       }else{
        console.log(res)
       }
      });
  }

  // signIn Btn
  signin(){
    this._router.navigate(['/login']);
  }
  test(){
    this._router.navigate(['/verify'])
  }
}
