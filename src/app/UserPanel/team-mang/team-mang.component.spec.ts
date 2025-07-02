import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMangComponent } from './team-mang.component';

describe('TeamMangComponent', () => {
  let component: TeamMangComponent;
  let fixture: ComponentFixture<TeamMangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamMangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamMangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
