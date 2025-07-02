import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateRecordComponent } from './donate-record.component';

describe('DonateRecordComponent', () => {
  let component: DonateRecordComponent;
  let fixture: ComponentFixture<DonateRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonateRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
