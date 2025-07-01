import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'adminPanel';
  isVisible:boolean = true;
  isBrowser:boolean = true;

  constructor(private _router:Router){}

  ngAfterViewInit(){
    var valueToken;
    if (this.isBrowser) {
      valueToken = sessionStorage.getItem("token");
      console.log(valueToken)
    }
    this.isVisible = valueToken == null ? false : true;
    this.navigate();
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