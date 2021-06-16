import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private usersService: UsersService,
              private router: Router) {
  }

  /**
   * @param route
   * @param state
   *
   * Check if the user is logged, else we return the user on the user page
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.usersService.idUser != "" && this.usersService.typeUser != ""){
      return true;
    } else {
      this.router.navigate(['user']);
    }
  }
}
