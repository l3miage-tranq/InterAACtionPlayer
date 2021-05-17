import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

/**
 * Import Services
 */
import { PlaylistService } from '../../services/playlist.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { SaveService } from '../../../services/save.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private playlistService: PlaylistService,
              private notifier: NotifierService,
              private translate: TranslateService,
              private saveService: SaveService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertService.setDeletePlaylist();
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }

  /**
   * If the user submit, display a alert message before
   * Then set the playlist to an empty array
   * Close all dialog open
   * Save the playlist in the database
   * Notify it with a message
   */
  submit(){
    const alertDialog = this.dialog.open(AlertComponent);
    alertDialog.afterClosed().subscribe(() => {
      if (!this.alertService.alertCancel){
        this.playlistService.playList = [];
        this.dialog.closeAll();
        this.saveService.updatePlaylist();
        this.notifier.notify('warning', this.translate.instant('notifier.delete'));
      }
    });
  }
}
