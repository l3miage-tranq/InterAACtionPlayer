import { Injectable } from '@angular/core';
import { Configuration } from '../models/configSettings';

@Injectable({
  providedIn: 'root'
})
export class DwelltimeService {

  dwellTime: boolean = false;
  dwellTimeValue = 1000; // In milliseconds

  constructor() {
  }

  /**
   * @param configuration -> The configuration to use
   *
   * Update the variables (dwellTime & dwellTimeValue) with the new values
   */
  setConfiguration(configuration: Configuration){
    this.dwellTime = configuration.dwellTime;
    this.dwellTimeValue = configuration.dwellTimeValue;
  }

  /**
   * Return the actual configuration
   */
  getConfiguration(): Configuration{
    return {
      'dwellTime': this.dwellTime,
      'dwellTimeValue': this.dwellTimeValue
    }
  }
}
