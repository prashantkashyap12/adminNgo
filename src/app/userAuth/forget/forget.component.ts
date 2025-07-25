import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers:[AuthserviceService],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
  encapsulation:ViewEncapsulation.None
})
export class ForgetComponent implements OnInit {

  loader:boolean = false;

  forgetForm!: FormGroup;
  constructor(private _router:Router, private _fb: FormBuilder, private _auth:AuthserviceService) { }
  ngOnInit() {
    this.initForm()
  }
  
  initForm(){
    this.forgetForm = this._fb.group({
      email: ['', [Validators.email]],
    })
  }

  modelValidation() {
    return {
      email: this.forgetForm.value.email ?? ''
    }
  }

  // submit
  onSubmit(){
    this.loader = true;
    if(this.forgetForm.invalid){
      this.loader = false;
      return this.forgetForm.markAllAsTouched();
    }else{
      let model = this.modelValidation();
      this._auth.forget(model).subscribe(res => {
        if(res.state == true){
          this.loader = false;
          alert("OTP Sent on your Email");
          sessionStorage.clear();
          sessionStorage.setItem('email', this.forgetForm.value.email);
          sessionStorage.setItem('password', this.forgetForm.value.password ?? '000000');
          this._router.navigate(['/verify']);
        }else{
          this.loader = false;
          alert(res.massage)
        }
      })
    }
  }

  signin(){
    this._router.navigate(['/login'])
  }
}
