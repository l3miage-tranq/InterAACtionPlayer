import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyUserComponent } from './modify-user.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { of } from 'rxjs';

describe('ModifyUserComponent', () => {
  let component: ModifyUserComponent;
  let fixture: ComponentFixture<ModifyUserComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyUserComponent ],
      imports: [ MatDialogModule, TranslateModule.forRoot() ],
      providers: [UsersService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyUserComponent);
    component = fixture.componentInstance;
    usersService = TestBed.get(UsersService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('goCancel:: should close all dialogs', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('should set names on init', () => {
    // @ts-ignore
    usersService.userToModify = {name: 'name', thumbnail: 'thumbnail'};
    fixture.detectChanges();
    expect(component.name).toEqual('name');
    expect(component.image).toEqual('thumbnail');
  });

  it('getNewNameUser:: should return name from event', () => {
    component.getNewNameUser({ target: { value: 'abc' }});
    expect(component.name).toEqual('abc');
  });

  it('addFile:: should add file', () => {
    spyOn(window, 'FileReader').and.returnValue({ onload: () => Promise.resolve(), readAsDataURL: () => {} } as any);
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
    component.addNewImage({ target: { files } });
    // @ts-ignore
    window.FileReader().onload();
    expect(component).toBeTruthy();
  });

  it('goChooseNewImg:: should open dialog and choose a image', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
    usersService.imgChoose = 'image';
    component.goChooseNewImg();
    expect(component.image).toEqual('image');
  });

  it('isNameEmpty:: should set name', () => {
    usersService.userToModify = {name: 'name', thumbnail: 'thumbnail'};
    component.isNameEmpty();
    expect(component.name).toEqual('name');
    usersService.userToModify = {name: 'other name', thumbnail: 'thumbnail'};
    component.isNameEmpty();
    expect(component.name).toEqual('name');
  });

  it('submit:: should submit and close all dialogs', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
    usersService.userToModify = {name: 'name', thumbnail: 'thumbnail'};
    component.submit();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });
});
