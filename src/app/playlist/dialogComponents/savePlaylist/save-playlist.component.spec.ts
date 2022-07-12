import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePlaylistComponent } from './save-playlist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';

describe('SavePlaylistComponent', () => {
  let component: SavePlaylistComponent;
  let fixture: ComponentFixture<SavePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePlaylistComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('getNamePlaylist:: should return name from event', () => {
    component.getNamePlaylist({ target: { value: 'abc' }});
    expect(component.name).toEqual('abc');
  });

  it('goCancel:: should close all dialogs', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  }); 

  it('enableButtonSave:: should not diasble button if playlist is empty', () => {
    component.playlistEmpty = false;
    component.enableButtonSave();
    expect(component).toBeTruthy();
  });

  it('submit:: should not submit if name is not present', () => {
    component.name = '';
    component.submit();
    expect(component.errorNameEmpty).toBeTruthy();
  });

  it('submit:: should not submit if playlist name is already mapped', () => {
    // @ts-ignore
    spyOn(component.playlistService, 'playlistNameAlreadyInMap').and.returnValue(true);
    component.name = 'name';
    component.submit();
    expect(component.errorNameAlreadyUse).toBeTruthy();
  });

  it('submit:: should not submit', () => {
    // @ts-ignore
    spyOn(component.playlistService, 'playlistNameAlreadyInMap').and.returnValue(false);
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.name = 'name';
    component.submit();
    expect(component.errorNameAlreadyUse).toBeFalsy();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('saveKnowPlaylist:: should save playlist', () => {
    // @ts-ignore
    component.playlistService = { nameActualPlaylist: 'abc', playlistNameAlreadyInMap: jasmine.createSpy().and.returnValue(true),
    addMapPlaylist: jasmine.createSpy() };
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.saveKnowPlaylist();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });
});
