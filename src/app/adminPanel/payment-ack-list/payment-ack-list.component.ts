import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DashboardComponent } from '../../web/dashboard/dashboard.component';
import { PaymentFormComponent } from '../../UserPanel/payment-form/payment-form.component';

@Component({
  selector: 'app-payment-ack-list',
  standalone: true,
  imports: [AutocompleteLibModule, ReactiveFormsModule, FormsModule, CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './payment-ack-list.component.html',
  styleUrl: './payment-ack-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentAckListComponent {

  readonly dialog = inject(MatDialog);

  user:any = {
    name:"prahsant kashyap",
    branch:"IT"
  }
  openDialog() {
   
    const diallogRef = this.dialog.open(PaymentFormComponent,{
      height:'400px',
      width:'60%',
      position: {
        top: '1%'
      },
      data: {
        "userName": sessionStorage.getItem("Name"),
        "userId": sessionStorage.getItem("userId"),
      },
      panelClass:'divPk',
      autoFocus: true,
      disableClose: false
    })

    diallogRef.afterClosed().subscribe(async (result) => {
      this.user
    })

  }

  blogForm!:FormGroup;
  loader:any = false;
  showList:boolean = true;
  data:any = []
  keyword="";
  selectEvent(data:any){}

  allot(){}
  del(data:any){}
  
}
