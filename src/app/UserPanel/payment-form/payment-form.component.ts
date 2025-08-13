import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsePanelService } from '../service/user-panel.service';

declare var Razorpay: any; // Ensure Razorpay is available globally

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [HttpClientModule],
  providers: [UsePanelService],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {


   constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<PaymentFormComponent>, private _userService: UsePanelService){}

  
  payNow(){

    const formRec = new FormData();
    formRec.append('amount', '1000');
    formRec.append('UserId', this.data.UserId);
    formRec.append('Package', 'Recurring');
    formRec.append('CustomNote', 'Thank you for your donation');

    this._userService.createPayId(formRec).subscribe((res:any)=>{
    const razorObj = {
      // Payment details
      key: 'rzp_test_1c1xEaM4rZpfPC',
      amount: res.amount,
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
          console.log('Payment popup closed.');
        },
      },
      // Prefill details
      prefill: {
        name: 'Prashnat Kashyap',
        email: 'prashantkashyap12@gmail.com',
        contact: '+9188658005652',
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
      console.log(response);
    });
 
  });


    // this.dialogRef.close(); // aap yahan se value bhi return kar sakte ho
  }

}
