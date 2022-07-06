import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrefabricatedPlaylistComponent } from './prefabricated-playlist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import {TranslateModule} from '@ngx-translate/core';

describe('PrefabricatedPlaylistComponent', () => {
  let component: PrefabricatedPlaylistComponent;
  let fixture: ComponentFixture<PrefabricatedPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefabricatedPlaylistComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabricatedPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit:: should submit and close all dialogs', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
    component.submit();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('goCancel:: should close all dialogs', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('choicePrefabricatedPlaylist:: should set file name with extension', () => {
    component.choicePrefabricatedPlaylist('abc');
    expect(component.namePrefabricatedPlaylist).toEqual('abc.json');
  });
});
