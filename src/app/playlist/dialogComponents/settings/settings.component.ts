import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Import Services
 */
import { DwelltimeService } from '../../../services/dwelltime.service';
import { NotifierService } from 'angular-notifier';
import { ThemeService } from '../../../services/theme.service';
import { SaveService } from '../../../services/save.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  dwellTimeEnable: boolean;
  dwellTimeValue: number;
  dwellTimeSpinnerOutsideBtn = true;

  diskProgress: boolean;
  diskValue = "";
  circleValue = "";

  disableAlertMessage: boolean;

  themeLightEnable: boolean = true;
  themeLightValue = "";
  themeDarkValue = "";
  themeValue = "";

  error: boolean = false;
  stateValueDwellTime = "";
  stateValueAlertMessage = "";

  constructor(private dwellTimeService: DwelltimeService,
              private dialog: MatDialog,
              private notifier: NotifierService,
              private themeService: ThemeService,
              private saveService: SaveService,
              private translate: TranslateService,
              private alertService: AlertService) {
    this.dwellTimeEnable = this.dwellTimeService.dwellTime;
    this.dwellTimeValue = this.dwellTimeService.dwellTimeValue;
    this.themeLightEnable = this.themeService.getTypeTheme();
    this.themeValue = this.themeService.theme;
    this.dwellTimeSpinnerOutsideBtn = this.dwellTimeService.dwellTimeSpinnerOutsideBtn;
    this.disableAlertMessage = this.alertService.doNotShowAgain;
    this.diskProgress = this.dwellTimeService.diskProgress;
  }

  ngOnInit(): void {
    if (this.themeLightEnable){
      this.themeLightValue = "positive";
    }else {
      this.themeDarkValue = "positive";
    }

    if (this.diskProgress){
      this.diskValue = "positive";
    }else {
      this.circleValue = "positive";
    }

    this.isDwellTimeEnable();
    this.isAlertMessageEnable();
  }

  /**
   * Set the theme to light
   */
  toggleThemeLight(){
    this.themeValue = "";
    this.themeDarkValue = "";
    this.themeLightValue = "positive";
  }

  /**
   * Set the theme to dark
   */
  toggleThemeDark(){
    this.themeValue = "inverted";
    this.themeLightValue = "";
    this.themeDarkValue = "positive";
  }

  /**
   * Enable or not the DwellTime function according to the choice of the user
   */
  dwellTime(){
    this.dwellTimeEnable = !this.dwellTimeEnable;
    this.isDwellTimeEnable();
  }

  /**
   * Enable the spinner inside the button or outside
   */
  dwellTimeShape(value: boolean){
    this.dwellTimeSpinnerOutsideBtn = value;
  }

  /**
   * @param value
   *
   * Set the mode use for DwellTime = Disk
   */
  diskProgressMode(value: boolean){
    this.diskProgress = value;
    this.diskValue = "positive";
    this.circleValue = "";
  }

  /**
   * @param value
   *
   * Set the mode use for DwellTime = Circle
   */
  circleProgressMode(value: boolean){
    this.diskProgress = value;
    this.diskValue = "";
    this.circleValue = "positive";
  }

  /**
   * @param event -> change event
   *
   * Get the value set by the user and convert the value (in seconds) to milliseconds
   */
  getValue(event){
    this.dwellTimeValue = event.target.value * 1000.0;
  }

  /**
   * Check if the value entered by the user is >= 1000.0
   * Else return an error
   */
  isValid(){
    if (this.dwellTimeValue >= 1000.0){
      this.error = false;
      return true
    }else {
      this.error = true;
      return false;
    }
  }

  /**
   * Enable or disable to display an alert message
   */
  displayAlertMessage(){
    this.disableAlertMessage = !this.disableAlertMessage;
    this.isAlertMessageEnable();
  }

  /**
   * Set the label DwellTime to enable or disable
   */
  isDwellTimeEnable(){
    if (this.dwellTimeEnable){
      this.stateValueDwellTime = 'settingsPlaylist.enable';
    }else {
      this.stateValueDwellTime = 'settingsPlaylist.disable';
    }
  }

  /**
   * Set the label Alert Message to yes or no
   */
  isAlertMessageEnable(){
    if (this.disableAlertMessage){
      this.stateValueAlertMessage = 'settingsPlaylist.yes';
    }else {
      this.stateValueAlertMessage = 'settingsPlaylist.no';
    }
  }

  /**
   * If the user submit :
   *  - Check if the dwellTimeValue is valid
   * Then set all value , update database Settings Store, notify that settings has changed and close this DialogComponent
   */
  submit(){
    if (this.isValid()){
      this.dwellTimeService.diskProgress = this.diskProgress;
      this.dwellTimeService.dwellTime = this.dwellTimeEnable;
      this.dwellTimeService.dwellTimeValue = this.dwellTimeValue;
      this.dwellTimeService.dwellTimeSpinnerOutsideBtn = this.dwellTimeSpinnerOutsideBtn;
      this.dwellTimeService.setSizeDwellTimeSpinner();
      this.dwellTimeService.setDiskProgress();
      this.themeService.emitTheme(this.themeValue);
      this.alertService.doNotShowAgain = this.disableAlertMessage;
      this.saveService.updateSettings();
      this.notifier.notify('warning', this.translate.instant('notifier.settings'));
      this.dialog.closeAll();
    }
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }
}
