import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { ArtistService } from '../services/artist.service';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  public artistId: string = '';
  public artist: any | null = null;
  public topTracks: any[] = [];
  public albums: any[] = [];

  theme = "";

  constructor( private activatedRoute: ActivatedRoute, private artistService: ArtistService, private themeService: ThemeService ) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
    this.getActivatedRoute();
    this.getArtist();
    this.getTopTracks();
    this.getAlbums();
  }

  // get artist id from active route
  public getActivatedRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.artistId = params.id;
    });
  }

  // get artist info
  public getArtist(): void {
    this.artistService.getArtist(this.artistId).subscribe((artist: any) => {
      this.artist = artist;
      console.log('Artist Data:', artist);
    }, (err) => {
      console.log('Artist Error:', err);
      console.error(err.message);
    }, () => {
      console.log('Artist Complete!');
    });
  }

  // get artist top tracks
  public getTopTracks(): void {
    this.artistService.getTopTracks(this.artistId).subscribe((topTracks: any) => {
      this.topTracks = topTracks;
      console.log('Top tracks Data:', topTracks);
    }, (err) => {
      console.log('Artist Error:', err);
      console.error(err.message);
    }, () => {
      console.log('Artist Complete!');
    });
  }

  // get artist albums
  public getAlbums(): void {
    this.artistService.getAlbums(this.artistId).subscribe((albums: any) => {
      this.albums = albums;
      console.log('Albums Data:', albums);
    }, (err) => {
      console.log('Albums Error:', err);
      console.error(err.message);
    }, () => {
      console.log('Albums Complete!');
    });
  }
}
