import { Injectable } from '@angular/core';

/**
 * Import model
 */
import { Users } from '../playlist/model/users-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  listUsers: Users[] = [];

  constructor() {
  }

  addUser(name, img){
    let newUser: Users = {
      name: name,
      id: 'newUser',
      type: 'newUser',
      thumbnail: img
    }
    this.listUsers.push(newUser);
  }

  deleteUser(user){
    return this.listUsers = this.listUsers.filter(value => value != user);
  }
}
