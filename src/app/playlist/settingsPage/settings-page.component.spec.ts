import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SettingsPageComponent } from './settings-page.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NotifierModule} from "angular-notifier";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {GlobalService} from "../../../../projects/spotify/src/app/services/global.service";

describe('SettingsComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPageComponent ],
      imports: [ MatDialogModule, NotifierModule, RouterTestingModule.withRoutes(
        [{ path: 'user', component: SettingsPageComponent }]
      ), TranslateModule.forRoot(), HttpClientModule ],
      providers: [ GlobalService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    const elem = document.createElement('div');
    // @ts-ignore
    elem.setAttribute('id', component.language.activeLanguage);
    document.body.appendChild(elem);
  });

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    tick(1000);
    expect(component).toBeTruthy();
  }));

  it('toggleThemeLight:: should toggle theme to light', () => {
    component.toggleThemeLight();
    expect(component.colorText).toEqual('colorDark');
    expect(component.themeValue).toEqual('');
  });

  it('toggleThemeDark:: should toggle theme to light', () => {
    component.toggleThemeDark();
    expect(component.colorText).toEqual('colorLight');
    expect(component.themeValue).toEqual('inverted');
  });

  it('dwellTime:: should toggle dwellTime', () => {
    component.dwellTimeEnable = false;
    component.dwellTime(true);
    expect(component.dwellTimeEnable).toBeTruthy();
  });

  it('dwellTimeShape:: should toggle dwellTimeSpinnerOutsideBtn', () => {
    component.dwellTimeSpinnerOutsideBtn = false;
    component.dwellTimeShape(true);
    expect(component.dwellTimeSpinnerOutsideBtn).toBeTruthy();
  });

  it('diskProgressMode:: should toggle diskProgress', () => {
    component.diskProgress = false;
    component.diskProgressMode(true);
    expect(component.diskProgress).toBeTruthy();
  });

  it('switchLanguage:: should switch language', fakeAsync(() => {
    spyOn(document, 'getElementById').and.returnValue({ classList: { add: () => {}, remove: () => {} } } as any);
    spyOn(document.getElementById(component.usedLanguage).classList, 'add');
    spyOn(document.getElementById(component.usedLanguage).classList, 'remove');
    component.switchLanguage(component.usedLanguage);
    expect(component.usedLanguage).toBeDefined();
  }));

  it('getValue:: should update value to settings', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updateSettings');
    component.getValue({target: { value: 1 }});
    // @ts-ignore
    expect(component.saveService.updateSettings).toHaveBeenCalled();
  });

  it('getValue:: should not update value to settings if validation fail', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updateSettings');
    component.getValue({target: { value: 0 }});
    // @ts-ignore
    expect(component.saveService.updateSettings).not.toHaveBeenCalled();
  });

  it('displayAlertMessage:: should toggle alert message', () => {
    component.disableAlertMessage = false;
    component.displayAlertMessage(true);
    expect(component.disableAlertMessage).toBeTruthy();
  });

  it('isDwellTimeEnable:: should enable btnDwellTimeYes', fakeAsync(() => {
    // @ts-ignore
    component.dwellTimeService.dwellTime = true;
    component.isDwellTimeEnable();
    tick(300);
    expect(component.btnDwellTimeYes).toEqual('checked');
  }));

  it('isThemeLightEnable:: should enable btnThemeDark', fakeAsync(() => {
    // @ts-ignore
    spyOn(component.themeService, 'getTypeTheme').and.returnValue(false);
    component.isThemeLightEnable();
    tick(300);
    expect(component.btnThemeDark).toEqual('checked');
  }));

  it('isAlertMessageEnable:: should enable btnAlertMessageYes', fakeAsync(() => {
    // @ts-ignore
    component.alertService.doNotShowAgain = true;
    component.isAlertMessageEnable();
    tick(300);
    expect(component.btnAlertMessageYes).toEqual('checked');
  }));

  it('isDiskProgressEnable:: should enable btnCircleProgress', fakeAsync(() => {
    // @ts-ignore
    component.dwellTimeService.diskProgress = false;
    component.isDiskProgressEnable();
    tick(300);
    expect(component.btnCircleProgress).toEqual('checked');
  }));

  it('isSpinnerOutsideEnable:: should enable btnSpinnerInside', fakeAsync(() => {
    // @ts-ignore
    component.dwellTimeService.dwellTimeSpinnerOutsideBtn = false;
    component.isSpinnerOutsideEnable();
    tick(300);
    expect(component.btnSpinnerInside).toEqual('checked');
  }));

  it('goBack:: should trigger browser back', () => {
    spyOn(history, 'back');
    component.goBack();
    expect(history.back).toHaveBeenCalled();
  });
});
