import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@Component({
  selector: 'app-event-manager',
  standalone: true,
  imports: [FormsModule, AutocompleteLibModule, CommonModule, ReactiveFormsModule],
  templateUrl: './event-manager.component.html',
  styleUrl: './event-manager.component.css'
})
export class EventManagerComponent {

  loader:boolean = false;
  blogForm!:FormGroup;
  showList:boolean = true;
  data:any = []
  keyword="";
  selectEvent(data:any){}

  allot(){}
  del(a:any){}
}
