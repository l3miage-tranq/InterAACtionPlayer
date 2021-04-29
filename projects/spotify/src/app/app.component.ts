import {Component, OnInit} from '@angular/core';
import {GlobalService} from './services/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'spotify';

  constructor(private globalService: GlobalService, private router: Router) {
  }

  /**
   * Initialize token for the Spotify Api
   * When the token is initialize, 500ms after we go to the spotify/home web page
   */
  ngOnInit(): void {
    this.globalService.accessToken; //
    setTimeout(() => this.router.navigate(['/spotify/home']) ,500 );
  }
}
