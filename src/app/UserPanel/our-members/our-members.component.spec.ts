import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurMembersComponent } from './our-members.component';

describe('OurMembersComponent', () => {
  let component: OurMembersComponent;
  let fixture: ComponentFixture<OurMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
