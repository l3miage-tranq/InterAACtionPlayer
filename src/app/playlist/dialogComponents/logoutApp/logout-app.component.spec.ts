import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutAppComponent } from './logout-app.component';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
