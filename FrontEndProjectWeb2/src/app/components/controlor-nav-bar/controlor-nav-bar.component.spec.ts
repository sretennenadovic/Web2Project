import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlorNavBarComponent } from './controlor-nav-bar.component';

describe('ControlorNavBarComponent', () => {
  let component: ControlorNavBarComponent;
  let fixture: ComponentFixture<ControlorNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlorNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlorNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
