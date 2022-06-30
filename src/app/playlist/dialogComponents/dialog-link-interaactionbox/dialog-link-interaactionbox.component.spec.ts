import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLinkInteraactionboxComponent } from './dialog-link-interaactionbox.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SpeedTestModule} from 'ng-speed-test';

describe('DialogLinkInteraactionboxComponent', () => {
  let component: DialogLinkInteraactionboxComponent;
  let fixture: ComponentFixture<DialogLinkInteraactionboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLinkInteraactionboxComponent ],
      imports: [RouterTestingModule, TranslateModule.forRoot(), SpeedTestModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLinkInteraactionboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
