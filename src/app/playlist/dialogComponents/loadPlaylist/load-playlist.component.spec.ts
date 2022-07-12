import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPlaylistComponent } from './load-playlist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';
import { MapPipe } from '../../pipe/map.pipe';
import { of } from 'rxjs';

describe('LoadPlaylistComponent', () => {
  let component: LoadPlaylistComponent;
  let fixture: ComponentFixture<LoadPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPlaylistComponent, MapPipe ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sendKey:: should set getKey', () => {
    component.sendKey('abc');
    expect(component.getKey).toEqual('abc');
  });

  it('goCancel:: should close all dialogs', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('deletePlaylist:: should delete playlist', () => {
    const g = document.createElement('div');
    g.setAttribute("id", "abc");
    document.body.appendChild(g);
    // @ts-ignore
    spyOn(component.playlistService, 'deleteMapPlaylist');
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.deletePlaylist('abc');
    // @ts-ignore
    expect(component.playlistService.deleteMapPlaylist).toHaveBeenCalled();
  });

  it('deletePlaylist:: should delete playlist', () => {
    const g = document.createElement('div');
    g.setAttribute("id", "abc");
    document.body.appendChild(g);
    // @ts-ignore
    spyOn(component.playlistService, 'deleteMapPlaylist');
    // @ts-ignore
    component.alertService.doNotShowAgain = true;
    component.deletePlaylist('abc');
    // @ts-ignore
    expect(component.playlistService.deleteMapPlaylist).toHaveBeenCalled();
  });

  it('deletePlaylist:: should not delete playlist if cancel dialog', () => {
    const g = document.createElement('div');
    g.setAttribute("id", "abc");
    document.body.appendChild(g);
    // @ts-ignore
    spyOn(component.playlistService, 'deleteMapPlaylist');
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    // @ts-ignore
    component.alertService.alertCancel = true;
    component.deletePlaylist('abc');
    // @ts-ignore
    expect(component.playlistService.deleteMapPlaylist).not.toHaveBeenCalled();
  });

  it('submit:: should show error if key is empty', () => {
    component.submit();
    expect(component.errorEmptyCheckbox).toBeTruthy();
  });

  it('submit:: should submit', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updatePlaylist');
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.getKey = 'abc';
    component.submit();
    // @ts-ignore
    expect(component.saveService.updatePlaylist).toHaveBeenCalled();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });
});
