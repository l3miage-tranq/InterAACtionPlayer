import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PlaylistComponent } from './playlist.component';
import { NotifierModule } from 'angular-notifier';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalService } from '../../../projects/spotify/src/app/services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { StatusInternetService } from '../services/status-internet.service';
import { LoginNotificationService } from './services/login-notification.service';
import { of } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { ProgressIndicatorComponent } from './progressIndicator/progress-indicator.component';

declare var initDeezer: any;
declare var logoutDeezer: any;
declare var playDeezer: any;
declare var pauseDeezer: any;
declare var increaseVolumeDeezer: any;
declare var decreaseVolumeDeezer: any;

var count = 1;
class MockThemeService {
  get themeObservable() {
    if (count == 1) {
      count++;
      return of('inverted');
    }
    return of('');
  }
}


describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;
  const loginNotificationMock = jasmine.createSpyObj('LoginNotificationService', ['getStatusDeezer'], {logOnSpotify: true, logOnDeezer: false});
  let statusInternet;

  beforeEach(async () => {
    const statusInternetMock = jasmine.createSpyObj('StatusInternetService', ['getStatusInternet']);
    await TestBed.configureTestingModule({
      declarations: [ PlaylistComponent, ProgressIndicatorComponent ],
      imports: [ MatDialogModule, NotifierModule, RouterTestingModule.withRoutes([
        { path: 'user', component: PlaylistComponent}, {path: 'playlist', component: PlaylistComponent}]), TranslateModule.forRoot(), HttpClientModule ],
      providers: [ GlobalService,
      { provide: StatusInternetService, useValue: statusInternetMock },
      { provide: LoginNotificationService, useValue: loginNotificationMock },
      { provide: ThemeService, useClass: MockThemeService }
     ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    initDeezer = jasmine.createSpy();
    logoutDeezer = jasmine.createSpy();
    playDeezer = jasmine.createSpy();
    pauseDeezer = jasmine.createSpy();
    increaseVolumeDeezer = jasmine.createSpy();
    decreaseVolumeDeezer = jasmine.createSpy();
    statusInternet = TestBed.inject(StatusInternetService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit:: should set theme and call functions', fakeAsync(() => {
    spyOn(component, 'checkStatus');
    spyOn(component, 'goEdit');
    fixture.detectChanges();
    tick(1100);
    expect(component.checkStatus).toHaveBeenCalled();
    expect(component.goEdit).toHaveBeenCalled();
  }));

  it('ngOnInit:: should set theme and call functions', fakeAsync(() => {
    spyOn(component, 'checkStatus');
    spyOn(component, 'goEdit');
    spyOn(component, 'isPlaylistEmpty').and.returnValue(false);
    fixture.detectChanges();
    tick(1100);
    expect(component.checkStatus).toHaveBeenCalled();
    expect(component.goEdit).not.toHaveBeenCalled();
  }));

  it('checkStatus:: should check status of spotify and deezer with spotify true', fakeAsync(() => {
    (Object.getOwnPropertyDescriptor(loginNotificationMock, "logOnSpotify")?.get as jasmine.Spy<() => boolean>).and.returnValue(true);
    (Object.getOwnPropertyDescriptor(loginNotificationMock, "logOnDeezer")?.get as jasmine.Spy<() => boolean>).and.returnValue(false);
    component.checkStatus();
    tick(3500);
    expect(component.statusSpotify).toEqual('green');
    expect(component.statusDeezer).toEqual('red');
  }));

  it('checkStatus:: should check status of spotify and deezer with deezer true', fakeAsync(() => {
    (Object.getOwnPropertyDescriptor(loginNotificationMock, "logOnSpotify")?.get as jasmine.Spy<() => boolean>).and.returnValue(false);
    (Object.getOwnPropertyDescriptor(loginNotificationMock, "logOnDeezer")?.get as jasmine.Spy<() => boolean>).and.returnValue(true);
    component.checkStatus();
    tick(3500);
    expect(component.statusSpotify).toEqual('red');
    expect(component.statusDeezer ).toEqual('green');
  }));

  it('isEditModeActive:: should go to edit if edit mode is enabled', () => {
    spyOn(component, 'goEdit');
    component.edit = false;
    component.isEditModeActive();
    expect(component.goEdit).not.toHaveBeenCalled();
    component.edit = true;
    component.isEditModeActive();
    expect(component.goEdit).toHaveBeenCalled();
  });

  it('deleteCurrentElement:: should set launch to false', () => {
    component.deleteCurrentElement();
    expect(component.launch).toBeFalsy();
  });

  it('openDialog:: should go to edit if playlist is empty', () => {
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    spyOn(component, 'isPlaylistEmpty').and.returnValue(true);
    // @ts-ignore
    component.playlistService.addBtnAddInEmptyPlaylist = true;
    component.openDialog({types: 'btnAdd'} as any);
    expect(component.goEdit).toHaveBeenCalled();
  });

  it('openDialog:: should not go to edit if playlist is not empty', () => {
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true) } as any);
    spyOn(component, 'isPlaylistEmpty').and.returnValue(false);
    // @ts-ignore
    component.playlistService.addBtnAddInEmptyPlaylist = true;
    component.openDialog({types: 'btnAdd'} as any);
    expect(component.goEdit).not.toHaveBeenCalled();
  });

  it('openDialog:: should not go to edit if playlist is not empty', () => {
    spyOn(document, 'getElementById').and.returnValue({scrollIntoView: () => {}} as any);
    spyOn(component, 'goLaunch');
    component.openDialog({types: 'test'} as any);
    expect(component.goLaunch).toHaveBeenCalled();
  });

  it('newPlaylist:: should add new playlist and go to edit', () => {
    spyOn(component, 'goEdit');
    // @ts-ignore
    component.alertService.doNotShowAgain = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.newPlaylist();
    expect(component.goEdit).toHaveBeenCalled();
  });

  it('newPlaylist:: should add new playlist and not go to edit if alert as canceled', () => {
    spyOn(component, 'goEdit');
    // @ts-ignore
    component.alertService.doNotShowAgain = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    // @ts-ignore
    component.alertService.alertCancel = true;
    component.newPlaylist();
    expect(component.goEdit).not.toHaveBeenCalled();
  });

  it('newPlaylist:: should add new playlist and not go to edit directly if do not show alert again is selected', () => {
    spyOn(component, 'goEdit');
    // @ts-ignore
    component.alertService.doNotShowAgain = true;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    // @ts-ignore
    component.alertService.alertCancel = true;
    component.newPlaylist();
    expect(component.goEdit).toHaveBeenCalled();
    // @ts-ignore
    expect(component.dialog.open).not.toHaveBeenCalled();
  });

  it('openSave:: should go to edit if playlist is empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(true);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openSave();
    expect(component.goEdit).toHaveBeenCalled();
  });

  it('openSave:: should not go to edit if playlist is not empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(false);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openSave();
    expect(component.goEdit).not.toHaveBeenCalled();
  });

  it('openLoad:: should go to edit if playlist is empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(true);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openLoad();
    expect(component.goEdit).toHaveBeenCalled();
  });

  it('openLoad:: should not go to edit if playlist is not empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(false);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openLoad();
    expect(component.goEdit).not.toHaveBeenCalled();
  });

  it('openImport:: should go to edit if playlist is empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(true);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openImport();
    expect(component.goEdit).toHaveBeenCalled();
  });

  it('openImport:: should not go to edit if playlist is not empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(false);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openImport();
    expect(component.goEdit).not.toHaveBeenCalled();
  });

  it('openExport:: should go to edit if playlist is empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(true);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openExport();
    expect(component.goEdit).toHaveBeenCalled();
  });

  it('openExport:: should not go to edit if playlist is not empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(false);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openExport();
    expect(component.goEdit).not.toHaveBeenCalled();
  });

  it('openAccounts:: should go to edit if playlist is empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(true);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openAccounts();
    expect(component.goEdit).toHaveBeenCalled();
  });

  it('openAccounts:: should not go to edit if playlist is not empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(false);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openAccounts();
    expect(component.goEdit).not.toHaveBeenCalled();
  });

  it('openDelete:: should go to edit if playlist is empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(true);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openDelete();
    expect(component.goEdit).toHaveBeenCalled();
  });

  it('openDelete:: should not go to edit if playlist is not empty', () => {
    spyOn(component, 'isPlaylistEmpty').and.returnValue(false);
    spyOn(component, 'goEdit');
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.openDelete();
    expect(component.goEdit).not.toHaveBeenCalled();
  });

  it('openSettings:: should navigate to settings', () => {
    // @ts-ignore
    spyOn(component.router, 'navigate');
    component.openSettings();
    // @ts-ignore
    expect(component.router.navigate).toHaveBeenCalledWith(['/settings']);
  });

  it('goEdit:: should enable drag drop if edit is selected', () => {
    component.edit = false;
    component.goEdit();
    expect(component.disableDragDrop).toBeTruthy();
  });

  it('goEdit:: should disable drag drop if edit is not selected', () => {
    component.edit = true;
    component.goEdit();
    expect(component.disableDragDrop).toBeFalsy();
  });

  it('goDelete:: should open dialog and delete play list', fakeAsync(() => {
    // @ts-ignore
    component.alertService.doNotShowAgain = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    // @ts-ignore
    spyOn(component.playlistService , 'deleteToPlaylist');
    // @ts-ignore
    spyOn(component.playlistService , 'addBtnAdd');
    component.goDelete({} as any);
    // @ts-ignore
    expect(component.playlistService.deleteToPlaylist).toHaveBeenCalled();
    tick(110);
    // @ts-ignore
    expect(component.playlistService.addBtnAdd).toHaveBeenCalled();
  }));

  it('goDelete:: should open dialog and not delete play list if cancel dialog', fakeAsync(() => {
    // @ts-ignore
    component.alertService.doNotShowAgain = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    // @ts-ignore
    spyOn(component.playlistService , 'deleteToPlaylist');
    // @ts-ignore
    spyOn(component.playlistService , 'addBtnAdd');
    // @ts-ignore
    component.alertService.alertCancel = true;
    component.goDelete({} as any);
    // @ts-ignore
    expect(component.playlistService.deleteToPlaylist).not.toHaveBeenCalled();
    tick(110);
    // @ts-ignore
    expect(component.playlistService.addBtnAdd).not.toHaveBeenCalled();
  }));

  it('goDelete:: should not open dialog but delete play list if do not show dialog is present', fakeAsync(() => {
    // @ts-ignore
    component.alertService.doNotShowAgain = true;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    // @ts-ignore
    spyOn(component.playlistService , 'deleteToPlaylist');
    // @ts-ignore
    spyOn(component.playlistService , 'addBtnAdd');
    component.goDelete({} as any);
    // @ts-ignore
    expect(component.playlistService.deleteToPlaylist).toHaveBeenCalled();
    tick(110);
    // @ts-ignore
    expect(component.playlistService.addBtnAdd).toHaveBeenCalled();
  }));

  it('isCurrentElem:: should set launch to false if element id is same as current element id', () => {
    component.launch = true;
    component.currentElem = { id: 1 };
    component.isCurrentElem({id: 1});
    expect(component.launch).toBeFalsy();
  });

  it('isCurrentElem:: should not set launch to false if element id is not same as current element id', () => {
    component.launch = true;
    component.currentElem = { id: 1 };
    component.isCurrentElem({id: 0});
    expect(component.launch).toBeTruthy();
  });

  it('logout:: should logoutDeezer and navigate to user', () => {
    // @ts-ignore
    spyOn(component.router, 'navigate');
    component.logout();
    expect(logoutDeezer).toHaveBeenCalled();
    // @ts-ignore
    expect(component.router.navigate).toHaveBeenCalledWith(['user']);
  });

  it('logoutAFSR:: should logoutDeezer and open logout dialog', () => {
    statusInternet.getStatusInternet.and.returnValue(true);
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.logoutAFSR();
    expect(logoutDeezer).toHaveBeenCalled();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('logoutAFSR:: should not logoutDeezer and open logout dialog if internet is not working', () => {
    statusInternet.getStatusInternet.and.returnValue(false);
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true)} as any);
    component.logoutAFSR();
    expect(logoutDeezer).not.toHaveBeenCalled();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('goLaunch:: should launch playlist', () => {
    component.goLaunch({types: 'test'} as any);
    expect(component.launch).toBeTruthy();
  });

  it('goLaunch:: should not launch playlist if element is add', () => {
    component.goLaunch({types: 'btnAdd'} as any);
    expect(component.launch).toBeFalsy();
  });

  it('setDefaultVolume:: should set default volume in youtube', fakeAsync(() => {
    try {
      component.launch = true;
      component.currentElem = {types: 'YouTube', id: 'ohxFArvBpBc'};
      component.setDefaultVolume();
      tick(600);
      expect(component).toBeTruthy();
    } catch (error) {}
  }));

  it('setDefaultVolume:: should set default volume in spotify', () => {
    component.launch = true;
    component.currentElem = {types: 'Spotify', id: 'ohxFArvBpBc'};
    component.setDefaultVolume();
    expect(component).toBeTruthy();
  });

  it('goFullScreen:: should go full screen and call fixeBtn', () => {
    component.fullScreen = false;
    spyOn(component, 'fixeBtn').and.callThrough();
    component.currentElem = {types: 'YouTube', id: 'ohxFArvBpBc'};
    spyOn(document, 'getElementById').and.returnValue({classList: {add: () => {}, replace: () => {}}, style: { opacity: 1 }} as any);
    component.goFullScreen();
    expect(document.getElementById).toHaveBeenCalled();
    expect(component.fixeBtn).toHaveBeenCalled();
  });

  it('goFullScreen:: should go full screen and call fixeBtn', () => {
    component.fullScreen = false;
    spyOn(component, 'fixeBtn').and.callThrough();
    component.currentElem = {types: 'video', id: 'ohxFArvBpBc'};
    spyOn(document, 'getElementById').and.returnValue({classList: {add: () => {}, replace: () => {}}, style: { opacity: 1 }} as any);
    component.goFullScreen();
    expect(document.getElementById).toHaveBeenCalled();
    expect(component.fixeBtn).toHaveBeenCalled();
  });

  it('goFullScreen:: should not go full screen and not call fixeBtn if type is not defined', () => {
    component.fullScreen = false;
    spyOn(component, 'fixeBtn').and.callThrough();
    component.currentElem = {types: null, id: 'ohxFArvBpBc'};
    spyOn(document, 'getElementById').and.returnValue({classList: {add: () => {}, replace: () => {}}, style: { opacity: 1 }} as any);
    component.goFullScreen();
    expect(document.getElementById).not.toHaveBeenCalled();
    expect(component.fixeBtn).not.toHaveBeenCalled();
  });

  it('goFullScreen:: should exit fullscreen if already in fullscreen', () => {
    component.fullScreen = true;
    spyOn(component, 'fixeBtn').and.callThrough();
    spyOn(component, 'exitFullScreen').and.callThrough();
    component.currentElem = {types: null, id: 'ohxFArvBpBc'};
    spyOn(document, 'getElementById').and.returnValue({classList: {add: () => {}, replace: () => {}}, style: { opacity: 1 }} as any);
    component.goFullScreen();
    expect(document.getElementById).not.toHaveBeenCalled();
    expect(component.fixeBtn).not.toHaveBeenCalled();
    expect(component.exitFullScreen).toHaveBeenCalled();
  });

  it('exitFullScreen:: should exitFullScreen full screen and call unFixeBtn', () => {
    component.fullScreen = true;
    spyOn(component, 'unFixeBtn').and.callThrough();
    component.currentElem = {types: 'YouTube', id: 'ohxFArvBpBc'};
    spyOn(document, 'getElementById').and.returnValue({classList: {remove: () => {}, replace: () => {}}, style: { opacity: 1 }} as any);
    spyOn(component, 'goOnElement');
    component.exitFullScreen();
    expect(document.getElementById).toHaveBeenCalled();
    expect(component.unFixeBtn).toHaveBeenCalled();
  });

  it('exitFullScreen:: should exit full screen and call unFixeBtn', () => {
    component.fullScreen = true;
    spyOn(component, 'unFixeBtn').and.callThrough();
    component.currentElem = {types: 'video', id: 'ohxFArvBpBc'};
    spyOn(document, 'getElementById').and.returnValue({classList: {remove: () => {}, replace: () => {}}, style: { opacity: 1 }} as any);
    spyOn(component, 'goOnElement');
    component.exitFullScreen();
    expect(document.getElementById).toHaveBeenCalled();
    expect(component.unFixeBtn).toHaveBeenCalled();
  });

  it('exitFullScreen:: should not exit full screen and not call unFixeBtn if already out of fullscreen', () => {
    component.fullScreen = false;
    spyOn(component, 'unFixeBtn').and.callThrough();
    component.currentElem = {types: 'video', id: 'ohxFArvBpBc'};
    spyOn(document, 'getElementById').and.returnValue({classList: {remove: () => {}, replace: () => {}}, style: { opacity: 1 }} as any);
    component.exitFullScreen();
    expect(document.getElementById).not.toHaveBeenCalled();
    expect(component.unFixeBtn).not.toHaveBeenCalled();
  });

  it('showBtn:: should add styles to button', () => {
    spyOn(document, 'getElementById').and.returnValue({style: { opacity: 1, transition: '' }} as any);
    component.showBtn('');
    component.fullScreen = true;
    component.showBtn('');
    expect(component).toBeTruthy();
  });

  it('hideBtn:: should add styles to button', () => {
    spyOn(document, 'getElementById').and.returnValue({style: { opacity: 1, transition: '' }} as any);
    component.hideBtn('');
    component.fullScreen = true;
    component.hideBtn('');
    expect(component).toBeTruthy();
  });

  it('getSrcFile:: should return sanetized url', () => {
    component.currentElem = {id: 'https://google.com'};
    expect(component.getSrcFile()).toBeDefined();
  });

  it('goNext:: should play next track', () => {
    component.playList = [{ id: 1 }, { id: 2 }] as any;
    component.currentElem = {id : 1};
    spyOn(component, 'setDefaultVolume');
    spyOn(component, 'goOnElement');
    component.goNext();
    expect(component.currentElem.id).toEqual(2);
    expect(component.setDefaultVolume).toHaveBeenCalled();
  });

  it('goNext:: should play next track', () => {
    component.playList = [{ id: 1 }, { id: 2 }] as any;
    component.currentElem = {id : 0};
    spyOn(component, 'setDefaultVolume');
    spyOn(component, 'goOnElement');
    component.goNext();
    expect(component.currentElem.id).toEqual(0);
    expect(component.setDefaultVolume).toHaveBeenCalled();
  });

  it('goNext:: should play next track', () => {
    component.playList = [{ id: 1 }] as any;
    component.currentElem = {id : 1};
    spyOn(component, 'setDefaultVolume');
    spyOn(component, 'goOnElement');
    component.goNext();
    expect(component.currentElem.id).toEqual(1);
    expect(component.setDefaultVolume).toHaveBeenCalled();
  });

  it('goNext:: should play next track', () => {
    component.playList = [{ id: 0 },  { id: 2 }, { id: 1 }] as any;
    component.currentElem = {id : 1};
    spyOn(component, 'setDefaultVolume');
    spyOn(component, 'goOnElement');
    component.goNext();
    expect(component.currentElem.id).toEqual(0);
    expect(component.setDefaultVolume).toHaveBeenCalled();
  });


  it('goPrevious:: should play next track', () => {
    component.playList = [{ id: 2 }, { id: 1 }] as any;
    component.currentElem = {id : 1};
    spyOn(component, 'setDefaultVolume');
    spyOn(component, 'goOnElement');
    component.goPrevious();
    expect(component.currentElem.id).toEqual(2);
    expect(component.setDefaultVolume).toHaveBeenCalled();
  });

  it('goPrevious:: should play next track', () => {
    component.playList = [{ id: 1 }, { id: 2 }] as any;
    component.currentElem = {id : 0};
    spyOn(component, 'setDefaultVolume');
    spyOn(component, 'goOnElement');
    component.goPrevious();
    expect(component.currentElem.id).toEqual(0);
    expect(component.setDefaultVolume).toHaveBeenCalled();
  });

  it('goPrevious:: should play next track', () => {
    component.playList = [{ id: 1 }] as any;
    component.currentElem = {id : 1};
    spyOn(component, 'setDefaultVolume');
    spyOn(component, 'goOnElement');
    component.goPrevious();
    expect(component.currentElem.id).toEqual(1);
    expect(component.setDefaultVolume).toHaveBeenCalled();
  });

  it('goPrevious:: should play next track', () => {
    component.playList = [{ id: 1 }, { id: 0 },  { id: 2 }, ] as any;
    component.currentElem = {id : 1};
    spyOn(component, 'goOnElement');
    spyOn(component, 'setDefaultVolume');
    component.goPrevious();
    expect(component.currentElem.id).toEqual(2);
    expect(component.setDefaultVolume).toHaveBeenCalled();
  });

  describe('goPlay', () => {
    it('video', () => {
      component.currentElem = {types: 'video'};
      component.myvideo = { nativeElement: { play: () => {} } };
      spyOn(component.myvideo.nativeElement, 'play');
      component.goPlay();
      expect(component.myvideo.nativeElement.play).toHaveBeenCalled();
    });

    it('song', () => {
      component.currentElem = {types: 'song'};
      component.myvideo = { nativeElement: { play: () => {} } };
      spyOn(component.myvideo.nativeElement, 'play');
      // @ts-ignore
      component.audioService.audioPlay = false;
      component.goPlay();
      expect(component.myvideo.nativeElement.play).not.toHaveBeenCalled();
    });

    it('Youtube', () => {
      try {
        component.launch = true;
        component.currentElem = {types: 'YouTube', id: 'ohxFArvBpBc'};
        component.goPlay();
        expect(component).toBeTruthy();
      } catch (error) {}
    });

    it('Spotify', () => {
      component.currentElem = {types: 'Spotify'};
      // @ts-ignore
      spyOn(component.globalService, 'playMusic');
      component.goPlay();
      // @ts-ignore
      expect(component.globalService.playMusic).toHaveBeenCalled();
    });

    it('Deezer', () => {
      component.currentElem = {types: 'Deezer'};
      component.goPlay();
      // @ts-ignore
      expect(playDeezer).toHaveBeenCalled();
    });

    it('default', () => {
      component.currentElem = {types: 'lol'};
      component.goPlay();
      expect(component).toBeTruthy();
    });
  });

  describe('goPause', () => {
    it('video', () => {
      component.currentElem = {types: 'video'};
      component.myvideo = { nativeElement: { pause: () => {} } };
      spyOn(component.myvideo.nativeElement, 'pause');
      component.goPause();
      expect(component.myvideo.nativeElement.pause).toHaveBeenCalled();
    });

    it('song', () => {
      component.currentElem = {types: 'song'};
      component.myvideo = { nativeElement: { pause: () => {} } };
      spyOn(component.myvideo.nativeElement, 'pause');
      // @ts-ignore
      component.audioService.audioPlay = true;
      component.goPause();
      expect(component.myvideo.nativeElement.pause).not.toHaveBeenCalled();
    });

    it('Youtube', () => {
      try {
        component.launch = true;
        component.currentElem = {types: 'YouTube', id: 'ohxFArvBpBc'};
        component.goPause();
        expect(component).toBeTruthy();
      } catch (error) {}
    });

    it('Spotify', () => {
      component.currentElem = {types: 'Spotify'};
      // @ts-ignore
      spyOn(component.globalService, 'pauseMusic');
      component.goPause();
      // @ts-ignore
      expect(component.globalService.pauseMusic).toHaveBeenCalled();
    });

    it('Deezer', () => {
      component.currentElem = {types: 'Deezer'};
      component.goPause();
      // @ts-ignore
      expect(pauseDeezer).toHaveBeenCalled();
    });

    it('default', () => {
      component.currentElem = {types: 'lol'};
      component.goPause();
      expect(component).toBeTruthy();
    });
  });

  describe('goDecreaseVolume', () => {
    it('video', () => {
      component.currentElem = {types: 'video'};
      component.myvideo = { nativeElement: { volume: 2 } };
      component.goDecreaseVolume();
      expect(component.myvideo.nativeElement.volume).toEqual(1.9);
    });

    it('video', () => {
      component.currentElem = {types: 'video'};
      component.myvideo = { nativeElement: { volume: 0.09 } };
      component.goDecreaseVolume();
      expect(component.myvideo.nativeElement.volume).toEqual(0);
    });

    it('song', () => {
      component.currentElem = {types: 'song'};
      // @ts-ignore
      spyOn(component.audioService, 'emitDecreaseVolume');
      component.goDecreaseVolume();
      // @ts-ignore
      expect(component.audioService.emitDecreaseVolume).toHaveBeenCalled();
    });

    it('Youtube', () => {
      try {
        component.currentElem = {types: 'YouTube', id: 'ohxFArvBpBc'};
        component.volumeYouTubeVideo = 100;
        component.goDecreaseVolume();
        expect(component.volumeYouTubeVideo).toEqual(90);
      } catch (error) {}
    });

    it('Spotify', () => {
      component.currentElem = {types: 'Spotify'};
      // @ts-ignore
      spyOn(component.globalService, 'setVolume');
      component.volumeSpotifyMusic = 100;
      component.goDecreaseVolume();
      // @ts-ignore
      expect(component.globalService.setVolume).toHaveBeenCalled();
      expect(component.volumeSpotifyMusic).toEqual(90);
    });

    it('Deezer', () => {
      component.currentElem = {types: 'Deezer'};
      component.goDecreaseVolume();
      // @ts-ignore
      expect(decreaseVolumeDeezer).toHaveBeenCalled();
    });

    it('default', () => {
      component.currentElem = {types: 'lol'};
      component.goDecreaseVolume();
      expect(component).toBeTruthy();
    });
  });

  describe('goIncreaseVolume', () => {
    it('video', () => {
      component.currentElem = {types: 'video'};
      component.myvideo = { nativeElement: { volume: 0.8 } };
      component.goIncreaseVolume();
      expect(component.myvideo.nativeElement.volume).toEqual(0.9);
    });

    it('video', () => {
      component.currentElem = {types: 'video'};
      component.myvideo = { nativeElement: { volume: 0.99 } };
      component.goIncreaseVolume();
      expect(component.myvideo.nativeElement.volume).toEqual(1);
    });

    it('song', () => {
      component.currentElem = {types: 'song'};
      // @ts-ignore
      spyOn(component.audioService, 'emitIncreaseVolume');
      component.goIncreaseVolume();
      // @ts-ignore
      expect(component.audioService.emitIncreaseVolume).toHaveBeenCalled();
    });

    it('Youtube', () => {
      try {
        component.currentElem = {types: 'YouTube', id: 'ohxFArvBpBc'};
        component.volumeYouTubeVideo = 100;
        component.goIncreaseVolume();
        expect(component.volumeYouTubeVideo).toEqual(110);
      } catch (error) {}
    });

    it('Spotify', () => {
      component.currentElem = {types: 'Spotify'};
      // @ts-ignore
      spyOn(component.globalService, 'setVolume');
      component.volumeSpotifyMusic = 100;
      component.goIncreaseVolume();
      // @ts-ignore
      expect(component.globalService.setVolume).toHaveBeenCalled();
      expect(component.volumeSpotifyMusic).toEqual(110);
    });

    it('Deezer', () => {
      component.currentElem = {types: 'Deezer'};
      component.goIncreaseVolume();
      // @ts-ignore
      expect(increaseVolumeDeezer).toHaveBeenCalled();
    });

    it('default', () => {
      component.currentElem = {types: 'lol'};
      component.goIncreaseVolume();
      expect(component).toBeTruthy();
    });
  });

  it('showProgressIndicator:: should show indicator', () => {
    // @ts-ignore
    component.dwelltimeService.dwellTime = true;
    spyOn(document, 'getElementById').and.returnValue({style: { opacity: 1, transition: '', visibility: '' }} as any);
    spyOn(component, 'startInterval').and.callThrough();
    component.showProgressIndicator('', '');
    expect(component.startInterval).toHaveBeenCalled();
  });

  it('showProgressIndicator:: should not show indicator if dwell time is not present', () => {
    // @ts-ignore
    component.dwelltimeService.dwellTime = false;
    spyOn(document, 'getElementById').and.returnValue({style: { opacity: 1, transition: '', visibility: '' }} as any);
    spyOn(component, 'startInterval').and.callThrough();
    component.showProgressIndicator('', '');
    expect(component.startInterval).not.toHaveBeenCalled();
  });

  it('hideProgressIndicator:: should hideProgressIndicator indicator', () => {
    spyOn(document, 'getElementById').and.returnValue({style: { opacity: 1, transition: '', visibility: '' }} as any);
    component.hideProgressIndicator('', '');
    expect(component.loopProgressIndicator).toBeFalsy();
  });

  it('openDialogSiteASFR:: should open dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open');
    component.openDialogSiteASFR();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('openDialogSiteInteraactionBox:: should open dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open');
    component.openDialogSiteInteraactionBox();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('Utility functions should retrn values based on theme', () => {
    component.theme = '';
    component.goUp();
    component.goDown();
    expect(component.displaySideBar()).toBeFalsy();
    expect(component.getColorOfTitle()).toEqual('#81197f');
    expect(component.getBrightnessOfInterAACtionBoxAFSRLogo()).toEqual('0.2');
    expect(component.getBrightnessOfAFSRLogo()).toEqual('1');
    component.theme = 'dark';
    expect(component.getColorOfTitle()).toEqual('white');
    expect(component.getBrightnessOfInterAACtionBoxAFSRLogo()).toEqual('1');
    expect(component.getBrightnessOfAFSRLogo()).toEqual('10');
  });

  it('startInterval:: should set loopProgressIndicator to loop if loop is not null', fakeAsync(() => {
    const elem = { click: () => jasmine.createSpy() } as any;
    component.startInterval('', '', elem, true);
    tick(100);
    spyOn(component, 'startInterval')
    component.spinnerValue = 100;
    tick(1000);
    expect(component.startInterval).toHaveBeenCalled();
  }));

  it('startInterval:: should set loopProgressIndicator', fakeAsync(() => {
    const elem = { click: () => jasmine.createSpy() } as any;
    component.startInterval('', '', elem, false);
    tick(100);
    spyOn(component, 'hideProgressIndicator')
    component.spinnerValue = 100;
    tick(1000);
    expect(component.hideProgressIndicator).toHaveBeenCalled();
  }));

  it('dragDrop:: should handle drag drop event', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updatePlaylist');
    component.playList = [{}, {}] as any;
    component.dragDrop({
      previousContainer: { data: { index: 0, elem: 'abc' } },
      container: { data: { index: 1, elem: 'xyz' } },
     } as any)
     // @ts-ignore
     expect(component.saveService.updatePlaylist).toHaveBeenCalled();
     expect(component.playList).toEqual(['xyz', 'abc'] as any);
  });
});