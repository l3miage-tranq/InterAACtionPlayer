import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportuserComponent } from './importuser.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NotifierModule} from "angular-notifier";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {GlobalService} from "../../../../../projects/spotify/src/app/services/global.service";

describe('ImportuserComponent', () => {
  let component: ImportuserComponent;
  let fixture: ComponentFixture<ImportuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportuserComponent ],
      imports: [ MatDialogModule, NotifierModule, RouterTestingModule, TranslateModule.forRoot(), HttpClientModule ],
      providers: [ GlobalService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
