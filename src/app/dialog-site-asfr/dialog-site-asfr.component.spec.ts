import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSiteASFRComponent } from './dialog-site-asfr.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SpeedTestModule} from "ng-speed-test";

describe('DialogSiteASFRComponent', () => {
  let component: DialogSiteASFRComponent;
  let fixture: ComponentFixture<DialogSiteASFRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSiteASFRComponent ],
      imports : [RouterTestingModule, TranslateModule.forRoot(), SpeedTestModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSiteASFRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
