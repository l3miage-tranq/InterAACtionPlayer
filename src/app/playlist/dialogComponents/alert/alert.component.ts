import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alertTitle = "";
  alertContent = "";

  constructor(private alertService: AlertService,
              private dialogRef: MatDialogRef<AlertComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.alertTitle = this.alertService.getAlertTitle();
    this.alertContent = this.alertService.getAlertContent();
  }

  /**
   * If the user submit, then set the variable to false
   * Then close this dialogComponent
   */
  submit(){
    this.alertService.alertCancel = false;
    this.dialogRef.close();
  }

  /**
   * If the user cancel, then set the variable to true
   * Then close this dialogComponent
   */
  goCancel(){
    this.alertService.alertCancel = true;
    this.dialogRef.close();
  }
}
