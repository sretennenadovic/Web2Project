import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCatalogComponent } from './admin-add-catalog.component';

describe('AdminAddCatalogComponent', () => {
  let component: AdminAddCatalogComponent;
  let fixture: ComponentFixture<AdminAddCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
