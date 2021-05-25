import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  theme = "";
  artist;

  constructor(private themeService: ThemeService, private globalService: GlobalService) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
    this.getArtistInfo();
  }

  getArtistInfo(){
    this.globalService.getArtist(this.globalService.artistChoose).subscribe(results => {
      this.artist = results;
    });
  }
}
