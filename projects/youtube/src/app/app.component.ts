import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../src/app/services/theme.service';
import { AuthguardService } from '../../../../src/app/services/authguard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'youtube';

  theme = "";

  /**
   * @param themeService
   * @param authGuardService
   *
   * Allows to initialize the page with the right theme
   */
  constructor(private themeService: ThemeService,
              private authGuardService: AuthguardService) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
    this.authGuardService.canAccess();
  }
}
