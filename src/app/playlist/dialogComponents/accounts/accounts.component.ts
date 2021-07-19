import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../../../../../projects/spotify/src/app/services/global.service';

/**
 * Import functions javascript
 */
declare var loginDeezer: any;
declare var logoutDeezer: any;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private dialog: MatDialog, private globalService: GlobalService) {
  }

  ngOnInit(): void {
  }

  /**
   * Allows the user to login Spotify
   */
  loginSpotify(){
    this.globalService.getLoginAccountSpotify();
  }

  /**
   * Allows the user to logout Spotify
   */
  logoutSpotify(){

  }

  /**
   * Allows the user to login Deezer
   */
  loginDeezer(){
    loginDeezer();
  }

  /**
   * Allows the user to logout Deezer
   */
  logoutDeezer(){
    logoutDeezer();
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }
}
