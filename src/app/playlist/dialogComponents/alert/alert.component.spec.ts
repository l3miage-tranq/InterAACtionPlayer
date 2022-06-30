import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      imports: [ MatDialogModule, TranslateModule.forRoot() ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit:: should close the alert dialog', () => {
    component.change = true;
    // @ts-ignore
    spyOn(component.saveService, 'updateSettings');
    // @ts-ignore
    component.dialogRef = { close: jasmine.createSpy() };
    component.submit();
    // @ts-ignore
    expect(component.alertService.alertCancel).toBeFalsy();
    // @ts-ignore
    expect(component.saveService.updateSettings).toHaveBeenCalled();
  });

  it('submit:: should close the alert dialog and should not update settings if no change has been made', () => {
    component.change = false;
    // @ts-ignore
    spyOn(component.saveService, 'updateSettings');
    // @ts-ignore
    component.dialogRef = { close: jasmine.createSpy() };
    component.submit();
    // @ts-ignore
    expect(component.alertService.alertCancel).toBeFalsy();
    // @ts-ignore
    expect(component.saveService.updateSettings).not.toHaveBeenCalled();
  });

  it('goCancel:: should close the alert dialog', () => {
    component.change = true;
    // @ts-ignore
    spyOn(component.saveService, 'updateSettings');
    // @ts-ignore
    component.dialogRef = { close: jasmine.createSpy() };
    component.goCancel();
    // @ts-ignore
    expect(component.alertService.alertCancel).toBeTruthy();
    // @ts-ignore
    expect(component.saveService.updateSettings).toHaveBeenCalled();
  });

  it('goCancel:: should close the alert dialog and should not update settings if no change has been made', () => {
    component.change = false;
    // @ts-ignore
    spyOn(component.saveService, 'updateSettings');
    // @ts-ignore
    component.dialogRef = { close: jasmine.createSpy() };
    component.goCancel();
    // @ts-ignore
    expect(component.alertService.alertCancel).toBeTruthy();
    // @ts-ignore
    expect(component.saveService.updateSettings).not.toHaveBeenCalled();
  });

  it('doNotShowAgain:: should set variable on service', () => {
    component.doNotShowAgain();
    expect(component.change).toBeTruthy();
  });
});
