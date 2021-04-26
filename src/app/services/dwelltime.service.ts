import { Injectable } from '@angular/core';
import { Configuration } from '../models/configSettings';

@Injectable({
  providedIn: 'root'
})
export class DwelltimeService {

  dwellTime: boolean = false;
  dwellTimeValue = 1000;

  constructor() {
  }

  setConfiguration(configuration: Configuration){
    this.dwellTime = configuration.dwellTime;
    this.dwellTimeValue = configuration.dwellTimeValue;
  }

  getConfiguration(): Configuration{
    return {
      'dwellTime': this.dwellTime,
      'dwellTimeValue': this.dwellTimeValue
    }
  }
}
