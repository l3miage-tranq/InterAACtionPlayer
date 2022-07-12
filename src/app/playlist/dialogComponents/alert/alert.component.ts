import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SaveService } from '../../../services/save.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alertTitle = "";
  alertContent = "";
  change: boolean;

  constructor(private alertService: AlertService,
              private dialogRef: MatDialogRef<AlertComponent>,
              private saveService: SaveService) {
    dialogRef.disableClose = true;
    this.change = false;
  }

  ngOnInit(): void {
    this.alertTitle = this.alertService.getAlertTitle();
    this.alertContent = this.alertService.getAlertContent();
  }

  /**
   * If the user submit, then set the variable to false
   * Then close this dialogComponent
   * And if the user check the check box "do not show again", then update settings
   */
  submit(){
    this.alertService.alertCancel = false;
    this.dialogRef.close();
    if (this.change){
      this.saveService.updateSettings();
    }
  }

  /**
   * If the user cancel, then set the variable to true
   * Then close this dialogComponent
   */
  goCancel(){
    this.alertService.alertCancel = true;
    this.dialogRef.close();
    if (this.change){
      this.saveService.updateSettings();
    }
  }

  /**
   * Allows to say the user don't want do see again the alert component
   */
  doNotShowAgain(){
    this.alertService.doNotShowAgain = !this.alertService.doNotShowAgain;
    this.change = true;
  }
}
