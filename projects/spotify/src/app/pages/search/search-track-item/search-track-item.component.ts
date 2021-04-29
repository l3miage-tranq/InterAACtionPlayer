import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';

@Component({
  selector: 'app-search-track-item',
  templateUrl: './search-track-item.component.html',
  styleUrls: ['./search-track-item.component.css']
})
export class SearchTrackItemComponent implements OnInit {
  @Input() track: any;

  theme = "";

  constructor(private router: Router, private themeService: ThemeService) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
  }

  /**
   * @param track
   *
   * When the user click on a track, it makes him navigate to track the web page
   */
  public navigate(track: any): void {
    console.log('id', track.album.id);
    this.router.navigate(['/spotify//album', track.album.id]);
  }

}
