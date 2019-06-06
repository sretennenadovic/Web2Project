import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatalogViewComponent } from './admin-catalog-view.component';

describe('AdminCatalogViewComponent', () => {
  let component: AdminCatalogViewComponent;
  let fixture: ComponentFixture<AdminCatalogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCatalogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCatalogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
