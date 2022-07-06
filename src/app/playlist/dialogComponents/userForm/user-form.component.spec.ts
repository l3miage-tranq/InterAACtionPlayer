import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports: [ MatDialogModule, TranslateModule.forRoot() ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goCancel:: should close all dialogs', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('getNameUser:: should return name from event', () => {
    component.getNameUser({ target: { value: 'abc' } });
    expect(component.name).toEqual('abc');
  });

  it('addImage:: should add file', () => {
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
    component.addImage({ target: { files } });
    // @ts-ignore
    window.FileReader().onload();
    expect(component.showImgChoose).toBeTruthy();
  });

  it('goChooseImg:: should open dialog', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
    component.goChooseImg();
    expect(component.showImgChoose).toBeFalsy();
  });

  it('goChooseImg:: should open dialog and choose image', () => {
    // @ts-ignore
    component.usersService.imgChoose = true;
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
    component.goChooseImg();
    expect(component.showImgChoose).toBeTruthy();
  });

  it('submit:: should show name empty error', () => {
    component.name = '';
    component.submit();
    expect(component.errorNameEmpty).toBeTruthy();
  });

  it('submit:: should show image empty error', () => {
    component.name = 'abc';
    component.image = null;
    component.submit();
    expect(component.errorImgEmpty).toBeTruthy();
  });

  it('submit:: should submit user form', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
    component.name = 'abc';
    component.image = 'img';
    component.submit();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });
});
