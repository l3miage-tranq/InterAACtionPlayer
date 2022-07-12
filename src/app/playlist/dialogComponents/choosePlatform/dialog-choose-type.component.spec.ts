import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChooseTypeComponent } from './dialog-choose-type.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

describe('DialogChooseTypeComponent', () => {
  let component: DialogChooseTypeComponent;
  let fixture: ComponentFixture<DialogChooseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChooseTypeComponent, TranslatePipe ],
      imports: [ MatDialogModule, RouterTestingModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChooseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // @ts-ignore
    spyOn(component.router, 'navigate');
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: jasmine.createSpy() };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // added spies on the dialog and router methods and checked if it is getting called or not
  it('goYoutube:: should redirect to youtube', () => {
    component.goYoutube();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
    // @ts-ignore
    expect(component.router.navigate).toHaveBeenCalledWith(['/youtube']);
  });

  // added spies on the dialog and router methods and checked if it is getting called or not
  it('goSpotify:: should redirect to Spotify', () => {
    component.goSpotify();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
    // @ts-ignore
    expect(component.router.navigate).toHaveBeenCalledWith(['/spotify']);
  });

  // added spies on the dialog and router methods and checked if it is getting called or not
  it('goDeezer:: should redirect to Deezer', () => {
    component.goDeezer();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
    // @ts-ignore
    expect(component.router.navigate).toHaveBeenCalledWith(['/deezer']);
  });

  // added spies on the dialog methods and checked if it is getting called or not
  it('goPrefabricatedPlaylist:: should open dialog', () => {
    component.goPrefabricatedPlaylist();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
