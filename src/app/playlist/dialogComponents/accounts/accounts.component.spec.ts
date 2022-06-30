import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsComponent } from './accounts.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GlobalService } from '../../../../../projects/spotify/src/app/services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import {TranslateModule} from '@ngx-translate/core';
declare var loginDeezer: any;
declare var logoutDeezer: any;

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsComponent ],
      imports: [ MatDialogModule, HttpClientModule, NotifierModule, TranslateModule.forRoot() ],
      providers: [ GlobalService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginDeezer = jasmine.createSpy();
    logoutDeezer = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loginSpotify:: should login into spotify', () => {
    // @ts-ignore
    spyOn(component.globalService, 'getLoginAccountSpotify');
    component.loginSpotify();
    // @ts-ignore
    expect(component.globalService.getLoginAccountSpotify).toHaveBeenCalled();
  });

  it('logoutSpotify:: should logout into spotify', () => {
    // @ts-ignore
    spyOn(component.globalService, 'getLogoutAccountSpotify');
    component.logoutSpotify();
    // @ts-ignore
    expect(component.globalService.getLogoutAccountSpotify).toHaveBeenCalled();
    // @ts-ignore
    expect(component.loginNotification.logOnSpotify).toBeFalsy();
  });

  it('loginDeezer:: should login into deezer', () => {
    component.loginDeezer();
    expect(loginDeezer).toHaveBeenCalled();
  });

  it('logoutDeezer:: should logout into deezer', () => {
    component.logoutDeezer();
    expect(logoutDeezer).toHaveBeenCalled();
  });

  it('goCancel:: should close all dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'closeAll');
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });
});
