import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'ProjectMultimedia';

  theme = "";

  constructor(private themeService: ThemeService, private languageService: LanguageService) {
    this.theme = this.themeService.getTheme();
    this.themeService.themeObservable.subscribe(value => {
      if (value == "inverted"){
        this.theme = "darkMode";
      }else {
        this.theme = "";
      }
    });
  }
}
