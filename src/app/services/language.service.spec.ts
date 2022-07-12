import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';
import { TranslateModule } from '@ngx-translate/core';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot() ]
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('switchLanguage:: should switch language', () => {
    service.switchLanguage('en');
    expect(service.activeLanguage).toEqual('en');
  });

  it('getLanguage:: should return language from href', () => {
    expect(service.getLanguage()).toBeDefined();
  });
});
