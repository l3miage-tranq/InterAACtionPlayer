import { TestBed } from '@angular/core/testing';

import { ArtistService } from './artist.service';
import { GlobalService } from '../../../services/global.service';
import { HttpClientModule } from '@angular/common/http';

describe('ArtistService', () => {
  let service: ArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ ArtistService, GlobalService ]
    });
    service = TestBed.inject(ArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
