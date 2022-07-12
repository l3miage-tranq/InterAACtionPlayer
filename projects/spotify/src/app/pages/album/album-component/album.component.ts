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

  albumImage;
  albumType;
  albumName;
  albumTrack;
  albumNbTracks;

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
      this.getAlbumImage();
      this.getAlbumName();
      this.getAlbumType();
      this.getAlbumTrack();
      this.getAlbumNbTracks();
    });
  }

  /**
   * Allows to get the image of the album
   */
  public getAlbumImage(){
    try {
      this.albumImage = this.album.images;
    }catch (error){
      console.log("Can't load the image of the album, the error is : " + error);
    }
  }

  /**
   * Allows to get the type of the album
   */
  public getAlbumType(){
    try {
      this.albumType = this.album.type;
    }catch (error){
      console.log("Can't load the type of the album, the error is : " + error);
    }
  }

  /**
   * Allows to get the name of the album
   */
  public getAlbumName(){
    try {
      this.albumName = this.album.name;
    }catch (error){
      console.log("Can't load the name of the album, the error is : " + error);
    }
  }

  /**
   * Allows to get the tracks of the album
   */
  public getAlbumTrack(){
    try {
      this.albumTrack = this.album.tracks;
    }catch (error){
      console.log("Can't load the tracks of the album, the error is : " + error);
    }
  }

  /**
   * Allows to get the number of tracks in the album
   */
  public getAlbumNbTracks(){
    try {
      this.albumNbTracks = this.album.tracks.items;
    }catch (error){
      console.log("Can't find the number of tracks in the album, the error is : " + error);
    }
  }

  /**
   * Allows to get the uri of the track
   */
  getTrackUri(index){
    try {
      return this.album.tracks.items[index].uri;
    }catch (error){
      console.log("Can't get the uri of the track, the error is : " + error);
    }
  }

  /**
   * Allows to get the image of the track
   */
  getTrackImage(){
    try {
      return this.album.images[0];
    }catch (error){
      console.log("Can't get the image of the track, the error is : " + error);
    }
  }

  /**
   * Allows to get the item of the track
   */
  getTrackItem(index){
    try {
      return this.album.tracks.items[index];
    }catch (error){
      console.log("Can't get the item of the track, the error is : " + error);
    }
  }

  /**
   * @param item -> music selected by the user
   * @param image
   *
   * Add the music selected by the user in the Playlist
   */
  public addToPlaylist(item: Item, image: Image){
    this.playlistService.addSpotifySongToPlaylist(item, image);
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
        this.playlistService.addSpotifySongToPlaylist(album.tracks.items[i], album.images[0]);
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
