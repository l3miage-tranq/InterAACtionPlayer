import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public activeLanguage: string = 'en';
  public moreLanguages: boolean = false;

  constructor( private translate: TranslateService ) {
    // set default language
    this.translate.setDefaultLang(this.activeLanguage);
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
