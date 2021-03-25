import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// Models
import { NewReleasesItem } from '../models/new-releases-model';

// Services
import { NewReleasesService } from '../services/new-releases.service';
import { GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public newReleases: NewReleasesItem[] = [];
  // public activeLanguage: string = 'en';

  constructor(
    private newReleasesService: NewReleasesService,
    private globalService: GlobalService,
    private translate: TranslateService
  ){ /*empty*/ }

  ngOnInit(): void {
    // this.setLanguage();
    this.getNewReleases();
  }

  // call service to get new releases from spotify
  public getNewReleases(): void {
    this.newReleasesService.getNewReleases().subscribe((data: any) => {
      this.newReleases = data;
      console.log('Data:', data);
    }, (err) => {
      console.log('Error:', err);
      console.error(err.message);
    }, () => {
      console.log('Complete!');
    });
  }

  // scroll to element
  public scrollTo(elementId: string): void {
    document.getElementById(elementId).scrollIntoView();
  }

  // set language
  // public setLanguage(): void {
  //   this.activeLanguage = this.globalService.getGlobalLanguage();
  //   this.translate.use(this.activeLanguage);
  // }
}
