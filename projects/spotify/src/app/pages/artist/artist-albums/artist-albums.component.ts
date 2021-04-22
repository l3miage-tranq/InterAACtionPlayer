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
    this.theme = themeService.getTheme();
  }

  ngOnInit(): void {
  }

  public seeAlbum(album: any): void {
    this.router.navigate(['/spotify/album', album.id]);
  }
}
