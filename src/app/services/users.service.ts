import { Injectable } from '@angular/core';

/**
 * Import model
 */
import { Users } from '../models/users-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  typeUser = "";
  idUser = "";
  listUsers: Users[] = [];
  randomId;

  constructor() {
  }

  addUser(name, img){
    let newUser: Users = {
      name: name,
      id: this.getId(),
      thumbnail: img
    }
    this.listUsers.push(newUser);
  }

  deleteUser(user){
    return this.listUsers = this.listUsers.filter(value => value != user);
  }

  getId(){
    do {
      this.randomId = Math.floor(Math.random() * 10000000000).toString() + Date.now().toString();
    } while (this.idAlreadyUse(this.randomId));
    return this.randomId;
  }

  idAlreadyUse(id){
    let find = false;
    this.listUsers.forEach( value => {
      if (value.id == id){
        find = true;
      }
    });
    return find;
  }

  getConfiguration(){
    return {
      'typeUser': this.typeUser,
      'idUser': this.idUser
    }
  }

  setConfiguration(config){
    this.typeUser = config.typeUser;
    this.idUser = config.idUser;
  }
}
