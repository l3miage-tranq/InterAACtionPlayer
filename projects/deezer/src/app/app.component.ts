import { Component } from '@angular/core';
import { ThemeService } from '../../../../src/app/services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'deezer';

  theme = "";

  /**
   * @param themeService
   * @param router
   *
   * Allows to initialize the page with the right theme
   * Then we go to the deezer/search web page
   */
  constructor(private themeService: ThemeService, private router: Router) {
    this.theme = themeService.theme;
    this.router.navigate(['/deezer/search']);
  }
}
