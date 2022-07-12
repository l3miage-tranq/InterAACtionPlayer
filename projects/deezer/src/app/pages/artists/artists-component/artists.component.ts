import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';
import { GlobalService } from '../../../services/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  theme = "";

  artist;
  artistName;
  artistNbAlbums;
  artistNbFan;
  albums;
  picture;

  constructor(private themeService: ThemeService,
              private globalService: GlobalService,
              private router: Router) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
    this.getArtistInfo();
    this.getListAlbumsArtist();
  }

  /**
   * Allows to get all information needed of the artist choose by the user
   */
  getArtistInfo(){
    this.globalService.getArtist(this.globalService.idArtistChoose).subscribe(results => {
      this.artist = results;
      this.artistName = results.name;
      this.artistNbAlbums = results.nb_album;
      this.artistNbFan = results.nb_fan;
      this.picture = results.picture;
    });
  }

  /**
   * Allows to get all albums information of the artist choose by the user
   */
  getListAlbumsArtist(){
    this.globalService.getListAlbums(this.globalService.idArtistChoose).subscribe(results => {
      this.albums = results;
    })
  }

  /**
   * @param album
   *
   * When clicked on the album, send the user on the a web page that contains all music in this album
   */
  public seeAlbum(album: any): void {
    this.globalService.albumChoose = album;
    this.router.navigate(['/deezer/albums', album.id]);
  }
}
