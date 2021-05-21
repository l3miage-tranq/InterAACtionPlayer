import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Import Services
 */
import { ThemeService } from '../../../../../../../src/app/services/theme.service';
import { GlobalService } from '../../../services/global.service';

/**
 * Import Models
 */
import { IResult } from '../../../models/iresult';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchInput: string;
  searchRes: IResult[];
  theme = "";

  private router: Router;
  private themeService: ThemeService;
  private globalService: GlobalService;

  /**
   * @param router
   * @param themeService
   * @param globalService
   *
   * Initialize the router for navigate between page
   * And allows to initialize the page with the right theme
   */
  constructor(router: Router, themeService: ThemeService, globalService: GlobalService) {
    this.router = router;
    this.themeService = themeService;
    this.theme = this.themeService.theme;
    this.globalService = globalService;
  }

  ngOnInit(): void {
    if (this.theme == "inverted"){
      this.theme = this.theme + " transparent contourColor";
    }
  }

  /**
   * Get music on Deezer who are equal with the user submit in the search bar
   */
  searchMusic() {
    this.globalService.searchMusic(this.searchInput).subscribe(results => {
      this.searchRes = results;
    });
  }

  /**
   * Allows to return to the Playlist web page
   */
  goPlaylist() {
    this.router.navigate(['/playlist']);
  }

  /**
   * @param albumArtist
   *
   * When the user click on a artist, navigate to this album web page
   */
  public navigate(albumArtist): void {
    this.globalService.artistChoose = albumArtist;
    this.router.navigate(['/deezer/albums']);
  }
}
