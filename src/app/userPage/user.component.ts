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
    setTimeout(() => {
      this.usersList = this.usersService.listUsers;
    }, 200);
  }

  goPlaylistLikeGuest(){
    this.usersService.typeUser = "guest";
    this.usersService.idUser = "guest";
    this.saveService.updateUser();
    this.defaultService.setToDefault();
    this.saveService.updatePlaylist();
    this.saveService.updateSettings();
    this.saveService.updateMapPlaylist();
    this.router.navigate(['playlist']);
  }

  goPlaylistLikeUser(id){
    this.usersService.typeUser = "user";
    this.usersService.idUser = id;
    this.saveService.updateUser();
    this.saveService.initPlaylist(id);
    this.router.navigate(['playlist']);
  }

  goDelete(user){
    this.usersList = this.usersService.deleteUser(user);
    this.saveService.updateListUsers();
    this.saveService.deleteUser(user.id);
  }

  addUser(){
    const dialogUser = this.dialog.open(UserFormComponent);
    dialogUser.afterClosed().subscribe(() => {
      this.usersList = this.usersService.listUsers;
      this.saveService.updateListUsers();
      this.addUserInDatabase();
    });
  }

  addUserInDatabase(){
    this.defaultService.setToDefault();
    this.usersService.idUser = this.usersList[this.usersList.length -1].id;
    this.saveService.updatePlaylist();
    this.saveService.updateSettings();
    this.saveService.updateMapPlaylist();
  }
}
