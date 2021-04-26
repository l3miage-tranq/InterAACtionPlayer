import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  theme = "";

  constructor(private themeService: ThemeService) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
  }
}
