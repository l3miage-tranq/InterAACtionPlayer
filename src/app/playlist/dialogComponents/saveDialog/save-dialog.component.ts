import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveService } from '../../../services/save.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private saveService: SaveService,
              private notifier: NotifierService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  /**
   * If the user submit, allows the user to export the Playlist
   * Then close the DialogComponent and notify that the save is done;
   */
  public submit(){
    this.dialog.closeAll();
    this.notifier.notify('warning', this.translate.instant('notifier.save'));
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }
}
