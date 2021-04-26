import { Component } from '@angular/core';
import { ThemeService } from '../../../../src/app/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'youtube';

  theme = "";

  constructor(private themeService: ThemeService) {
    this.theme = themeService.theme;
  }
}
