import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import {TranslateModule} from '@ngx-translate/core';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('goCancel:: should close all dialogs', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('ngOnInit:: should set dark mode', () => {
    component.themeLightEnable = false;
    component.diskProgress = false;
    fixture.detectChanges();
    expect(component.themeDarkValue).toEqual('positive');
    expect(component.circleValue).toEqual('positive');
  });

  it('toggleThemeLight:: should switch theme to light', () => {
    component.toggleThemeLight();
    expect(component.themeDarkValue).toEqual('');
    expect(component.themeLightValue).toEqual('positive');
  });

  it('toggleThemeDark:: should switch theme to dark', () => {
    component.toggleThemeDark();
    expect(component.themeDarkValue).toEqual('positive');
    expect(component.themeLightValue).toEqual('');
  });

  it('dwellTime:: should toggle dwellTime', () => {
    component.dwellTimeEnable = false;
    component.dwellTime();
    expect(component.dwellTimeEnable).toBeTruthy();
  });

  it('dwellTimeShape:: should set dwellTime', () => {
    component.dwellTimeShape(false);
    expect(component.dwellTimeSpinnerOutsideBtn).toEqual(false);
  });

  it('diskProgressMode:: should set diskProgress', () => {
    component.diskProgressMode(false);
    expect(component.diskProgress).toEqual(false);
    expect(component.circleValue).toEqual('');
  });

  it('circleProgressMode:: should set diskProgress', () => {
    component.circleProgressMode(false);
    expect(component.diskProgress).toEqual(false);
    expect(component.circleValue).toEqual('positive');
  });

  it('getValue:: should calculate and return value', () => {
    component.getValue({target: { value: 1 }});
    expect(component.dwellTimeValue).toEqual(1000);
  });
  
  it('displayAlertMessage:: should toggle alert message', () => {
    component.disableAlertMessage = false;
    component.displayAlertMessage();
    expect(component.disableAlertMessage).toBeTruthy();
  });

  it('isValid:: should return value based on validations', () => {
    component.dwellTimeValue = 0;
    expect(component.isValid()).toBeFalsy();
    component.dwellTimeValue = 1000;
    expect(component.isValid()).toBeTruthy();
  });

  it('submit:: should not submit settings if validation fails', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.dwellTimeValue = 0;
    component.submit();
    // @ts-ignore
    expect(component.dialog.closeAll).not.toHaveBeenCalled();
  });

  it('submit:: should submit settings', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.dwellTimeValue = 1000;
    component.submit();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });
});
