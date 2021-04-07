import { TestBed } from '@angular/core/testing';

import { DwelltimeService } from './dwelltime.service';

describe('DwelltimeService', () => {
  let service: DwelltimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DwelltimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
