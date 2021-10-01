import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'InterAACtionPlayer';

  theme = "";

  /**
   * @param themeService
   * @param languageService
   *
   * Allows to initialize the page with the right theme & language;
   * And to know if the theme should be changed.
   */
  constructor(private themeService: ThemeService, private languageService: LanguageService) {
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
