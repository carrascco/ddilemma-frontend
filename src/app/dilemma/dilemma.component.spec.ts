import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilemmaComponent } from './dilemma.component';

describe('DilemmaComponent', () => {
  let component: DilemmaComponent;
  let fixture: ComponentFixture<DilemmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DilemmaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DilemmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
