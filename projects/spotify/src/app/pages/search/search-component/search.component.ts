import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Import Services
 */
import { SearchService } from '../services/search.service';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() public showModal: boolean = false;

  public artistsList: any[] = [];
  public tracksList: any[] = [];
  public onSearch: boolean = false;
  public activeLanguage: string = 'en';

  theme = "";
  themeSearch = "";

  constructor( private searchService: SearchService, private router: Router, private themeService: ThemeService ) {
    this.theme = themeService.theme;
    this.themeSearch = themeService.theme + " transparent contourColor";
  }

  ngOnInit(): void {
    this.search('');
    this.onSearch = false;
    this.showModal = false;
  }

  /**
   * @param term
   *
   * Serach both artist and tracks
   */
  public search(term: string): void {
    console.log('Term to find:', term);
    this.onSearch = true;
    this.router.navigate(['/spotify/search', term]);
    this.searchService.getTracksAndArtists(term).subscribe((data: any) => {
      this.artistsList = data.artists.items;
      this.tracksList = data.tracks.items;
      if (this.artistsList.length === 0 && this.tracksList.length === 0) {
        this.showModal = true;
      }
    }, (err) => {
      console.log('Error:', err);
      console.error(err.message);
    }, () => {
      console.log('Complete!');
    });
  }
}
