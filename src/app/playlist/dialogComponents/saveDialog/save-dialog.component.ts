import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveService } from '../../../services/save.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit {

  constructor(private dialog: MatDialog, private saveService: SaveService, private notifier: NotifierService) { }

  ngOnInit(): void {
  }

  /**
   * If the user submit, update the database, close the DialogComponent and notify that save is done;
   */
  public submit(){
    this.saveService.updatePlaylist();
    this.saveService.updateSettings();
    this.dialog.closeAll();
    this.notifier.notify('warning', 'Save Done !');
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }
}
