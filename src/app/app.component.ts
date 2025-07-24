import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ProfileCompleteComponent } from './UserPanel/profile-complete/profile-complete.component';
import { UserprofileService } from './UserPanel/service/profileComp.service';
import { HttpClientModule } from '@angular/common/http';
import { url } from './interface/api_config';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, HttpClientModule, ReactiveFormsModule],
  providers:[UserprofileService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'adminPanel';
  isVisible:boolean = true;
  isBrowser:boolean = true;
  isDoc:any= true
  isUser:boolean = false;
  isAdmin:boolean = false;
  
  constructor(private _router:Router, private _profileView:UserprofileService){}
  duration:any;

  ngAfterViewInit(){
    // Router Auth / Panel
    this.allot();
    var valueToken;
    if (this.isBrowser) {
      valueToken = sessionStorage.getItem("token");
    }
    this.isVisible = valueToken == null ? false : true;
    this.navigate();

    // JWT Role.
    if(valueToken){
      const decodedToken:any = jwtDecode(valueToken);
      const issuedAt = 1751453677;
      const expiresAt = 1751454277;
      this.duration = expiresAt - issuedAt; 
      if(this.duration < 10){
        setTimeout(()=>{
          let resp = window.confirm("Do you want to continue working");
          if(resp==true){
            this.duration = 1000
          }else{
            this.logout();
          }
        },this.duration);
      }

      // Menu parsal
      if(decodedToken['role'] === 'user') {
        this.isUser =true;
        this.isAdmin = false;
      }else if(decodedToken['role'] === 'admin'){
        this.isUser = false;
        this.isAdmin = true;
      }
    }
  }

  navigate(){
    if(this.isVisible){
      this._router.navigate(['/dashboard']);
    }else{
      this._router.navigate(['/login']);
    }
  }
  logout(){
    sessionStorage.clear();
    window.location.reload();
  }
  baseurl = new url().value;
  user:any = {
    name:'',
    email:'',
    profileImg:''
  }
  allot(){
    this._profileView.GetUser(sessionStorage.getItem('userId')).subscribe(res=>{
      let resp = res.results[0];
      this.isDoc = resp.isEdit; 
      this.user = {
        name:resp.Name,
        email:resp.Email,
        profileImg: resp.ProfileImg!= null?`${this.baseurl}${resp.ProfileImg}`:'../assets/images/user/profile.jpg'
      }
    })
  }

  changeLang(sel:any){
    var selc = confirm(`Do you want to change language ${sel} ?`);
    if(selc){
      alert(sel);
      window.location.reload();
    }else{
      alert("Alright");
    }
  }


}


// tejemef733@calorpg.com
// ng build --configuration production --base-href=/