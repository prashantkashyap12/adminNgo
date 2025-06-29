import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAckListComponent } from './payment-ack-list.component';

describe('PaymentAckListComponent', () => {
  let component: PaymentAckListComponent;
  let fixture: ComponentFixture<PaymentAckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAckListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentAckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
