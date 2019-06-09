import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLineComponent } from './change-line.component';

describe('ChangeLineComponent', () => {
  let component: ChangeLineComponent;
  let fixture: ComponentFixture<ChangeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
