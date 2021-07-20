import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../../../../../projects/spotify/src/app/services/global.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private dialog: MatDialog,
              private globalService: GlobalService,
              private notifier: NotifierService,
              private translate: TranslateService) {
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
    const url = 'https://accounts.spotify.com/en/logout';
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40');
    setTimeout(() => {
      spotifyLogoutWindow.close();
      this.notifier.notify('warning',this.translate.instant('notifier.logoutSpotify'));
    }, 2000);
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
    this.notifier.notify('warning',this.translate.instant('notifier.logoutDeezer'));
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }
}
