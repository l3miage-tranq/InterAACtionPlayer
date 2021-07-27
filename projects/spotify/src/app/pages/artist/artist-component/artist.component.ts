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

  artistId: string = '';
  artist: any | null = null;
  topTracks: any[] = [];
  albums: any[] = [];

  theme = "";

  artistImage;
  artistName;
  artistFollower;

  constructor( private activatedRoute: ActivatedRoute, private artistService: ArtistService, private themeService: ThemeService ) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
    this.getActivatedRoute();
    this.getArtist();
    this.getTopTracks();
    this.getAlbums();
  }

  /**
   * Get artist Id from active route
   */
  public getActivatedRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.artistId = params.id;
    });
  }

  /**
   * Get artist (selected by the user) information
   */
  public getArtist(): void {
    this.artistService.getArtist(this.artistId).subscribe((artist: any) => {
      this.artist = artist;
      this.artistImage = artist.images;
      this.artistName = artist.name;
      this.artistFollower = artist.followers.total;
    });
  }

  /**
   * Get artist (selected by the user) Top Tracks
   */
  public getTopTracks(): void {
    this.artistService.getTopTracks(this.artistId).subscribe((topTracks: any) => {
      this.topTracks = topTracks;
    });
  }

  /**
   * Get artist (selected by the user) albums
   */
  public getAlbums(): void {
    this.artistService.getAlbums(this.artistId).subscribe((albums: any) => {
      this.albums = albums;
    });
  }
}
