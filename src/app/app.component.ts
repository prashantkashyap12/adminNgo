import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'adminPanel';

  isVisible:any = true;
  isBrowser:any;
  
  ngAfterViewInit(){
    var valueToken;
    if (this.isBrowser) {
      valueToken = sessionStorage.getItem('token');
    }
    this.isVisible = valueToken == null ? true : true;
  }

}
