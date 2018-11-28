import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhospitaldialogComponent } from './addhospitaldialog.component';

describe('AddhospitaldialogComponent', () => {
  let component: AddhospitaldialogComponent;
  let fixture: ComponentFixture<AddhospitaldialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhospitaldialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddhospitaldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
