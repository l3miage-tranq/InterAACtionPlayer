import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistService } from '../../services/playlist.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { SaveService } from '../../../services/save.service';

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
              private saveService: SaveService) {
  }

  ngOnInit(): void {
  }

  /**
   * If the user cancel the save then close the DialogComponent
   */
  public goCancel(){
    this.dialog.closeAll();
  }

  submit(){
    this.playlistService.playList = [];
    this.dialog.closeAll();
    this.saveService.updatePlaylist();
    this.notifier.notify('warning', this.translate.instant('notifier.delete'));
  }
}
