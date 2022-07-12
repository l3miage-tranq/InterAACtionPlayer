import { TestBed } from '@angular/core/testing';

import { NewReleasesService } from './new-releases.service';
import { GlobalService } from '../../../services/global.service';
import {HttpClientModule} from '@angular/common/http';

describe('NewReleasesService', () => {
  let service: NewReleasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ NewReleasesService, GlobalService ]
    });
    service = TestBed.inject(NewReleasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
