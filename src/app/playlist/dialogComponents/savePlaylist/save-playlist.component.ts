import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Import Services
 */
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { PlaylistService } from '../../services/playlist.service';
import { SaveService } from '../../../services/save.service';

@Component({
  selector: 'app-save-playlist',
  templateUrl: './save-playlist.component.html',
  styleUrls: ['./save-playlist.component.css']
})
export class SavePlaylistComponent implements OnInit {

  name = "";

  constructor(private dialog: MatDialog,
              private notifier: NotifierService,
              private translate: TranslateService,
              private playlistService: PlaylistService,
              private saveService: SaveService) {
  }

  ngOnInit(): void {
  }

  /**
   * @param event
   *
   * Allows to get the value given by the user
   */
  getNamePlaylist(event){
    this.name = event.target.value;
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }

  submit(){
    this.playlistService.addMapPlaylist(this.name);
    this.saveService.updateMapPlaylist();
    this.dialog.closeAll();
    this.notifier.notify('warning', this.translate.instant('notifier.savePlaylist'));
  }
}
