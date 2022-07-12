import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginNotificationService } from './login-notification.service';

declare var initDeezer: any;
declare var initStatusDeezer: any;
declare var getStatusDeezer: any;

describe('LoginNotificationService', () => {
  let service: LoginNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginNotificationService);
    initDeezer = jasmine.createSpy();
    initStatusDeezer = jasmine.createSpy();
    getStatusDeezer = jasmine.createSpy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('getStatusDeezer:: should get deezer status', fakeAsync(() => {
    service.getStatusDeezer();
    spyOn(service, 'getStatusDeezer');
    tick(1100);
    expect(initDeezer).toHaveBeenCalled();
    expect(initStatusDeezer).toHaveBeenCalled();
    expect(service.getStatusDeezer).toHaveBeenCalled();
  }));

  it('getStatusDeezer:: should get deezer status', fakeAsync(() => {
    service.getStatusDeezer();
    spyOn(service, 'getStatusDeezer');
    service.statusDeezer = 'connected';
    tick(1100);
    expect(initDeezer).toHaveBeenCalled();
    expect(initStatusDeezer).toHaveBeenCalled();
    expect(service.getStatusDeezer).not.toHaveBeenCalled();
    expect(service.logOnDeezer).toBeTruthy();
  }));

  it('updateStatusDeezer:: should set false to log on deezer if not connected', () => {
    service.updateStatusDeezer();
    expect(service.logOnDeezer).toBeFalsy();
  });

  it('updateStatusDeezer:: should not set anything if no status is set', () => {
    service.statusDeezer = 'notConnected';
    service.updateStatusDeezer();
    expect(service.logOnDeezer).toBeFalsy();
  });
});
