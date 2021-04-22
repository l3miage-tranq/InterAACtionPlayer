import { Component, OnInit } from '@angular/core';
import { DwelltimeService } from '../../../services/dwelltime.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { ThemeService } from '../../../services/theme.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  dwellTimeEnable: boolean;
  dwellTimeValue: number;

  themeLightEnable: boolean = true;
  moreLanguages: boolean = false;

  error: boolean = false;

  constructor(private dwellTimeService: DwelltimeService, private dialog: MatDialog, private notifier: NotifierService, private themeService: ThemeService, private language: LanguageService) {
    this.dwellTimeEnable = this.dwellTimeService.dwellTime;
    this.dwellTimeValue = this.dwellTimeService.dwellTimeValue;
    this.themeLightEnable = this.themeService.getTypeTheme();
  }

  ngOnInit(): void {
  }

  toggleTheme(){
    this.themeLightEnable = !this.themeLightEnable;
  }

  dwellTime(){
    this.dwellTimeEnable = !this.dwellTimeEnable;
  }

  getValue(event){
    this.dwellTimeValue = event.target.value * 1000.0;
  }

  seeLanguages(): void {
    this.moreLanguages = !this.moreLanguages;
  }

  switchLanguage(language: string){
    console.log("switch");
    this.language.switchLanguage(language);
  }

  isValid(){
    if (this.dwellTimeValue >= 1000.0){
      this.error = false;
      return true
    }else {
      this.error = true;
      return false;
    }
  }

  submit(){
    if (this.isValid()){
      this.dwellTimeService.dwellTime = this.dwellTimeEnable;
      this.dwellTimeService.dwellTimeValue = this.dwellTimeValue;
      if (this.themeLightEnable){
        this.themeService.emitTheme("");
      }else {
        this.themeService.emitTheme("inverted");
      }
      this.notifier.notify('warning', 'Settings have changed !');
      this.dialog.closeAll();
    }
  }
}
