import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeCatalogComponent } from './admin-change-catalog.component';

describe('AdminChangeCatalogComponent', () => {
  let component: AdminChangeCatalogComponent;
  let fixture: ComponentFixture<AdminChangeCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangeCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
