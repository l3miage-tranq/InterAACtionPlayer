import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/**
 * Import Services
 */
import { NotifierService } from 'angular-notifier';
import { PlaylistService } from '../../../../../../../src/app/playlist/services/playlist.service';
import { SaveService } from '../../../../../../../src/app/services/save.service';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  theme = "";
  tracks;
  album;

  constructor(
    private location: Location,
    private notifier: NotifierService,
    private playlistService: PlaylistService,
    private saveService: SaveService,
    private themeService: ThemeService,
    private translate: TranslateService,
    private globalService: GlobalService,
    private domSanitizer: DomSanitizer
  ) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
    this.album = this.globalService.albumChoose;
    this.getTracksAlbum();
  }

  getTracksAlbum(){
    this.globalService.getTracksAlbum(this.globalService.albumChoose.id).subscribe(results => {
      this.tracks = results;
    });
  }

  addToPlaylist(){

  }

  addAllToPlaylist(){

  }

  deleteToPlaylist(){

  }

  deleteAllToPlaylist(){

  }

  songAlreadyAddToPlaylist(){
    return false;
  }

  getSrc(id){
    return this.domSanitizer.bypassSecurityTrustResourceUrl("https://widget.deezer.com/widget/dark/track/" + id);
  }

  /**
   * Go back to the previous URL
   */
  public goBack(): void {
    this.location.back();
  }
}
