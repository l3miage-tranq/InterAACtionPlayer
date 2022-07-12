import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { SaveService } from './save.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService{

  constructor(private usersService: UsersService,
              private router: Router,
              private saveService: SaveService) {
  }

  /**
   * Check if the user is logged, else we return the user on the user page
   */
  canAccess(){
    this.saveService.getUser();
    setTimeout(() => {
      if (this.usersService.idUser != "" && this.usersService.typeUser != ""){
        this.saveService.initPlaylist(this.usersService.idUser);
      } else {
        this.router.navigate(['user']);
      }
    },300);
  }
}
