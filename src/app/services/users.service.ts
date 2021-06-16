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
  imgChoose;
  wantDeleteUser = false;

  constructor() {
  }

  /**
   * @param name
   *
   * Add the new user in the user list
   */
  addUser(name){
    let newUser: Users = {
      name: name,
      id: this.getId(),
      thumbnail: this.imgChoose
    }
    this.listUsers.push(newUser);
  }

  /**
   * @param user
   *
   * Delete the user choice from the user list
   */
  deleteUser(user){
    return this.listUsers = this.listUsers.filter(value => value != user);
  }

  /**
   * Generate a random id
   * while the id generated is already use, we generate a new id
   */
  getId(){
    do {
      this.randomId = Math.floor(Math.random() * 10000000000).toString() + Date.now().toString();
    } while (this.idAlreadyUse(this.randomId));
    return this.randomId;
  }

  /**
   * @param id
   *
   * Check if the id is already use
   */
  idAlreadyUse(id){
    let find = false;
    this.listUsers.forEach( value => {
      if (value.id == id){
        find = true;
      }
    });
    return find;
  }

  /**
   * Return the actual configuration
   */
  getConfiguration(){
    return {
      'typeUser': this.typeUser,
      'idUser': this.idUser
    }
  }

  /**
   * @param config
   *
   * Update the variables with the new values
   */
  setConfiguration(config){
    this.typeUser = config.typeUser;
    this.idUser = config.idUser;
  }
}
