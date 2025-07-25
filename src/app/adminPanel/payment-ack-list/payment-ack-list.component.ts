import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@Component({
  selector: 'app-payment-ack-list',
  standalone: true,
  imports: [AutocompleteLibModule, ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './payment-ack-list.component.html',
  styleUrl: './payment-ack-list.component.css'
})
export class PaymentAckListComponent {
  blogForm!:FormGroup;
  loader:any = false;
  showList:boolean = true;
  data:any = []
  keyword="";
  selectEvent(data:any){}

  allot(){}
  del(data:any){}
  
}
