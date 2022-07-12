import { Injectable } from '@angular/core';

/**
 * Import Services
 */
import { DwelltimeService } from './dwelltime.service';
import { LanguageService } from './language.service';
import { ThemeService } from './theme.service';
import { AlertService } from '../playlist/services/alert.service';
import { PlaylistService } from '../playlist/services/playlist.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  VERSION = "InteraactionPlayer v.2022.05.03";

  constructor(private dwellTimeService: DwelltimeService,
              private languageService: LanguageService,
              private themeService: ThemeService,
              private alertService: AlertService,
              private playlistService: PlaylistService,
              private usersService: UsersService) {
  }

  setToDefault(){
    this.dwellTimeService.dwellTime = false;
    this.dwellTimeService.dwellTimeValue = 1000;
    this.dwellTimeService.dwellTimeSpinnerOutsideBtn = true;
    this.dwellTimeService.diskProgress = true;
    this.alertService.doNotShowAgain = false;
    this.playlistService.playList = [];
    this.playlistService.mapPlaylist = new Map();
    this.usersService.typeUser = "";
    this.usersService.idUser = "";
  }
}
