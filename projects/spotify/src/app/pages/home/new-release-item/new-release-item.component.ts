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

  newReleaseImages;
  newReleaseName;
  newReleaseArtistName;
  newReleaseType;

  constructor(private router: Router, private themeService : ThemeService) {
    this.theme = themeService.theme;
  }

  ngOnInit(): void {
    this.getNewReleaseImages();
    this.getNewReleaseName();
    this.getNewReleaseArtistName();
    this.getNewReleaseType();
  }

  /**
   * Allows to get the image of the album
   */
  getNewReleaseImages(){
    try {
      this.newReleaseImages = this.newRelease.images;
    }catch (error){
      console.log("Can't get the images of new releases albums, the error is : " + error);
    }
  }

  /**
   * Allows to get the name of the album
   */
  getNewReleaseName(){
    try {
      this.newReleaseArtistName = this.newRelease.artists[0].name;
    }catch (error){
      console.log("Can't get the name of the artist, the error is : " + error);
    }
  }

  /**
   * Allows to get the name of the artist's album
   */
  getNewReleaseArtistName(){
    try {
      this.newReleaseName = this.newRelease.name;
    }catch (error){
      console.log("Can't get the name of new releases albums, the error is : " + error);
    }
  }

  /**
   * Allows to get the type of the album
   */
  getNewReleaseType(){
    try {
      this.newReleaseType = this.newRelease.type;
    }catch (error){
      console.log("Can't get the type of new releases albums, the error is : " + error);
    }
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
