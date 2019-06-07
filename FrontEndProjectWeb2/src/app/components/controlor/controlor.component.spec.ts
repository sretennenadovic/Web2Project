import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlorComponent } from './controlor.component';

describe('ControlorComponent', () => {
  let component: ControlorComponent;
  let fixture: ComponentFixture<ControlorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
