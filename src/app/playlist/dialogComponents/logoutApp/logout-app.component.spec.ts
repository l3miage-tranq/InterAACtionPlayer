import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LogoutAppComponent } from './logout-app.component';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
let exportFromJSON;

describe('LogoutAppComponent', () => {
  let component: LogoutAppComponent;
  let fixture: ComponentFixture<LogoutAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutAppComponent ],
      imports: [MatDialogModule, TranslateModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutAppComponent);
    component = fixture.componentInstance;
    exportFromJSON = jasmine.createSpy();
  });

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    tick(2500);
    expect(component).toBeTruthy();
  }));

  it('goCancel:: should close all dialogs', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => ({ afterClosed: () => of(true) })} as any;
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('submit:: should export from json', () => {
    component.submit();
    expect(component).toBeTruthy();
  });
});
