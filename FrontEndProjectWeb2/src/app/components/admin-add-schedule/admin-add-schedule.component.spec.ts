import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddScheduleComponent } from './admin-add-schedule.component';

describe('AdminAddScheduleComponent', () => {
  let component: AdminAddScheduleComponent;
  let fixture: ComponentFixture<AdminAddScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
