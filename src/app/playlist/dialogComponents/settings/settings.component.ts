import { Component, OnInit } from '@angular/core';
import { DwelltimeService } from '../../../services/dwelltime.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  dwellTimeEnable: boolean;
  dwellTimeValue: number;

  themeLightEnable: boolean = true;

  error: boolean = false;

  constructor(private dwellTimeService: DwelltimeService, private dialog: MatDialog, private notifier: NotifierService, private themeService: ThemeService) {
    this.dwellTimeEnable = this.dwellTimeService.dwellTime;
    this.dwellTimeValue = this.dwellTimeService.dwellTimeValue;
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
