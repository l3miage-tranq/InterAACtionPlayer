import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Import functions javascript
 */
declare var loginDeezer: any;
declare var logoutDeezer: any;
declare var getLoginStatus: any;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  nameBtnDeezer : string;
  checkDeezer : string;
  connectedOnDeezer : boolean;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.checkStatusDeezer();
  }

  logSpotify(){

  }

  /**
   * Allows the user to login or logout Deezer
   */
  logDeezer(){
    if (this.connectedOnDeezer){
      logoutDeezer();
      this.checkStatusDeezer();
    }else {
      loginDeezer();
      this.checkStatusDeezer();
    }
  }

  /**
   * Allows to know if the user is connected or not
   */
  checkStatusDeezer(){
    if (getLoginStatus() == ("notConnected" || "unknown" || "not_authorized")){
      this.connectedOnDeezer = false;
      this.checkDeezer = "red times icon";
      this.nameBtnDeezer = "Login Deezer";
    }else{
      this.connectedOnDeezer = true;
      this.checkDeezer = "green check icon";
      this.nameBtnDeezer = "Logout Deezer";
    }
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }
}
