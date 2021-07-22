import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChooseTypeComponent } from './dialog-choose-type.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('DialogChooseTypeComponent', () => {
  let component: DialogChooseTypeComponent;
  let fixture: ComponentFixture<DialogChooseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChooseTypeComponent ],
      imports: [ MatDialogModule, RouterTestingModule ]
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
