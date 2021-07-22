import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportfileComponent } from './exportfile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import {TranslateModule} from '@ngx-translate/core';

describe('ExportfileComponent', () => {
  let component: ExportfileComponent;
  let fixture: ComponentFixture<ExportfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportfileComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
