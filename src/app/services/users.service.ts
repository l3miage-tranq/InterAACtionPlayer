import { Injectable } from '@angular/core';
import * as Ajv from "ajv";

/**
 * Import model
 */
import { Users } from '../models/users-interface';
import { Types } from "../playlist/model/types-interface";

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
  userToModify;
  wantModifyUser = false;
  wantImportUser = false;

  // Schema for json validator
  schemaUser = {
    "type": "array",
    "items": [
      {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "id": {
            "type": "string"
          },
          "thumbnail": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "id",
          "thumbnail"
        ]
      },
      {
        "type": "array",
        "items": [
          {
            "type": "object",
            "properties": {
              "types": {
                "type": "string"
              },
              "id": {
                "type": "string"
              },
              "artists": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "publishedAt": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "thumbnail": {
                "type": "string"
              }
            },
            "required": [
              "types",
              "id",
              "artists",
              "title",
              "publishedAt",
              "description",
              "thumbnail"
            ]
          }
        ]
      },
      {
        "type": "string"
      },
      {
        "type": "string"
      },
      {
        "type": "object",
        "properties": {
          "dwellTime": {
            "type": "boolean"
          },
          "dwellTimeValue": {
            "type": "integer"
          },
          "spinnerDwellTimeOutside": {
            "type": "boolean"
          },
          "diskProgress": {
            "type": "boolean"
          }
        },
        "required": [
          "dwellTime",
          "dwellTimeValue",
          "spinnerDwellTimeOutside",
          "diskProgress"
        ]
      },
      {
        "type": "boolean"
      },
      {
        "type": "array",
        "items": [
          {
            "type": "array",
            "items": [
              {
                "type": "object",
                "properties": {
                  "types": {
                    "type": "string"
                  },
                  "id": {
                    "type": "string"
                  },
                  "artists": {
                    "type": "string"
                  },
                  "title": {
                    "type": "string"
                  },
                  "publishedAt": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "thumbnail": {
                    "type": "string"
                  }
                },
                "required": [
                  "types",
                  "id",
                  "artists",
                  "title",
                  "publishedAt",
                  "description",
                  "thumbnail"
                ]
              }
            ]
          },
          {
            "type": "string"
          }
        ]
      }
    ]
  }

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

  /**
   * @param jsonFile
   *
   * Test the json file send by the user with Ajv (a json validator)
   * He use my schema to check if the json file has the good schema
   */
  checkFileForUser(jsonFile: any){
    const ajv = new Ajv();
    const valid = ajv.validate(this.schemaUser, jsonFile);
    if (valid){
      return true;
    }else {
      console.log(ajv.errorsText(ajv.errors));
      return false;
    }
  }

  userAlreadyInTheList(userId){
    let find = false;
    for (let i = 0; i < this.listUsers.length; i++){
      if (this.listUsers[i].id == userId){
        find = true;
      }
    }
    return find;
  }
}
