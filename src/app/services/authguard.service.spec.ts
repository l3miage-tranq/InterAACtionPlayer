import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthguardService } from './authguard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UsersService } from './users.service';

describe('AuthguardService', () => {
  let service: AuthguardService;
  let userService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatePipe ],
      imports: [ RouterTestingModule, TranslateModule.forRoot() ]
    });
    service = TestBed.inject(AuthguardService);
    userService = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('canAccess:: should init playlist if found login', fakeAsync(() => {
    userService.idUser ='abc';
    userService.typeUser = 'type';
    // @ts-ignore
    spyOn(service.saveService, 'initPlaylist');
    service.canAccess();
    tick(350);
    // @ts-ignore
    expect(service.saveService.initPlaylist).toHaveBeenCalled();
  }));
});
