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
import {APIAlbums, Item} from '../../../../../../spotify/src/app/pages/album/models/album-model';

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

  /**
   * Get all the track of the album
   */
  getTracksAlbum(){
    this.globalService.getTracksAlbum(this.globalService.albumChoose.id).subscribe(results => {
      this.tracks = results;
    });
  }

  /**
   * @param track -> music selected by the user
   *
   * Add the music selected by the user in the Playlist
   */
  addToPlaylist(track){
    this.playlistService.addDeezerSongToPlaylist(track.id, track.artist.name, track.title, this.album.cover);
    this.notifier.notify('success', this.translate.instant('notifier.addSong'));
    this.saveService.updatePlaylist();
  }

  /**
   * Allows the user to all all the song in the album who are not in the playlist
   */
  public addAllToPlaylist(){
    for (let i = 0; i < this.tracks.length; i++){
      if (!this.songAlreadyAddToPlaylist(this.tracks[i].id)){
        this.playlistService.addDeezerSongToPlaylist(this.tracks[i].id, this.tracks[i].artist.name, this.tracks[i].title, this.album.cover);
      }
    }
    this.notifier.notify('success', this.translate.instant('notifier.addAll'));
    this.saveService.updatePlaylist();
  }

  /**
   * @param track -> music selected by the user
   *
   * Delete the music selected by the user to the Playlist
   */
  public deleteToPlaylist(track){
    this.playlistService.deleteSongDeezerToPlaylist(track.id);
    this.notifier.notify('success', this.translate.instant('notifier.deleteSong'));
    this.saveService.updatePlaylist();
  }

  /**
   * Allows the user to delete all the song in the album who are in the playlist
   */
  public deleteAllToPlaylist(){
    for (let i = 0; i < this.tracks.length; i++){
      this.playlistService.deleteSongDeezerToPlaylist(this.tracks[i].id);
    }
    this.notifier.notify('success', this.translate.instant('notifier.deleteAll'));
    this.saveService.updatePlaylist();
  }

  /**
   * @param id -> music selected by the user
   *
   * Check if the music selected by the user is already in the Playlist
   */
  public songAlreadyAddToPlaylist(id){
    return this.playlistService.songDeezerAlreadyInPlaylist(id);
  }

  /**
   * @param id
   *
   * Set the src with security check for the deezer iframe
   */
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
