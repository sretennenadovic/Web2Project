import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerNavBarComponent } from './passenger-nav-bar.component';

describe('PassengerNavBarComponent', () => {
  let component: PassengerNavBarComponent;
  let fixture: ComponentFixture<PassengerNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
