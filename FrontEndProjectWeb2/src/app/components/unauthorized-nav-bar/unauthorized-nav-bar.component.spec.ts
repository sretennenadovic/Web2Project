import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedNavBarComponent } from './unauthorized-nav-bar.component';

describe('UnauthorizedNavBarComponent', () => {
  let component: UnauthorizedNavBarComponent;
  let fixture: ComponentFixture<UnauthorizedNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorizedNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
