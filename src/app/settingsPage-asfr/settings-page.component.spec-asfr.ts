import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageComponentAsfr } from './settings-page.component-asfr';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {NotifierModule} from 'angular-notifier';
import {TranslateModule} from '@ngx-translate/core';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponentAsfr;
  let fixture: ComponentFixture<SettingsPageComponentAsfr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPageComponentAsfr ],
      imports: [RouterTestingModule, MatDialogModule, NotifierModule, TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponentAsfr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
