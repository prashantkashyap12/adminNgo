import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpNSuppComponent } from './help-nsupp.component';

describe('HelpNSuppComponent', () => {
  let component: HelpNSuppComponent;
  let fixture: ComponentFixture<HelpNSuppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpNSuppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpNSuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
