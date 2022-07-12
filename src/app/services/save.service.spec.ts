import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SaveService } from './save.service';
import { TranslateModule } from '@ngx-translate/core';
import { DwelltimeService } from './dwelltime.service';

describe('SaveService', () => {
  let service: SaveService;

  beforeEach(() => {
    const dwellServiceSpy = jasmine.createSpyObj('DwelltimeService', ['getConfiguration', 'setConfiguration']);
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot() ],
      providers: [{ provide: DwelltimeService, useValue: dwellServiceSpy }]
    });
    service = TestBed.inject(SaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('init:: should init all index db', () => {
    service.init();
    service.openRequest.onupgradeneeded({
      target: { result: { objectStoreNames: { contains: () => false }, createObjectStore: () => {} }, 
      transaction: { objectStore: () => {return { add: () => {} };} }}
    })
    expect(service).toBeTruthy();
  });

  it('init:: should init all index db', () => {
    service.init();
    service.openRequest.onupgradeneeded({
      target: { result: { objectStoreNames: { contains: () => true }, createObjectStore: () => {} }, 
      transaction: { objectStore: () => {return { add: () => {} };} }}
    })
    expect(service).toBeTruthy();
  });

  it('initPlaylist:: should init playlist db', () => {
    spyOn(window, 'alert');
    service.initPlaylist(1);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  });

  it('initPlaylistAFSR:: should init PlaylistAFSR db', () => {
    spyOn(window, 'alert');
    service.initPlaylistAFSR();
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  });

  it('updatePlaylist:: should update Playlist db', fakeAsync(() => {
    spyOn(window, 'alert');
    spyOn(service, 'updatePlaylistName');
    service.updatePlaylist();
    tick(10);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  }));

  it('updatePlaylistName:: should update Playlist db', fakeAsync(() => {
    spyOn(window, 'alert');
    service.updatePlaylistName();
    tick(10);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  }));

  it('updateSettings:: should update settings db', fakeAsync(() => {
    spyOn(window, 'alert');
    service.updateSettings();
    tick(10);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  }));

  it('updateSettingsAFSR:: should update settingsAFSR db', fakeAsync(() => {
    spyOn(window, 'alert');
    service.updateSettingsAFSR();
    tick(10);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  }));

  it('updateMapPlaylist:: should update playlist db', fakeAsync(() => {
    spyOn(window, 'alert');
    service.updateMapPlaylist();
    tick(10);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  }));

  it('updateUser:: should update user db', fakeAsync(() => {
    spyOn(window, 'alert');
    service.updateUser();
    tick(10);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  }));

  it('updateListUsers:: should update user db', fakeAsync(() => {
    spyOn(window, 'alert');
    service.updateListUsers();
    tick(10);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  }));

  it('deleteUser:: should update user db', fakeAsync(() => {
    spyOn(window, 'alert');
    service.deleteUser('');
    tick(10);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  }));

  it('getUser:: should return user db', fakeAsync(() => {
    spyOn(window, 'alert');
    service.getUser();
    tick(10);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  }));

  it('getAllInformationsUser:: should return user info db', fakeAsync(() => {
    spyOn(window, 'alert');
    service.getAllInformationsUser(1);
    tick(10);
    service.openRequest.onerror({target: {errorCode: 1}});
    expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  }));

  // it('addImportUser:: should add user info to db', fakeAsync(() => {
  //   spyOn(window, 'alert');
  //   service.addImportUser({}, {}, {}, {}, {}, {}, {}, {});
  //   tick(10);
  //   service.openRequest.onerror({target: {errorCode: 1}});
  //   expect(window.alert).toHaveBeenCalledWith('Database error: 1');
  // }));
});
