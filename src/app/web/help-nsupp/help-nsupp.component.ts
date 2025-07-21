import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-help-nsupp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help-nsupp.component.html',
  styleUrl: './help-nsupp.component.css'
})
export class HelpNSuppComponent {
  loader:any = false;

}
