import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {MatDialog} from '@angular/material/dialog';
import { UserFormComponent } from '../playlist/dialogComponents/userForm/user-form.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usersList = [];

  constructor(private usersService: UsersService,
              private dialog: MatDialog,
              private router: Router) {
    this.usersList = this.usersService.listUsers;
  }

  ngOnInit(): void {
  }

  goPlaylist(type){
    if (type == 'btnAdd'){
      this.addUser();
    }else {
      this.router.navigate(['playlist']);
    }
  }

  goDelete(){

  }

  addUser(){
    const dialogUser = this.dialog.open(UserFormComponent);
    dialogUser.afterClosed().subscribe(() => {
      this.usersList = this.usersService.listUsers;
    });
  }
}
