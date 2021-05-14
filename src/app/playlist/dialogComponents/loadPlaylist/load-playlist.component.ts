import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Import Services
 */
import { PlaylistService } from '../../services/playlist.service';
import { NotifierService } from 'angular-notifier';
import { SaveService } from '../../../services/save.service';
import { TranslateService } from '@ngx-translate/core';

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
              private translate: TranslateService) {
    this.mapPlaylist = playlistService.mapPlaylist;
  }

  ngOnInit(): void {
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
   * @param name
   *
   * Get the element that have the same id as the name send in parameter
   * And hide it
   * Delete the playlist to the mapPlaylist
   * Then update the database
   */
  deletePlaylist(name: string){
    const elem = document.getElementById(name);
    elem.style.display = "none";

    this.playlistService.deleteMapPlaylist(name);
    this.notifier.notify('warning', this.translate.instant('notifier.deletePlaylist'));
    this.saveService.updateMapPlaylist();
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
      this.dialog.closeAll();
      this.notifier.notify('warning', this.translate.instant('notifier.loadPlaylist'));
      this.saveService.updatePlaylist();
    }
  }
}
