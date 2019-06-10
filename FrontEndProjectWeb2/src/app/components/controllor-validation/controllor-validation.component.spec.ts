import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllorValidationComponent } from './controllor-validation.component';

describe('ControllorValidationComponent', () => {
  let component: ControllorValidationComponent;
  let fixture: ComponentFixture<ControllorValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllorValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllorValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
