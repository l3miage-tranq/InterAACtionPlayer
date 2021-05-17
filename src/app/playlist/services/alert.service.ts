import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertTitle = "";
  alertContent = "";
  alertCancel = false;

  constructor() {
  }

  /**
   * Allows to set the title and content of the alert message -> Merge request
   */
  setMergePlaylist(){
    this.alertTitle = "alert.titleMerge";
    this.alertContent = "alert.contentMerge";
  }

  /**
   * Allows to set the title and content of the alert message -> Delete request
   */
  setDeletePlaylist(){
    this.alertTitle = "alert.titleDelete";
    this.alertContent = "alert.contentDelete";
  }

  /**
   * Allows to set the title and content of the alert message -> Replace request
   */
  setReplacePlaylist(){
    this.alertTitle = "alert.titleReplace";
    this.alertContent = "alert.contentReplace"
  }

  /**
   * Allows to get the actual alertTitle
   */
  getAlertTitle(){
    return this.alertTitle;
  }

  /**
   * Allows to get the actual alertContent
   */
  getAlertContent(){
    return this.alertContent;
  }
}
