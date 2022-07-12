import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DeleteUserComponent } from './delete-user.component';
import { NotifierModule } from 'angular-notifier';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserComponent ],
      imports: [ MatDialogModule, NotifierModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    component.dialog = { closeAll: jasmine.createSpy(), open: jasmine.createSpy() };
  });

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    tick(3500);
    expect(component).toBeTruthy();
  }));

  // added spies on the dialog methods and checked if it is getting called or not
  it('goCancel:: should close all dialog', () => {
    component.goCancel();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });

  // added spies on the dialog methods and checked if it is getting called or not
  it('submit:: should submit close all dialog', () => {
    component.submit();
    // @ts-ignore
    expect(component.dialog.closeAll).toHaveBeenCalled();
  });
});
