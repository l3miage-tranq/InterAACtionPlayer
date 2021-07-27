import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { GlobalService } from '../../../services/global.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ SearchService, GlobalService ]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
