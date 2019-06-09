import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLineComponent } from './delete-line.component';

describe('DeleteLineComponent', () => {
  let component: DeleteLineComponent;
  let fixture: ComponentFixture<DeleteLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
