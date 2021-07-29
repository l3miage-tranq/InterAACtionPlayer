import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistService } from '../../services/playlist.service';
import { PrefabricatedPlaylistComponent } from '../prefabricatedPlaylist/prefabricated-playlist.component';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-dialog-choose-type',
  templateUrl: './dialog-choose-type.component.html',
  styleUrls: ['./dialog-choose-type.component.css']
})
export class DialogChooseTypeComponent implements OnInit {

  playlistEmpty = false;

  private router: Router;
  private dialog: MatDialog;
  private playlistService: PlaylistService;
  private audioService: AudioService;

  constructor(router: Router, dialog: MatDialog, playlistService: PlaylistService, audioService: AudioService) {
    this.router = router;
    this.dialog = dialog;
    this.playlistService = playlistService;
    this.audioService = audioService;
  }

  ngOnInit(): void {
    this.playlistEmpty = this.playlistService.playList.length == 0;
  }

  /**
   * Close all DialogComponents then on the web page Youtube
   */
  goYoutube(): void {
    this.audioService.emitUnmutePlayer(true);
    this.playlistService.addBtnAddInEmptyPlaylist = false;
    this.dialog.closeAll();
    this.router.navigate(['/youtube']);
    this.audioService.emitStatusSidebarPlayer("");
  }

  /**
   * Close all DialogComponents then on the web page Spotify
   */
  goSpotify() {
    this.audioService.emitUnmutePlayer(true);
    this.playlistService.addBtnAddInEmptyPlaylist = false;
    this.dialog.closeAll();
    this.router.navigate(['/spotify']);
    this.audioService.emitStatusSidebarPlayer("");
  }

  /**
   * Close all DialogComponents then on the web page Deezer
   */
  goDeezer(){
    this.audioService.emitUnmutePlayer(true);
    this.playlistService.addBtnAddInEmptyPlaylist = false;
    this.dialog.closeAll();
    this.router.navigate(['/deezer']);
    this.audioService.emitStatusSidebarPlayer("");
  }

  /**
   * Display the dialogComponent PrefabricatedPlaylist
   */
  goPrefabricatedPlaylist(){
    this.dialog.open(PrefabricatedPlaylistComponent);
  }
}
