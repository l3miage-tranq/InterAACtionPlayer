import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

/**
 * Import Services
 */
import { PlaylistService } from '../../services/playlist.service';
import { NotifierService } from 'angular-notifier';
import { SaveService } from '../../../services/save.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-load-playlist',
  templateUrl: './load-playlist.component.html',
  styleUrls: ['./load-playlist.component.css']
})
export class LoadPlaylistComponent implements OnInit {

  mapPlaylist = new Map();
  getKey = "";
  errorEmptyCheckbox = false;

  constructor(private playlistService: PlaylistService,
              private dialog: MatDialog,
              private notifier: NotifierService,
              private saveService: SaveService,
              private translate: TranslateService,
              private alertService: AlertService) {
    this.mapPlaylist = playlistService.mapPlaylist;
  }

  ngOnInit(): void {
    this.alertService.setDeletePlaylist();
  }

  /**
   * @param name
   *
   * Get the key of the map and set this key in the name variable
   */
  sendKey(name: string){
    this.getKey = name;
  }

  /**
   * Check if the mapPlaylist is empty
   */
  isMapEmpty(){
    return this.mapPlaylist.size == 0;
  }

  /**
   * @param name
   *
   * Get the element that have the same id as the name send in parameter
   * And hide it
   * When the user want to delete the playlist to the mapPlaylist, we display an alert message if the user allows us to do it
   * Then update the database
   */
  deletePlaylist(name: string){
    if (this.alertService.doNotShowAgain){
      const elem = document.getElementById(name);
      elem.style.display = "none";
      this.playlistService.deleteMapPlaylist(name);
      this.notifier.notify('warning', this.translate.instant('notifier.deletePlaylist'));
      this.saveService.updateMapPlaylist();
    }else {
      const alertDialog = this.dialog.open(AlertComponent);
      alertDialog.afterClosed().subscribe(() => {
        if (!this.alertService.alertCancel){
          const elem = document.getElementById(name);
          elem.style.display = "none";

          this.playlistService.deleteMapPlaylist(name);
          this.notifier.notify('warning', this.translate.instant('notifier.deletePlaylist'));
          this.saveService.updateMapPlaylist();
        }
      });
    }
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }

  /**
   * When the user submit :
   * if the user don't check a checkbox -> display an error message
   * else -> change the current playlist with the new and update Playlist
   */
  submit(){
    if (this.getKey == ""){
      this.errorEmptyCheckbox = true;
    }else {
      this.errorEmptyCheckbox = false;
      this.playlistService.playList = this.mapPlaylist.get(this.getKey);
      this.playlistService.nameActualPlaylist = this.getKey;
      this.dialog.closeAll();
      this.notifier.notify('warning', this.translate.instant('notifier.loadPlaylist'));
      this.saveService.updatePlaylist();
    }
  }
}
