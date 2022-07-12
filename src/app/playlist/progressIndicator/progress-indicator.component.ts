import { Component, Input, OnInit } from '@angular/core';
import { DwelltimeService } from '../../services/dwelltime.service';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.css']
})
export class ProgressIndicatorComponent implements OnInit {

  @Input() id;
  @Input() spinnerValue;
  @Input() type;

  diameterMatProgress = 190;
  diameterRoundProgress = 76;
  diskProgress: boolean;

  constructor(private dwellTimeService: DwelltimeService) {
  }

  ngOnInit(): void {
    this.diskProgress = this.dwellTimeService.diskProgress;
    this.diameterMatProgress = this.dwellTimeService.getSizeDwellTimeSpinner() / this.type;
    this.diameterRoundProgress = this.diameterRoundProgress / this.type;
    this.dwellTimeService.dwellTimeSpinnerSize.subscribe(value => {
      this.diameterMatProgress = value / this.type;
    });
    this.dwellTimeService.diskProgressObs.subscribe(value => {
      this.diskProgress = value;
    })
  }

}
