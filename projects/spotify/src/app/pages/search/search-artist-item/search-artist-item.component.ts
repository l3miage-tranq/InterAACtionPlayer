import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {ThemeService} from '../../../../../../../src/app/services/theme.service';

@Component({
  selector: 'app-search-artist-item',
  templateUrl: './search-artist-item.component.html',
  styleUrls: ['./search-artist-item.component.css']
})
export class SearchArtistItemComponent implements OnInit {
  @Input() artist: any;

  theme = "";

  constructor(private router: Router, private themeService: ThemeService) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
  }

  // navigates to artist
  public navigate(artist: any): void {
    console.log('id', artist.id);
    this.router.navigate(['/spotify/artist', artist.id]);
  }
}
