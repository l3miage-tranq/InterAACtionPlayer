import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('emitTheme:: should emit new theme to subject', () => {
    spyOn(service.themeObservable, 'next');
    service.emitTheme('light');
    expect(service.themeObservable.next).toHaveBeenCalledOnceWith('light');
  });
});
