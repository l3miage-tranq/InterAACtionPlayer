import {Component, OnInit } from '@angular/core';
import {DwelltimeService} from '../../../services/dwelltime.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  dwellTimeEnable: boolean;

  constructor(private dwellTimeService: DwelltimeService) {
    this.dwellTimeEnable = this.dwellTimeService.dwellTime;
  }

  ngOnInit(): void {
  }

  dwellTime(){
    this.dwellTimeEnable = !this.dwellTimeEnable;
    this.dwellTimeService.dwellTime = this.dwellTimeEnable;
  }
}
