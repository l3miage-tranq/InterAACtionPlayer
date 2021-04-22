import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public activeLanguage: string = 'en';
  public moreLanguages: boolean = false;

  theme = "";

  constructor( private translate: TranslateService, private themeService: ThemeService ) {
    // set default language
    this.translate.setDefaultLang(this.activeLanguage);
    this.theme = themeService.getTheme();
  }

  ngOnInit(): void {}

  // switch language
  public switchLanguage(language: string) {
    this.activeLanguage = language;
    this.translate.use(language);
  }

  public seeLanguages(): void {
    this.moreLanguages = !this.moreLanguages;
  }
}
