import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportfileComponent } from './importfile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import {TranslateModule} from '@ngx-translate/core';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ImportfileComponent', () => {
  let component: ImportfileComponent;
  let fixture: ComponentFixture<ImportfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportfileComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot(), BrowserAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTypeSong:: should get song if type file is not song', () => {
    component.typeFile = 'abc';
    component.getTypeSong();
    expect(component.typeFile).toEqual('song');
    expect(component.titleFile).toEqual('importFilePlaylist.titleSong');
    expect(component.extension).toEqual('audio/wav, audio/mpeg');
  });

  it('getTypeSong:: should not get song if type file is song', () => {
    component.typeFile = 'song';
    component.getTypeSong();
    expect(component.typeFile).toBeDefined();
    expect(component.titleFile).toBeDefined();
    expect(component.extension).toBeDefined();
  });

  it('getTypeVideo:: should get song if type file is not video', () => {
    component.typeFile = 'abc';
    component.getTypeVideo();
    expect(component.typeFile).toEqual('video');
    expect(component.titleFile).toEqual('importFilePlaylist.titleVideo');
    expect(component.extension).toEqual('video/mp4, video/webm');
  });

  it('getTypeVideo:: should not get song if type file is video', () => {
    component.typeFile = 'video';
    component.getTypeVideo();
    expect(component.typeFile).toBeDefined();
    expect(component.titleFile).toBeDefined();
    expect(component.extension).toBeDefined();
  });

  it('getTypeFile:: should get song if type file is not file', () => {
    component.typeFile = 'abc';
    component.getTypeFile();
    expect(component.typeFile).toEqual('file');
    expect(component.authorizedExtension).toEqual('importFilePlaylist.authorizedFile');
    expect(component.extension).toEqual('.AACPPlaylist');
  });

  it('getTypeFile:: should not get song if type file is file', () => {
    component.typeFile = 'file';
    component.getTypeFile();
    expect(component.typeFile).toBeDefined();
    expect(component.titleFile).toBeDefined();
    expect(component.extension).toBeDefined();
  });

  it('getTitle:: should set title', () => {
    component.getTitle({target: {value: 'abc'}});
    expect(component.titleFileInput).toEqual('abc');
  });

  it('getArtist:: should set artist', () => {
    component.getArtist({target: {value: 'abc'}});
    expect(component.artistFileInput).toEqual('abc');
  });

  it('newPlaylist:: should set new playlist', () => {
    component.newPlaylist();
    expect(component.mergePlaylistOption).toEqual('');
    expect(component.optionsPlaylist).toEqual('new');
    expect(component.newPlaylistOption).toEqual('positive');
  });

  it('mergePlaylist:: should set merge playlist', () => {
    component.mergePlaylist();
    expect(component.newPlaylistOption).toEqual('');
    expect(component.mergePlaylistOption).toEqual('positive');
    expect(component.optionsPlaylist).toEqual('merge');
  });

  it('goCancel:: should close all dialog', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: jasmine.createSpy() };
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('addFile:: should add file', () => {
    spyOn(window, 'FileReader').and.returnValue({ onload: () => { return Promise.resolve() }, readAsDataURL: () => {} } as any);
    const dt = new DataTransfer();
    const files = dt.items.add(new File([], 'file.csv'));
    component.addFile({ target: { files } });
    // @ts-ignore
    window.FileReader().onload();
    expect(component.acceptedFile).toBeTruthy();
  }); 

  it('addFile:: should add file', () => {
    component.typeFile = 'file';
    spyOn(window, 'FileReader').and.returnValue({ onload: () => { return Promise.resolve() }, readAsText: () => {} } as any);
    const blob = new Blob([""], { type: "text/html" });
    blob["lastModifiedDate"] = "";
    blob["name"] = "filename";
    const file = <File>blob;
    const files: FileList = {
      0: file,
      1: file,
      length: 2,
      item: (index: number) => file
    };
    component.addFile({ target: { files } });
    // @ts-ignore
    window.FileReader().onload();
    expect(component.acceptedFile).toBeTruthy();
  });

  it('audioIsValid:: should check and return if audio is valid', () => {
    component.typeFile = 'video';
    expect(component.audioIsValid()).toBeFalsy();
    component.typeFile = 'song';
    // @ts-ignore
    component.fileUpload = 'data:audio/wav';
    expect(component.audioIsValid()).toBeTruthy();
  });

  it('videoIsValid:: should check and return if video is valid', () => {
    component.typeFile = 'song';
    expect(component.videoIsValid()).toBeFalsy();
    component.typeFile = 'video';
    // @ts-ignore
    component.fileUpload = 'data:video/webm';
    expect(component.videoIsValid()).toBeTruthy();
  });

  it('jsonIsValid:: should check and return if json is valid', () => {
    component.typeFile = 'song';
    expect(component.jsonIsValid()).toBeFalsy();
    component.typeFile = 'file';
    // @ts-ignore
    component.nameFileUpload = 'AACPPlaylds.da';
    expect(component.jsonIsValid()).toBeFalsy();
    component.typeFile = 'file';
    // @ts-ignore
    component.fileUpload = '{"id": "1"}';
    // @ts-ignore
    component.nameFileUpload = 'AACPPlaylist.AACPPlaylist';
    expect(component.jsonIsValid()).toBeFalsy();
  });

  describe('submit', () => {
    beforeEach(() => {
      // @ts-ignore
      component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    });
    it('should throw error if file is empty', () => {
      // @ts-ignore
      component.fileUpload = null;
      component.submit();
      expect(component.acceptedFile).toBeFalsy();
      expect(component.errorEmptyFile).toBeTruthy();
    });

    it('should throw error if file is wrong', () => {
      // @ts-ignore
      component.fileUpload = true;
      spyOn(component, 'audioIsValid').and.returnValue(false);
      spyOn(component, 'videoIsValid').and.returnValue(false);
      spyOn(component, 'jsonIsValid').and.returnValue(false);
      component.submit();
      expect(component.acceptedFile).toBeFalsy();
      expect(component.errorWrongFile).toBeTruthy();
    });

    it('should throw error if file title is wrong', () => {
      // @ts-ignore
      component.fileUpload = true;
      spyOn(component, 'audioIsValid').and.returnValue(false);
      spyOn(component, 'videoIsValid').and.returnValue(false);
      spyOn(component, 'jsonIsValid').and.returnValue(true);
      component.titleFileInput = '';
      component.submit();
      expect(component.acceptedFile).toBeFalsy();
      expect(component.errorEmptyTitle).toBeTruthy();
    });

    it('should throw error if file is already in playlist', () => {
      // @ts-ignore
      component.fileUpload = true;
      spyOn(component, 'audioIsValid').and.returnValue(false);
      spyOn(component, 'videoIsValid').and.returnValue(false);
      spyOn(component, 'jsonIsValid').and.returnValue(true);
      // @ts-ignore
      spyOn(component.playlistService, 'fileAlreadyInPlaylist').and.returnValue(true);
      component.titleFileInput = 'abc';
      component.typeFile = 'abc';
      component.submit();
      expect(component.errorFileAlreadyInPlaylist).toBeTruthy();
    });

    it('should accept file if everything is good', () => {
      // @ts-ignore
      component.fileUpload = true;
      spyOn(component, 'audioIsValid').and.returnValue(false);
      spyOn(component, 'videoIsValid').and.returnValue(false);
      spyOn(component, 'jsonIsValid').and.returnValue(true);
      // @ts-ignore
      spyOn(component.playlistService, 'fileAlreadyInPlaylist').and.returnValue(false);
      component.titleFileInput = 'abc';
      component.typeFile = 'abc';
      component.submit();
      // @ts-ignore
      expect(component.dialog.closeAll).toHaveBeenCalled();
    });

    it('should work if type is file', () => {
      // @ts-ignore
      component.fileUpload = true;
      component.typeFile = 'file';
      spyOn(component, 'audioIsValid').and.returnValue(false);
      spyOn(component, 'videoIsValid').and.returnValue(false);
      spyOn(component, 'jsonIsValid').and.returnValue(true);
      // @ts-ignore
      spyOn(component.playlistService, 'newPlaylist');
      component.titleFileInput = '';
      component.submit();
      expect(component.acceptedFile).toBeFalsy();
      // @ts-ignore
      expect(component.playlistService.newPlaylist).toHaveBeenCalled();
    });

    
    it('should work if type is file', () => {
      // @ts-ignore
      component.fileUpload = true;
      component.typeFile = 'file';
      component.optionsPlaylist = 'old';
      spyOn(component, 'audioIsValid').and.returnValue(false);
      spyOn(component, 'videoIsValid').and.returnValue(false);
      spyOn(component, 'jsonIsValid').and.returnValue(true);
      // @ts-ignore
      spyOn(component.playlistService, 'mergePlaylist');
      component.titleFileInput = '';
      component.submit();
      expect(component.acceptedFile).toBeFalsy();
      // @ts-ignore
      expect(component.playlistService.mergePlaylist).toHaveBeenCalled();
    });

    it('should work if type is file', () => {
      // @ts-ignore
      component.fileUpload = true;
      component.typeFile = 'file';
      // @ts-ignore
      component.alertService.doNotShowAgain = true;
      spyOn(component, 'audioIsValid').and.returnValue(false);
      spyOn(component, 'videoIsValid').and.returnValue(false);
      spyOn(component, 'jsonIsValid').and.returnValue(true);
      // @ts-ignore
      spyOn(component.playlistService, 'newPlaylist');
      component.titleFileInput = '';
      component.submit();
      expect(component.acceptedFile).toBeFalsy();
      // @ts-ignore
      expect(component.playlistService.newPlaylist).toHaveBeenCalled();
    });

    
    it('should work if type is file', () => {
      // @ts-ignore
      component.fileUpload = true;
      component.typeFile = 'file';
      component.optionsPlaylist = 'old';
      // @ts-ignore
      component.alertService.doNotShowAgain = true;
      spyOn(component, 'audioIsValid').and.returnValue(false);
      spyOn(component, 'videoIsValid').and.returnValue(false);
      spyOn(component, 'jsonIsValid').and.returnValue(true);
      // @ts-ignore
      spyOn(component.playlistService, 'mergePlaylist');
      component.titleFileInput = '';
      component.submit();
      expect(component.acceptedFile).toBeFalsy();
      // @ts-ignore
      expect(component.playlistService.mergePlaylist).toHaveBeenCalled();
    });

    it('should work if type is file', () => {
      // @ts-ignore
      component.fileUpload = true;
      component.typeFile = 'file';
      component.optionsPlaylist = 'old';
      spyOn(component, 'audioIsValid').and.returnValue(false);
      spyOn(component, 'videoIsValid').and.returnValue(false);
      spyOn(component, 'jsonIsValid').and.returnValue(true);
      // @ts-ignore
      spyOn(component.playlistService, 'mergePlaylist');
      component.titleFileInput = '';
      // @ts-ignore
      component.alertService.alertCancel = true;
      component.submit();
      expect(component.acceptedFile).toBeFalsy();
      // @ts-ignore
      expect(component.playlistService.mergePlaylist).not.toHaveBeenCalled();
    });
  });
});
