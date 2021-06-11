import { Injectable } from '@angular/core';

/**
 * Import model
 */
import { Users } from '../playlist/model/users-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  btnAddUser: Users = {
    name: 'new user',
    id: 'btnAdd',
    type: 'btnAdd',
    thumbnail: './assets/Add.png'
  }
  listUsers: Users[] = [this.btnAddUser];

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
}
