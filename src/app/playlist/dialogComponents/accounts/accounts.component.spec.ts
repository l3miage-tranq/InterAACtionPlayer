import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsComponent } from './accounts.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GlobalService } from '../../../../../projects/spotify/src/app/services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import {TranslateModule} from '@ngx-translate/core';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsComponent ],
      imports: [ MatDialogModule, HttpClientModule, NotifierModule, TranslateModule.forRoot() ],
      providers: [ GlobalService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
