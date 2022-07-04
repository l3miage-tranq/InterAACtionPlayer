import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageComponent } from './error-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SpeedTestModule} from 'ng-speed-test';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPageComponent ],
      imports: [MatDialogModule, RouterTestingModule, TranslateModule.forRoot(), SpeedTestModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // spy upon the getStatusInternet from internet service and after calling the function just check if it is setting values
  it('checkInternetConnexion:: should check internet connection and set playlist', () => {
    // @ts-ignore
    spyOn(component.statusInternetService, 'getStatusInternet').and.returnValue(true);
    component.checkInternetConnexion();
    expect(component.noInternet).toBeFalsy();
    expect(component.playlistButton).toEqual('error.goPlaylist');
  });

  // spy upon the getStatusInternet from internet service and after calling the function just check if it is setting values
  it('checkInternetConnexion:: should check internet connection and set playlist', () => {
    // @ts-ignore
    spyOn(component.statusInternetService, 'getStatusInternet').and.returnValue(false);
    component.checkInternetConnexion();
    expect(component.noInternet).toBeTruthy();
    expect(component.playlistButton).toEqual('error.goOfflinePlaylist');
  });

  // spy upon the dialog open method and check if it is getting called
  it('exitApp:: should open logout dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open');
    component.exitApp();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  // spy upon the router navigate method and check if it is getting called or not
  it('goPlaylist:: should redirect to playlist', () => {
    // @ts-ignore
    spyOn(component.router, 'navigate');
    component.goPlaylist();
    // @ts-ignore
    expect(component.router.navigate).toHaveBeenCalled();

  });
});
