import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.css']
})
export class ArtistAlbumsComponent implements OnInit {
  @Input() album: any;

  theme = "";

  constructor(private router: Router, private themeService: ThemeService) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
  }

  /**
   * @param album
   *
   * When clicked on the album, send the user on the a web page that contains all music in this album
   */
  public seeAlbum(album: any): void {
    this.router.navigate(['/spotify/album', album.id]);
  }
}
