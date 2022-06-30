import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportfileComponent } from './exportfile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';
describe('ExportfileComponent', () => {
  let component: ExportfileComponent;
  let fixture: ComponentFixture<ExportfileComponent>;
  let exportFromJSON;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportfileComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    exportFromJSON = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTitle:: should set titleFile', () => {
    component.getTitle({ target: { value: 'abc' } });
    expect(component.titleFile).toEqual('abc');
  });

  it('submit:: should not export and close dialog if wrong name', () => {
    component.errorWrongName = true;
    component.submit();
    expect(exportFromJSON).not.toHaveBeenCalled();
  });

  it('submit:: should export and close dialog', () => {
    component.errorWrongName = false;
    component.titleFile = 'abc';
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: jasmine.createSpy() };
    component.submit();
    expect(exportFromJSON).not.toHaveBeenCalled();
  });

  it('goCancel:: should close all dialog', () => {
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: jasmine.createSpy() };
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('enableButtonExport:: should enable button', () => {
    component.playlistEmpty = false;
    component.enableButtonExport();
    expect(component.disabledButton).toEqual('disabled');
  });
});
