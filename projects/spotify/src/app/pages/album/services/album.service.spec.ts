import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { GlobalService } from '../../../services/global.service';
import { HttpClientModule } from '@angular/common/http';

describe('AlbumService', () => {
  let service: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ AlbumService, GlobalService ]
    });
    service = TestBed.inject(AlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
