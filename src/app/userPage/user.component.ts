import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../playlist/dialogComponents/userForm/user-form.component';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { SaveService } from '../services/save.service';

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
              private saveService: SaveService) {
    this.usersList = this.usersService.listUsers;
  }

  ngOnInit(): void {
    this.theme = this.themeService.theme;
    this.themeService.themeObservable.subscribe(value => {
      this.theme = value;
    });
  }

  goPlaylist(){
      this.router.navigate(['playlist']);
  }

  goDelete(user){
    this.usersList = this.usersService.deleteUser(user);
  }

  addUser(){
    const dialogUser = this.dialog.open(UserFormComponent);
    dialogUser.afterClosed().subscribe(() => {
      this.usersList = this.usersService.listUsers;
    });
  }
}
