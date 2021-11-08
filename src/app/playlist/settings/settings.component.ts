import { Component, OnInit } from '@angular/core';
import { AuthguardService } from "../../services/authguard.service";
import { DwelltimeService } from "../../services/dwelltime.service";
import { MatDialog } from "@angular/material/dialog";
import { NotifierService } from "angular-notifier";
import { ThemeService } from "../../services/theme.service";
import { LanguageService } from "../../services/language.service";
import { SaveService } from "../../services/save.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../services/alert.service";

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

  disableAlertMessage: boolean;

  themeLightEnable: boolean = true;
  themeValue = "";

  moreLanguages: boolean = false;
  usedLanguage = "";

  btnThemeLight;
  btnThemeDark;
  btnDwellTimeYes;
  btnDwellTimeNo;
  btnDiskProgress;
  btnCircleProgress;
  btnSpinnerOutside;
  btnSpinnerInside;
  btnAlertMessageYes;
  btnAlertMessageNo;

  error: boolean = false;
  ready = false;

  colorText = "";

  constructor(public authGuardService: AuthguardService,
              private dwellTimeService: DwelltimeService,
              private dialog: MatDialog,
              private notifier: NotifierService,
              private themeService: ThemeService,
              private language: LanguageService,
              private saveService: SaveService,
              private translate: TranslateService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.authGuardService.canAccess();
    setTimeout(() => {
      this.ready = true;
    }, 500);
    this.isThemeLightEnable();
    this.isDwellTimeEnable();
    this.getDwellTimeValue();
    this.isDiskProgressEnable();
    this.isSpinnerOutsideEnable();
    this.isAlertMessageEnable();
  }

  /**
   * Set the theme to light
   */
  toggleThemeLight(){
    this.themeValue = "";
    this.themeService.emitTheme(this.themeValue);
    this.colorText = "colorDark";
    this.saveService.updateSettings();
  }

  /**
   * Set the theme to dark
   */
  toggleThemeDark(){
    this.themeValue = "inverted";
    this.themeService.emitTheme(this.themeValue);
    this.colorText = "colorLight";
    this.saveService.updateSettings();
  }

  /**
   * Enable or not the DwellTime function according to the choice of the user
   */
  dwellTime(value: boolean){
    this.dwellTimeEnable = value;
    this.dwellTimeService.dwellTime = this.dwellTimeEnable;
    this.saveService.updateSettings();
  }

  /**
   * Enable the spinner inside the button or outside
   */
  dwellTimeShape(value: boolean){
    this.dwellTimeSpinnerOutsideBtn = value;
    this.dwellTimeService.dwellTimeSpinnerOutsideBtn = value;
    this.saveService.updateSettings();
  }

  /**
   * @param value
   *
   * Set the mode use for DwellTime = Disk if true else circle if false
   */
  diskProgressMode(value: boolean){
    this.diskProgress = value;
    this.dwellTimeService.diskProgress = value;
    this.saveService.updateSettings();
  }

  /**
   * @param event -> change event
   *
   * Get the value set by the user and convert the value (in seconds) to milliseconds
   */
  getValue(event){
    let value = event.target.value * 1000.0;
    if (this.isValid(value)){
      this.dwellTimeService.dwellTimeValue = value;
      this.saveService.updateSettings();
    }
  }

  /**
   * Check if the value entered by the user is >= 1000.0
   * Else return an error
   */
  isValid(value){
    if (value >= 1000.0){
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
  displayAlertMessage(value){
    this.disableAlertMessage = value;
    this.alertService.doNotShowAgain = value;
    this.saveService.updateSettings();
  }

  /**
   * Set the label DwellTime to enable or disable
   */
  isDwellTimeEnable(){
    setTimeout(() => {
      if (this.dwellTimeService.dwellTime){
        this.btnDwellTimeYes = "checked";
        this.btnDwellTimeNo = "";
      }else {
        this.btnDwellTimeYes = "" ;
        this.btnDwellTimeNo = "checked";
      }
    }, 250);
  }

  isThemeLightEnable() {
    setTimeout(() => {
      if (this.themeService.getTypeTheme()){
        this.btnThemeLight = "checked";
        this.btnThemeDark = "";
        this.colorText = "colorDark";
      }else {
        this.btnThemeLight = "" ;
        this.btnThemeDark = "checked";
        this.colorText = "colorLight";
      }
    }, 250);
  }

  isAlertMessageEnable() {
    setTimeout(() => {
      if (this.alertService.doNotShowAgain){
        this.btnAlertMessageYes = "checked";
        this.btnAlertMessageNo = "";
      }else {
        this.btnAlertMessageYes = "" ;
        this.btnAlertMessageNo = "checked";
      }
    }, 250);
  }

  getDwellTimeValue(){
    setTimeout(() => {
      this.dwellTimeValue = this.dwellTimeService.dwellTimeValue;
    }, 250);
  }

  isDiskProgressEnable(){
    setTimeout(() => {
      this.diskProgress = this.dwellTimeService.diskProgress;
      if (this.diskProgress){
        this.btnDiskProgress = "checked";
        this.btnCircleProgress = "";
      }else {
        this.btnDiskProgress = "" ;
        this.btnCircleProgress = "checked";
      }
    }, 250);
  }

  isSpinnerOutsideEnable(){
    setTimeout(() => {
      if (this.dwellTimeService.dwellTimeSpinnerOutsideBtn){
        this.btnSpinnerOutside = "checked";
        this.btnSpinnerInside = "";
      }else {
        this.btnSpinnerOutside = "" ;
        this.btnSpinnerInside = "checked";
      }
    }, 250);
  }

  goBack(){
    history.back();
  }
}
