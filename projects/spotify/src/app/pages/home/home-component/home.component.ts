import { Component, OnInit } from '@angular/core';

/**
 * Import Models
 */
import { NewReleasesItem } from '../models/new-releases-model';

/**
 * Import Services
 */
import { NewReleasesService } from '../services/new-releases.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public newReleases: NewReleasesItem[] = [];

  constructor(private newReleasesService: NewReleasesService){
  }

  ngOnInit(): void {
    this.getNewReleases();
  }

  /**
   * Call the service to get the new release from Spotify
   */
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
}
