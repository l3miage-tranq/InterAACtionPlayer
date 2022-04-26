import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { LanguageService } from "./language.service";
import {SpeedTestService} from "ng-speed-test";

@Injectable({
  providedIn: 'root'
})
export class StatusInternetService {

  public statusInternet: boolean = true;

  constructor(private router: Router,
              private languageService: LanguageService,
              private speedTestService: SpeedTestService) {
    this.speedTestService.getMbps({
      iterations: 1,
      retryDelay: 1
    }).subscribe(
      (speed) => {
        if (speed == 0){
          this.statusInternet = false;
        }
      }
    )
  }

  checkStatusInternet(){
    if (!this.statusInternet){
      this.router.navigate([this.languageService.getLanguage() + '/error']);
    }
  }

  getStatusInternet(){
    return this.statusInternet;
  }

  retryInternetStatus(){
    this.speedTestService.getMbps({
      iterations: 1,
      retryDelay: 1
    }).subscribe(
      (speed) => {
        if (speed == 0){
          this.statusInternet = false;
        }else {
          this.statusInternet = true;
        }
      }
    )
    setTimeout(() => {
      return this.statusInternet;
    }, 5000)
  }
}
