import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalmemberComponent } from './hospitalmember.component';

describe('HospitalmemberComponent', () => {
  let component: HospitalmemberComponent;
  let fixture: ComponentFixture<HospitalmemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalmemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
