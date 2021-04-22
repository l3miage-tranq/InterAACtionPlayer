import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { NewReleasesItem} from '../models/new-releases-model';
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
    this.theme = themeService.getTheme();
  }

  ngOnInit(): void {}

  public navigate(newRelease: any): void {
    let newReleaseId: number = 0;

    newRelease.type === 'artist' ?  newReleaseId = newRelease.id : newReleaseId = newRelease.id;
    console.log('new release type:', newRelease.type);
    console.log('New Release Id:', newReleaseId);

    this.router.navigate(['/spotify/album', newReleaseId]);
  }
}
