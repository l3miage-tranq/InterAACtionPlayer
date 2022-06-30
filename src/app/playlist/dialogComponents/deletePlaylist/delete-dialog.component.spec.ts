import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteDialogComponent } from './delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDialogComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: () => {return { afterClosed: () => of(true) } }} as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goCancel:: should close all dialogs', () => {
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  it('submit:: should update playlist and close with do not show again', () => {
    // @ts-ignore
    component.alertService.doNotShowAgain = true;
    // @ts-ignore
    spyOn(component.saveService, 'updatePlaylist');
    component.submit();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
    // @ts-ignore
    expect(component.saveService.updatePlaylist).toHaveBeenCalled();
  });

  it('submit:: should update playlist and close without do not show again', () => {
    // @ts-ignore
    component.alertService.doNotShowAgain = false;
    // @ts-ignore
    spyOn(component.saveService, 'updatePlaylist');
    component.submit();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
    // @ts-ignore
    expect(component.saveService.updatePlaylist).toHaveBeenCalled();
  });

  it('submit:: should update playlist and close without do not show again and cancel button', () => {
    // @ts-ignore
    component.alertService.doNotShowAgain = false;
    // @ts-ignore
    component.alertService.alertCancel = true;
    // @ts-ignore
    spyOn(component.saveService, 'updatePlaylist');
    component.submit();
    // @ts-ignore
    expect(component.dialog.closeAll).not.toHaveBeenCalled();
    // @ts-ignore
    expect(component.saveService.updatePlaylist).not.toHaveBeenCalled();
  });
});
