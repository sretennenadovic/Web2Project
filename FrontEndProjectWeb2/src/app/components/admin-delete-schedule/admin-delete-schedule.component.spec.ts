import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteScheduleComponent } from './admin-delete-schedule.component';

describe('AdminDeleteScheduleComponent', () => {
  let component: AdminDeleteScheduleComponent;
  let fixture: ComponentFixture<AdminDeleteScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDeleteScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
