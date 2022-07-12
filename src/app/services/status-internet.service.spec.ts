import { TestBed } from '@angular/core/testing';

import { StatusInternetService } from './status-internet.service';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SpeedTestModule} from "ng-speed-test";
import { PlaylistComponent } from '../playlist/playlist.component';

describe('StatusInternetService', () => {
  let service: StatusInternetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([
        {path: 'nt/error', component: PlaylistComponent}
      ]), TranslateModule.forRoot(), SpeedTestModule]
    });
    service = TestBed.inject(StatusInternetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checkStatusInternet:: should redirect to error page if no internet', () => {
    service.statusInternet = false;
    service.checkStatusInternet();
  });

  it('getStatusInternet:: should return internet status', () => {
    expect(service.getStatusInternet()).toEqual(service.statusInternet);
  });
});
