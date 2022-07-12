import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material/dialog';

/**
 * Import Services
 */
import { PlaylistService } from '../../services/playlist.service';
import { NotifierService } from 'angular-notifier';
import { SaveService } from '../../../services/save.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-prefabricated-playlist',
  templateUrl: './prefabricated-playlist.component.html',
  styleUrls: ['./prefabricated-playlist.component.css']
})
export class PrefabricatedPlaylistComponent implements OnInit {

  fileExtension = ".json";
  namePrefabricatedPlaylist = "PeppaPig" + this.fileExtension;

  constructor(private playlistService: PlaylistService,
              private dialog: MatDialog,
              private notifier: NotifierService,
              private saveService: SaveService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  /**
   * @param choice
   *
   * Get the choice of the user
   */
  choicePrefabricatedPlaylist(choice: string){
    this.namePrefabricatedPlaylist = choice + this.fileExtension;
  }

  /**
   * @param nameFile
   *
   * Allows to search the correct json file matching with the nameFile value in parameter
   * Then add the value in json in the Playlist
   */
  goLoad(nameFile: string){
    this.playlistService.playList = (function() {
      let json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': '../../../../assets/PrefrabricatedPlaylist/' + nameFile,
        'dataType': "json",
        'success': function(data) {
          json = data;
        }
      });
      return json;
    })();
  }

  /**
   * If the user cancel the prefabricatedPlaylist
   * Then close the prefabricatedPlaylist
   */
  goCancel(){
    this.dialog.closeAll();
  }

  /**
   * Load the json file choice by the user
   * Then close dialog and send a notification
   * And save the new Playlist in the database
   */
  submit(){
    this.goLoad(this.namePrefabricatedPlaylist);
    this.dialog.closeAll();
    this.notifier.notify('warning', this.translate.instant('notifier.prefabricatedPlaylist'));
    this.saveService.updatePlaylist();
  }
}
