import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

/**
 * Import Services
 */
import { AlbumService } from '../services/album.service';
import { PlaylistService } from '../../../../../../../src/app/playlist/services/playlist.service';
import { SaveService } from '../../../../../../../src/app/services/save.service';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';

/**
 * Import Models
 */
import { APIAlbums, Image, Item } from '../models/album-model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public albumId: string = '';
  public album: APIAlbums | null = null;

  theme = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService,
    private location: Location,
    private notifier: NotifierService,
    private playlistService: PlaylistService,
    private saveService: SaveService,
    private themeService: ThemeService,
    private translate: TranslateService
  ) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
    this.getActivatedRoute();
    this.getAlbum();
  }

  /**
   * Get album Id from active route
   */
  public getActivatedRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.albumId = params.id;
    });
  }

  /**
   * Get album information
   */
  public getAlbum(): void {
    this.albumService.getAlbum(this.albumId).subscribe((album: APIAlbums) => {
      this.album = album;
    });
  }

  /**
   * @param item -> music selected by the user
   * @param image
   *
   * Add the music selected by the user in the Playlist
   */
  public addToPlaylist(item: Item, image: Image){
    this.playlistService.addSongToPlaylist(item, image);
    this.notifier.notify('success', this.translate.instant('notifier.addSong'));
    this.saveService.updatePlaylist();
  }

  /**
   * @param album
   *
   * Allows the user to all all the song in the album who are not in the playlist
   */
  public addAllToPlaylist(album: APIAlbums){
    for (let i = 0; i < album.tracks.items.length; i++){
      if (!this.songAlreadyAddToPlaylist(album.tracks.items[i])){
        this.playlistService.addSongToPlaylist(album.tracks.items[i], album.images[0]);
      }
    }
    this.notifier.notify('success', this.translate.instant('notifier.addAll'));
    this.saveService.updatePlaylist();
  }

  /**
   * @param item -> music selected by the user
   *
   * Delete the music selected by the user to the Playlist
   */
  public deleteToPlaylist(item: Item){
    this.playlistService.deleteSongSpotifyToPlaylist(item);
    this.notifier.notify('success', this.translate.instant('notifier.deleteSong'));
    this.saveService.updatePlaylist();
  }

  /**
   * @param album
   *
   * Allows the user to delete all the song in the album who are in the playlist
   */
  public deleteAllToPlaylist(album: APIAlbums){
    for (let i = 0; i < album.tracks.items.length; i++){
      this.playlistService.deleteSongSpotifyToPlaylist(album.tracks.items[i]);
    }
    this.notifier.notify('success', this.translate.instant('notifier.deleteAll'));
    this.saveService.updatePlaylist();
  }

  /**
   * @param item -> music selected by the user
   *
   * Check if the music selected by the user is already in the Playlist
   */
  public songAlreadyAddToPlaylist(item: Item){
    return this.playlistService.songSpotifyAlreadyInPlaylist(item);
  }

  /**
   * Go back to the previous URL
   */
  public goBack(): void {
    this.location.back();
  }

}
