import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'adminPanel';
  isVisible:boolean = true;
  isBrowser:boolean = true;

  isUser:boolean = false;
  isAdmin:boolean = false;
  
  constructor(private _router:Router){}

  duration:any;

  ngAfterViewInit(){
    // Router Auth / Panel
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
      setTimeout(()=>{
        let resp = window.confirm("Do you want to continue working");
        if(resp==true){
          this.duration = 1000
        }else{
          this.logout();
        }
      },this.duration);

      // Menu parsal
      if(decodedToken['role'] !== 'admin') {
        this.isUser = true;
        this.isAdmin = false;
      } else {
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
}


// tejemef733@calorpg.com