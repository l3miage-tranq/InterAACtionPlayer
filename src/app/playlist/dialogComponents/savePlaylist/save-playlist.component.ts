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
  errorNameAlreadyUse = false;
  errorNameEmpty = false;

  constructor(private dialog: MatDialog,
              private notifier: NotifierService,
              private translate: TranslateService,
              private playlistService: PlaylistService,
              private saveService: SaveService) {
  }

  ngOnInit(): void {
    this.saveKnowPlaylist();
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

  /**
   * When the user submit :
   *  - We check if the name is not empty :
   *    - True -> display error message;
   *    - False -> we check if the name is not already use:
   *      - True -> display error message;
   *      - False -> we add the current playlist in the mapPlaylist with the correspondind name
   *      Then we update the database and close the dialog component
   */
  submit(){
    if (this.name != ""){
      this.errorNameEmpty = false;
      if (!this.playlistService.playlistNameAlreadyInMap(this.name)){
        this.errorNameAlreadyUse = false;
        this.playlistService.addMapPlaylist(this.name);
        this.saveService.updateMapPlaylist();
        this.dialog.closeAll();
        this.notifier.notify('warning', this.translate.instant('notifier.savePlaylist'));
      }else{
        this.errorNameAlreadyUse = true;
      }
    }else {
      this.errorNameEmpty = true;
    }
  }

  saveKnowPlaylist(){
    if (this.playlistService.nameActualPlaylist != "" && this.playlistService.playlistNameAlreadyInMap(this.playlistService.nameActualPlaylist)){
      this.playlistService.addMapPlaylist(this.playlistService.nameActualPlaylist);
      this.saveService.updateMapPlaylist();
      this.dialog.closeAll();
      this.notifier.notify('warning', this.translate.instant('notifier.savePlaylist'));
    }
  }
}
