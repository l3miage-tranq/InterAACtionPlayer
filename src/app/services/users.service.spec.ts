import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addUser:: should push user to listUsers', () => {
    spyOn(service.listUsers, 'push');
    service.addUser({});
    expect(service.listUsers.push).toHaveBeenCalled();
  });

  it('deleteUser:: should filter users', () => {
    service.listUsers = [{id: 1}, {id: 2}] as any;
    service.deleteUser({id: 1});
    expect(service.listUsers.length).toEqual(2);
  });

  it('idAlreadyUse:: should return boolean based on id already exists or not', () => {
    service.listUsers = [{id: 1}, {id: 2}] as any;
    expect(service.idAlreadyUse(1)).toBeTruthy();
    expect(service.idAlreadyUse(3)).toBeFalsy();
  });

  it('userAlreadyInTheList:: should return boolean based on id already exists or not', () => {
    service.listUsers = [{id: 1}, {id: 2}] as any;
    expect(service.userAlreadyInTheList(1)).toBeTruthy();
    expect(service.userAlreadyInTheList(3)).toBeFalsy();
  });
});
