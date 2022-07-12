import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../services/theme.service';
import { of } from 'rxjs';

class MockThemeService {
  theme;
  get themeObservable() {
    return of('inverted');
  }
  emitTheme(val) {
    return val;
  }
}
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let exportFromJSON;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ MatDialogModule, RouterTestingModule.withRoutes([
        { path: 'playlist', component: UserComponent }
      ]), TranslateModule.forRoot() ],
      providers: [
        { provide: ThemeService, useClass: MockThemeService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    exportFromJSON = jasmine.createSpy();
  });

  it('should create', fakeAsync(() => {
    // @ts-ignore
    component.usersService.listUsers = [];
    fixture.detectChanges();
    tick(300);
    expect(component).toBeTruthy();
  }));

  it('goPlaylistLikeGuest:: should update user service and redirect to playlist page', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updateUser');
    // @ts-ignore
    spyOn(component.saveService, 'updatePlaylist');
    // @ts-ignore
    spyOn(component.saveService, 'updateMapPlaylist');
    // @ts-ignore
    spyOn(component.router, 'navigate');
    component.goPlaylistLikeGuest();
    // @ts-ignore
    expect(component.saveService.updateUser).toHaveBeenCalled();
    // @ts-ignore
    expect(component.saveService.updatePlaylist).toHaveBeenCalled();
    // @ts-ignore
    expect(component.saveService.updateMapPlaylist).toHaveBeenCalled();
    // @ts-ignore
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('goPlaylistLikeUser:: should update user service and redirect to playlist page', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updateUser');
    // @ts-ignore
    spyOn(component.router, 'navigate');
    component.goPlaylistLikeUser(1);
    // @ts-ignore
    expect(component.saveService.updateUser).toHaveBeenCalled();
    // @ts-ignore
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('goDelete:: should not delete user from service if user cancel dialog', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updateListUsers');
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    // @ts-ignore
    component.usersService ={wantDeleteUser: false, deleteUser: () => []};
    component.goDelete({ id: 1 });
    // @ts-ignore
    expect(component.saveService.updateListUsers).not.toHaveBeenCalled();
  });

  it('goDelete:: should delete user from service', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updateListUsers');
    // @ts-ignore
    component.usersService = {wantDeleteUser: true, deleteUser: () => []};
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.goDelete({ id: 1 });
    // @ts-ignore
    expect(component.saveService.updateListUsers).toHaveBeenCalled();
  });

  it('goModify:: should not modify user from service if user cancel dialog', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updateListUsers');
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    // @ts-ignore
    component.usersService ={wantModifyUser: false, deleteUser: () => []};
    component.goModify({ id: 1 }, 0);
    // @ts-ignore
    expect(component.saveService.updateListUsers).not.toHaveBeenCalled();
  });

  it('goModify:: should modify user from service', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updateListUsers');
    // @ts-ignore
    component.usersService = {wantModifyUser: true, deleteUser: () => {}, userToModify: []};
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.goModify({ id: 1 }, 0);
    // @ts-ignore
    expect(component.saveService.updateListUsers).toHaveBeenCalled();
  });

  it('goImport:: should not import user from service if user cancel dialog', () => {
    // @ts-ignore
    component.usersService = {wantImportUser: true, deleteUser: () => {}, userToModify: []};
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.goImport();
    // @ts-ignore
    expect(component.usersService.wantImportUser).toBeFalsy();
  });

  it('goImport:: should import user from service', () => {
    // @ts-ignore
    component.usersService = {wantImportUser: false, deleteUser: () => {}, userToModify: []};
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.goImport();
    // @ts-ignore
    expect(component.usersService.wantImportUser).toBeFalsy();
  });

  it('goExport:: should export data', fakeAsync(() => {
    // @ts-ignore
    component.saveService = {
      mapPlaylistUser: [{ id: 1 }, { id: 2, name: 'abc' }], 
      getAllInformationsUser: () => {},
      playlistUser: '',
      namePlaylistUser: '',
      themeUser: '',
      languageUser: '',
      dwellTimeUser: '',
      alertMessageUser: ''
    } as any;
    component.goExport({ id: 1 });
    expect(component.loading).toEqual('loading disabled');
    tick(1100);
    expect(component.loading).toEqual('');
  }));

  it('addUser:: should add user to service', () => {
    // @ts-ignore
    spyOn(component.saveService, 'updateListUsers');
    // @ts-ignore
    component.usersService = {listUsers: [{ id: 1 }], deleteUser: () => {}, idUser: 1};
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
    component.addUser();
    // @ts-ignore
    expect(component.saveService.updateListUsers).toHaveBeenCalled();
  });

  it('setTheme:: should set theme to service', () => {
    // @ts-ignore
    spyOn(component.themeService, 'emitTheme');
    component.setTheme('theme');
    // @ts-ignore
    expect(component.themeService.emitTheme).toHaveBeenCalled();
  });

  it('setLanguage:: should set language to service', () => {
    // @ts-ignore
    spyOn(component.languageService, 'switchLanguage');
    component.setLanguage('language');
    // @ts-ignore
    expect(component.languageService.switchLanguage).toHaveBeenCalled();
  });
});
