import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotifierService } from 'angular-notifier';

// Services
import { AlbumService } from '../services/album.service';
import { PlaylistService } from '../../../../../../../src/app/playlist/services/playlist.service';

// Models
import { APIAlbums, Image, Item } from '../models/album-model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public albumId: string = '';
  public album: APIAlbums | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService,
    private location: Location,
    private notifier: NotifierService,
    private playlistService: PlaylistService,
  ) { /*empty*/ }

  ngOnInit(): void {
    this.getActivatedRoute();
    this.getAlbum();
  }

  // get album id from active route
  public getActivatedRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.albumId = params.id;
      console.log('Activated Route Id', params.id);
    });
  }

  // get album info
  public getAlbum(): void {
    this.albumService.getAlbum(this.albumId).subscribe((album: APIAlbums) => {
      this.album = album;
      console.log('Album Data:', album);
    }, (err) => {
      console.log('Album Error:', err);
      console.error(err.message);
    }, () => {
      console.log('Album Complete!');
    });
  }

  public addToPlaylist(item: Item, image: Image){
    this.playlistService.addSongToPlaylist(item, image);
    this.notifier.notify('success', 'Song add to playlist');
  }

  public deleteToPlaylist(item: Item){
    this.playlistService.deleteSongSpotifyToPlaylist(item);
    this.notifier.notify('success', 'Song delete to playlist');
  }

  public songAlreadyAddToPlaylist(item: Item){
    return this.playlistService.songSpotifyAlreadyInPlaylist(item);
  }

  // go back to the previous URL
  public goBack(): void {
    this.location.back();
  }

}
