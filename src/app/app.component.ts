import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'ProjectMultimedia';

  theme = "";

  /**
   * @param themeService
   * @param languageService
   * @param router
   *
   * Allows to initialize the page with the right theme & language;
   * And to know if the theme should be changed.
   */
  constructor(private themeService: ThemeService,
              private languageService: LanguageService,
              private router: Router) {
    this.theme = this.themeService.theme;
    this.themeService.themeObservable.subscribe(value => {
      if (value == "inverted"){
        this.theme = "darkMode";
      }else {
        this.theme = "";
      }
    });
  }
}
