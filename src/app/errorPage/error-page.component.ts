import { Component, OnInit } from '@angular/core';
import { LogoutAppComponent } from "../playlist/dialogComponents/logoutApp/logout-app.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LanguageService } from "../services/language.service";
import { StatusInternetService } from "../services/status-internet.service";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  noInternet = true;
  playlistButton = "error.goOfflinePlaylist";

  constructor(private dialog: MatDialog,
              private router: Router,
              private languageService: LanguageService,
              private statusInternetService: StatusInternetService) {
  }

  ngOnInit(): void {
  }

  checkInternetConnexion(){
    if (this.statusInternetService.getStatusInternet()){
      this.noInternet = false;
      this.playlistButton = "error.goPlaylist";
    }else {
      this.playlistButton = "error.goOfflinePlaylist";
    }
  }

  exitApp(){
    this.dialog.open(LogoutAppComponent);
  }

  goPlaylist(){
    this.router.navigate([this.languageService.activeLanguage + '/playlist']);
  }
}
