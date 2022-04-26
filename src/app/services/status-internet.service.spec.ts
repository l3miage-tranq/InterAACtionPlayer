import { TestBed } from '@angular/core/testing';

import { StatusInternetService } from './status-internet.service';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';

describe('StatusInternetService', () => {
  let service: StatusInternetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, TranslateModule.forRoot()]
    });
    service = TestBed.inject(StatusInternetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
