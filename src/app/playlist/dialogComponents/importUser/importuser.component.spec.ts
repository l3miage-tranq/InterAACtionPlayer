import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ImportuserComponent } from './importuser.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NotifierModule} from 'angular-notifier';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {GlobalService} from '../../../../../projects/spotify/src/app/services/global.service';

describe('ImportuserComponent', () => {
  let component: ImportuserComponent;
  let fixture: ComponentFixture<ImportuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportuserComponent ],
      imports: [ MatDialogModule, NotifierModule, RouterTestingModule, TranslateModule.forRoot(), HttpClientModule ],
      providers: [ GlobalService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addFile:: should add file', () => {
    spyOn(window, 'FileReader').and.returnValue({ onload: () => Promise.resolve(), readAsText: () => {} } as any);
    const blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'filename';
    const file = blob as File;
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

  it('jsonIsValid:: should return true if json is valid', () => {
    // @ts-ignore
    component.nameFileUpload = 'pqr.AACPUser';
    // @ts-ignore
    spyOn(component.usersService, 'checkFileForUser').and.returnValue(true);
    // @ts-ignore
    component.fileUpload = '{"abc": "xyz"}';
    expect(component.jsonIsValid()).toBeTruthy();
  });

  it('jsonIsValid:: should return false if json not is valid', () => {
    // @ts-ignore
    component.nameFileUpload = 'pqr.abc';
    // @ts-ignore
    spyOn(component.usersService, 'checkFileForUser').and.returnValue(true);
    // @ts-ignore
    component.fileUpload = '{"abc": "xyz"}';
    expect(component.jsonIsValid()).toBeFalsy();
  });

  it('createMapPlaylist:: should create map list', () => {
    spyOn(component.mapPlaylist, 'set');
    component.createMapPlaylist([{}, {}]);
    expect(component.mapPlaylist.set).toHaveBeenCalled();
  });

  describe('submit', () => {
    beforeEach(() => {
      // @ts-ignore
      component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
      component.fileUser = [[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]];
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
      spyOn(component, 'jsonIsValid').and.returnValue(false);
      component.submit();
      expect(component.acceptedFile).toBeFalsy();
      expect(component.errorWrongFile).toBeTruthy();
    });

    it('should throw error if file is already in playlist', () => {
      // @ts-ignore
      spyOn(component.usersService, 'userAlreadyInTheList').and.returnValue(true);
      // @ts-ignore
      component.fileUpload = true;
      spyOn(component, 'jsonIsValid').and.returnValue(true);
      component.submit();
      expect(component.errorUserAlreadyInPlaylist).toBeTruthy();
    });

    it('should throw error if file is already in playlist', fakeAsync(() => {
      // @ts-ignore
      spyOn(component.usersService, 'userAlreadyInTheList').and.returnValue(false);
      // @ts-ignore
      component.fileUpload = true;
      spyOn(component, 'jsonIsValid').and.returnValue(true);
      component.submit();
      tick(2100);
      expect(component.errorUserAlreadyInPlaylist).toBeFalsy();
      // @ts-ignore
      expect(component.dialog.closeAll).toHaveBeenCalled();
    }));

    it('goCancel:: should close all dialogs', () => {
      component.goCancel();
      // @ts-ignore
      expect(component.dialog.closeAll).toHaveBeenCalled();
    });
  });
});
