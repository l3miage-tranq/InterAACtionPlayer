import { Component, OnInit } from '@angular/core';
import { DwelltimeService } from '../../../services/dwelltime.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { ThemeService } from '../../../services/theme.service';
import { LanguageService } from '../../../services/language.service';
import { SaveService } from '../../../services/save.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  dwellTimeEnable: boolean;
  dwellTimeValue: number;

  themeLightEnable: boolean = true;
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
              private translate: TranslateService) {
    this.dwellTimeEnable = this.dwellTimeService.dwellTime;
    this.dwellTimeValue = this.dwellTimeService.dwellTimeValue;
    this.themeLightEnable = this.themeService.getTypeTheme();
    this.usedLanguage = this.language.activeLanguage;
  }

  ngOnInit(): void {
  }

  toggleTheme(){
    this.themeLightEnable = !this.themeLightEnable;
    if (this.themeLightEnable){
      this.themeValue = "";
    }else {
      this.themeValue = "inverted";
    }
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
    this.usedLanguage = language;
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
      this.themeService.emitTheme(this.themeValue);
      this.language.switchLanguage(this.usedLanguage);
      this.saveService.updateSettings();
      this.notifier.notify('warning', this.translate.instant('notifier.settings'));
      this.dialog.closeAll();
    }
  }
}
