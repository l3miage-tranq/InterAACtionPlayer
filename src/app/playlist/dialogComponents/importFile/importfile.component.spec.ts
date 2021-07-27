import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportfileComponent } from './importfile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import {TranslateModule} from '@ngx-translate/core';

describe('ImportfileComponent', () => {
  let component: ImportfileComponent;
  let fixture: ComponentFixture<ImportfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportfileComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
