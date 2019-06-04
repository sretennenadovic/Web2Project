import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedBuyTicketComponent } from './unauthorized-buy-ticket.component';

describe('UnauthorizedBuyTicketComponent', () => {
  let component: UnauthorizedBuyTicketComponent;
  let fixture: ComponentFixture<UnauthorizedBuyTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorizedBuyTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedBuyTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
