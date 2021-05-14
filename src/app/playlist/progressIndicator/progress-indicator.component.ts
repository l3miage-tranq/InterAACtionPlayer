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

  diameterSpinner = 190;

  constructor(private dwellTimeService: DwelltimeService) {
  }

  ngOnInit(): void {
    this.dwellTimeService.dwellTimeSpinnerSize.subscribe(value => {
      this.diameterSpinner = value;
    });
  }

}
