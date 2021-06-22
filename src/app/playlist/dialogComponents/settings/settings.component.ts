import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Import Services
 */
import { DwelltimeService } from '../../../services/dwelltime.service';
import { NotifierService } from 'angular-notifier';
import { ThemeService } from '../../../services/theme.service';
import { LanguageService } from '../../../services/language.service';
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

  moreLanguages: boolean = false;
  usedLanguage = "";

  error: boolean = false;

  constructor(private dwellTimeService: DwelltimeService,
              private dialog: MatDialog,
              private notifier: NotifierService,
              private themeService: ThemeService,
              private language: LanguageService,
              private saveService: SaveService,
              private translate: TranslateService,
              private alertService: AlertService) {
    this.dwellTimeEnable = this.dwellTimeService.dwellTime;
    this.dwellTimeValue = this.dwellTimeService.dwellTimeValue;
    this.themeLightEnable = this.themeService.getTypeTheme();
    this.themeValue = this.themeService.theme;
    this.usedLanguage = this.language.activeLanguage;
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
   * Show the language currently used in the dropdown menu
   */
  setActiveLanguage(){
    const elem = document.getElementById(this.usedLanguage)
    elem.classList.add("active");
    elem.classList.add("langues");
  }

  /**
   * Show all languages available
   */
  seeLanguages(): void {
    this.moreLanguages = !this.moreLanguages;
    setTimeout(() => {
      this.setActiveLanguage();
    }, 250);
  }

  /**
   * @param language -> the language chosen by the user
   *
   * Set the new language chosen by the user
   */
  switchLanguage(language: string){
    const oldElem = document.getElementById(this.usedLanguage);
    const newElem = document.getElementById(language);
    oldElem.classList.remove("active");
    oldElem.classList.remove("langues");
    newElem.classList.add("active");
    newElem.classList.add("langues");
    this.usedLanguage = language;
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
   * @param value
   *
   * Get the choose of the user about the type of the progress spinner
   */
  displayAlertMessage(value){
    this.disableAlertMessage = value;
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
      this.dwellTimeService.getSizeDwellTimeSpinner();
      this.dwellTimeService.getDiskProgress();
      this.themeService.emitTheme(this.themeValue);
      this.language.switchLanguage(this.usedLanguage);
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
