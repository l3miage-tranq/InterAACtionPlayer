import { Injectable } from '@angular/core';
import { Configuration } from '../models/configSettings';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DwelltimeService {

  dwellTime: boolean = false;
  dwellTimeValue = 1000; // In milliseconds
  dwellTimeSpinnerOutsideBtn = true;

  public dwellTimeSpinnerSize = new Subject<number>();

  constructor() {
  }

  /**
   * Allows the user to choose if he want the spinner :
   *  - Outside of the button;
   *  - Or inside the button;
   */
  getSizeDwellTimeSpinner(){
    if (this.dwellTimeSpinnerOutsideBtn){
      this.dwellTimeSpinnerSize.next(190);
    }else {
      this.dwellTimeSpinnerSize.next(150);
    }
  }

  /**
   * @param configuration -> The configuration to use
   *
   * Update the variables with the new values
   */
  setConfiguration(configuration: Configuration){
    this.dwellTime = configuration.dwellTime;
    this.dwellTimeValue = configuration.dwellTimeValue;
    this.dwellTimeSpinnerOutsideBtn = configuration.spinnerDwellTimeOutside;
  }

  /**
   * Return the actual configuration
   */
  getConfiguration(){
    return {
      'dwellTime': this.dwellTime,
      'dwellTimeValue': this.dwellTimeValue,
      'spinnerDwellTimeOutside': this.dwellTimeSpinnerOutsideBtn
    }
  }
}
