import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeScheduleComponent } from './admin-change-schedule.component';

describe('AdminChangeScheduleComponent', () => {
  let component: AdminChangeScheduleComponent;
  let fixture: ComponentFixture<AdminChangeScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangeScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
