import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Import Models
 */
import { NewReleasesItem } from '../models/new-releases-model';

/**
 * Import Services
 */
import {ThemeService} from '../../../../../../../src/app/services/theme.service';

@Component({
  selector: 'app-new-release-item',
  templateUrl: './new-release-item.component.html',
  styleUrls: ['./new-release-item.component.css']
})
export class NewReleaseItemComponent implements OnInit {
  @Input() newRelease: NewReleasesItem;

  theme = "";

  constructor(private router: Router, private themeService : ThemeService) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
  }

  /**
   * @param newRelease
   *
   * When the user click on a new release music, navigate to this album web page
   */
  public navigate(newRelease: any): void {
    let newReleaseId: number = 0;
    newRelease.type === 'artist' ?  newReleaseId = newRelease.id : newReleaseId = newRelease.id;
    this.router.navigate(['/spotify/album', newReleaseId]);
  }
}
