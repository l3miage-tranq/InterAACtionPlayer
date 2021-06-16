import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../playlist/dialogComponents/userForm/user-form.component';
import { Router } from '@angular/router';

/**
 * Import Services
 */
import { ThemeService } from '../services/theme.service';
import { SaveService } from '../services/save.service';
import { DefaultService } from '../services/default.service';
import { UsersService } from '../services/users.service';
import {DeleteUserComponent} from '../playlist/dialogComponents/deleteUser/delete-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usersList = [];

  theme = "";

  constructor(private usersService: UsersService,
              private dialog: MatDialog,
              private router: Router,
              private themeService: ThemeService,
              private saveService: SaveService,
              private defaultService: DefaultService) {
  }

  ngOnInit(): void {
    this.theme = this.themeService.theme;
    this.notLogging();
    setTimeout(() => {
      this.usersList = this.usersService.listUsers;
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
        this.usersList = this.usersService.deleteUser(user);
        this.saveService.updateListUsers();
        this.saveService.deleteUser(user.id);
      }
    });
  }

  /**
   * Allows the user to create a new user account
   */
  addUser(){
    const dialogUser = this.dialog.open(UserFormComponent);
    dialogUser.afterClosed().subscribe(() => {
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
  }

  /**
   * Logout a user
   */
  notLogging(){
    this.defaultService.setToDefault();
    this.saveService.updateUser();
  }
}
