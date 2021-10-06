import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import exportFromJSON from 'export-from-json';

/**
 * Import Components
 */
import { UserFormComponent } from '../playlist/dialogComponents/userForm/user-form.component';
import { DeleteUserComponent } from '../playlist/dialogComponents/deleteUser/delete-user.component';
import { ModifyUserComponent } from '../playlist/dialogComponents/modifyUser/modify-user.component';

/**
 * Import Services
 */
import { ThemeService } from '../services/theme.service';
import { SaveService } from '../services/save.service';
import { DefaultService } from '../services/default.service';
import { UsersService } from '../services/users.service';
import { LanguageService } from '../services/language.service';
import {ImportuserComponent} from "../playlist/dialogComponents/importUser/importuser.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usersList = [];

  theme = "";
  showBtn = false;
  disableEditBtn = "";
  loading = "";

  constructor(private usersService: UsersService,
              private dialog: MatDialog,
              private router: Router,
              private themeService: ThemeService,
              private saveService: SaveService,
              private defaultService: DefaultService,
              private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.notLogging();
    this.theme = this.themeService.theme;
    this.themeService.themeObservable.subscribe(value => {
      this.theme = value;
    });
    setTimeout(() => {
      this.usersList = this.usersService.listUsers;
      this.isListUserEmpty();
    }, 200);
  }

  /**
   * Defined the current user like a guest
   */
  goPlaylistLikeGuest(){
    this.usersService.typeUser = "guest";
    this.usersService.idUser = "guest";
    this.saveService.updateUser();
    this.saveService.updatePlaylist();
    this.saveService.updateSettings();
    this.saveService.updateMapPlaylist();
    this.router.navigate(['playlist']);
  }

  /**
   * Log the user with the account selected
   */
  goPlaylistLikeUser(id){
    this.usersService.typeUser = "user";
    this.usersService.idUser = id;
    this.saveService.updateUser();
    this.router.navigate(['playlist']);
  }

  /**
   * @param user
   *
   * Allows the user to delete an account
   */
  goDelete(user){
    const dialogDeleteUser = this.dialog.open(DeleteUserComponent);
    dialogDeleteUser.afterClosed().subscribe(() => {
      if (this.usersService.wantDeleteUser){
        this.usersService.wantDeleteUser = false;
        this.usersList = this.usersService.deleteUser(user);
        this.saveService.updateListUsers();
        this.saveService.deleteUser(user.id);
        this.isListUserEmpty();
      }
    });
  }

  /**
   * @param user
   * @param index
   *
   * Allows the user to modify his name or image
   */
  goModify(user, index){
    this.usersService.userToModify = user;
    const dialogModifyUser = this.dialog.open(ModifyUserComponent);
    dialogModifyUser.afterClosed().subscribe(() => {
      if (this.usersService.wantModifyUser){
        this.usersService.wantModifyUser = false;
        this.usersList[index] = this.usersService.userToModify;
        this.usersService.listUsers = this.usersList;
        this.saveService.updateListUsers();
      }
    });
  }

  /**
   * Allows the user to import a account
   */
  goImport(){
    const dialogImportUser = this.dialog.open(ImportuserComponent);
    dialogImportUser.afterClosed().subscribe(() => {
      if (this.usersService.wantImportUser){
        this.usersService.wantImportUser = false;
      }
    });
  }

  /**
   * Allows to export the account selected
   */
  goExport(user){
    this.loading = "loading disabled";
    this.saveService.getAllInformationsUser(user.id);
    setTimeout(() => {
      const mapPlaylist = [];
      this.saveService.mapPlaylistUser.forEach((key, value) => {
        mapPlaylist.push(key, value);
      })
      exportFromJSON({
        data: [
          user,
          this.saveService.playlistUser,
          this.saveService.namePlaylistUser,
          this.saveService.themeUser,
          this.saveService.languageUser,
          this.saveService.dwellTimeUser,
          this.saveService.alertMessageUser,
          mapPlaylist
        ],
        extension: "AACPUser",
        fields: {} ,
        fileName: user.name,
        exportType: exportFromJSON.types.json
      });
      this.loading = "";
    }, 1000);
  }

  /**
   * Allows the user to create a new user account
   */
  addUser(){
    const dialogAddUser = this.dialog.open(UserFormComponent);
    dialogAddUser.afterClosed().subscribe(() => {
      this.usersList = this.usersService.listUsers;
      this.saveService.updateListUsers();
      this.addUserInDatabase();
    });
  }

  /**
   * When a new account is created, add him in the database
   */
  addUserInDatabase(){
    this.defaultService.setToDefault();
    this.usersService.idUser = this.usersList[this.usersList.length -1].id;
    this.saveService.updatePlaylist();
    this.saveService.updateSettings();
    this.saveService.updateMapPlaylist();
    this.isListUserEmpty();
  }

  /**
   * Logout a user
   */
  notLogging(){
    this.defaultService.setToDefault();
    this.saveService.updateUser();
  }

  /**
   * @param value
   *
   * Set the theme according with the choice of the user
   */
  setTheme(value){
    this.themeService.emitTheme(value);
  }

  /**
   * @param value
   *
   * Set the language according with the choice of the user
   */
  setLanguage(value){
    this.languageService.switchLanguage(value);
  }

  /**
   * Allows to display or hide buttons Modify and Delete
   */
  goEdit(){
    this.showBtn = !this.showBtn;
  }

  /**
   * Check if user list is empty
   * Then disable the edit button if it's true
   */
  isListUserEmpty(){
    if (this.usersList.length == 0){
      this.disableEditBtn = "disabled";
      this.goEdit();
    }else {
      this.disableEditBtn = "";
    }
  }
}
