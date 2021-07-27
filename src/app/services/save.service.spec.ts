import { TestBed } from '@angular/core/testing';

import { SaveService } from './save.service';
import { TranslateModule } from '@ngx-translate/core';

describe('SaveService', () => {
  let service: SaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot() ]
    });
    service = TestBed.inject(SaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
