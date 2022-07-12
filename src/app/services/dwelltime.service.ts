import { Injectable } from '@angular/core';
import { Configuration } from '../models/configSettings';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DwelltimeService {

  dwellTime: boolean = false;
  dwellTimeValue = 5000; // In milliseconds
  dwellTimeSpinnerOutsideBtn = true;
  diskProgress: boolean = true;

  public dwellTimeSpinnerSize = new Subject<number>();
  public diskProgressObs = new Subject<boolean>();

  constructor() {
  }

  /**
   * Allows the user to choose if he want the spinner :
   *  - Outside of the button;
   *  - Or inside the button;
   */
  setSizeDwellTimeSpinner(){
    if (this.dwellTimeSpinnerOutsideBtn){
      this.dwellTimeSpinnerSize.next(190);
    }else {
      this.dwellTimeSpinnerSize.next(150);
    }
  }

  /**
   * Allows to get the right value for the diameter of the dwellTimeSpinner
   */
  getSizeDwellTimeSpinner(){
    if (this.dwellTimeSpinnerOutsideBtn){
      return 190;
    }else {
      return 150;
    }
  }

  /**
   * Update the type of the spinner chooser by the user
   */
  setDiskProgress(){
    this.diskProgressObs.next(this.diskProgress);
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
    this.diskProgress = configuration.diskProgress;
  }

  /**
   * Return the actual configuration
   */
  getConfiguration(){
    return {
      'dwellTime': this.dwellTime,
      'dwellTimeValue': this.dwellTimeValue,
      'spinnerDwellTimeOutside': this.dwellTimeSpinnerOutsideBtn,
      'diskProgress': this.diskProgress
    }
  }
}
