import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsePanelService } from '../service/user-panel.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
declare var Razorpay: any; // Ensure Razorpay is available globally
@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule, CommonModule, AngularMultiSelectModule],
  providers: [UsePanelService],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<PaymentFormComponent>, private _userService: UsePanelService,
  private _fb: FormBuilder){}


  loader: boolean = false;
  ngOnInit() {
    this.initForm();
  }

  // Event Manager
  eventManage!:FormGroup; 

  // Payment processing
  paymentForm!: FormGroup;
  
  
  initForm(){
    this.paymentForm = this._fb.group({
      name: [sessionStorage.getItem('Name'), [Validators.required, Validators.minLength(3)]],
      mobile: [sessionStorage.getItem('contact'), [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      amount: ['', [Validators.required, Validators.min(1)]],
      donateFor: ['', [Validators.required]]
    });
  }
  
  payNow(){
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    this.loader = true;
    const formRec = new FormData();
    formRec.append('amount', '1000');
    formRec.append('UserId', this.data.UserId);
    formRec.append('Package', 'Recurring');
    formRec.append('CustomNote', 'Thank you for your donation');
    this._userService.createPayId(formRec).subscribe((res:any)=>{
    this.loader = false;
    const razorObj = {
      // Payment details
      key: 'rzp_test_1c1xEaM4rZpfPC',
      amount: this.paymentForm.get('amount')?.value * 100, // Amount in paise
      currency: 'INR',
      name: 'Helping Hand Sansthan',
      description: 'Payment for Donation 1',
      image: 'https://placeit-img-1-p.cdn.aws.placeit.net/uploads/stage/stage_image/193108/optimized_large_thumb_stage.jpg',
      order_id: res.id,
      // Callback
      handler: (response:any) => {
        console.log(response);
        this.dialogRef.close();
      },
      // Popup close  
      model: {
        ondismiss: () => {
          this.loader = false;
          console.log('Payment popup closed.');
        },
      },

      // Prefill details
      prefill: {
        userId: sessionStorage.getItem('userId'),
        name: this.paymentForm.get('name')?.value,
        email: sessionStorage.getItem('email'),
        contact: this.paymentForm.get('mobile')?.value,
      },

      // Additional information
      notes: {
        address: 'Letitude Longitude + Mac Address + IP Address'
      },
      // Theme customization
      theme: {
        color: '#F37254'
      }
    };

    // Initialize Razorpay
    const rzp = new Razorpay(razorObj);
    
    // Open the payment popup
    rzp.open();

    // Handle payment failure
    rzp.on('payment.failed', (response:any) => {
      this.loader = false;
      console.log(response);
    });
  });


    // this.dialogRef.close(); // aap yahan se value bhi return kar sakte ho
  }

}
