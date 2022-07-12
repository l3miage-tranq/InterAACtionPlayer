import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyRedirectComponent } from './spotify-redirect.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NotifierModule} from "angular-notifier";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {GlobalService} from "../../../projects/spotify/src/app/services/global.service";
import { LoginNotificationService } from '../playlist/services/login-notification.service';

describe('SpotifyRedirectComponent', () => {
  let component: SpotifyRedirectComponent;
  let fixture: ComponentFixture<SpotifyRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyRedirectComponent ],
      imports: [ MatDialogModule, NotifierModule, RouterTestingModule.withRoutes([
        { path: 'playlist', component: SpotifyRedirectComponent  }
      ]), TranslateModule.forRoot(), HttpClientModule ],
      providers: [ GlobalService, LoginNotificationService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
