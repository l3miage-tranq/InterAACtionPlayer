import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChooseTypeComponent } from './dialog-choose-type.component';

describe('DialogChooseTypeComponent', () => {
  let component: DialogChooseTypeComponent;
  let fixture: ComponentFixture<DialogChooseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChooseTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChooseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
