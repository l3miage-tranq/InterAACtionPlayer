import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistService } from '../../services/playlist.service';
import { PrefabricatedPlaylistComponent } from '../prefabricatedPlaylist/prefabricated-playlist.component';

@Component({
  selector: 'app-dialog-choose-type',
  templateUrl: './dialog-choose-type.component.html',
  styleUrls: ['./dialog-choose-type.component.css']
})
export class DialogChooseTypeComponent implements OnInit {

  private router: Router;
  private dialog: MatDialog;
  private playlistService: PlaylistService;

  constructor(router: Router, dialog: MatDialog, playlistService: PlaylistService) {
    this.router = router;
    this.dialog = dialog;
    this.playlistService = playlistService;
  }

  ngOnInit(): void {
  }

  /**
   * Close all DialogComponents then on the web page Youtube
   */
  goYoutube(): void {
    this.playlistService.addBtnAddInEmptyPlaylist = false;
    this.dialog.closeAll();
    this.router.navigate(['/youtube']);
  }

  /**
   * Close all DialogComponents then on the web page Spotify
   */
  goSpotify() {
    this.playlistService.addBtnAddInEmptyPlaylist = false;
    this.dialog.closeAll();
    this.router.navigate(['/spotify']);
  }

  /**
   * Close all DialogComponents then on the web page Deezer
   */
  goDeezer(){
    this.playlistService.addBtnAddInEmptyPlaylist = false;
    this.dialog.closeAll();
    this.router.navigate(['/deezer']);
  }

  /**
   * Display the dialogComponent PrefabricatedPlaylist
   */
  goPrefabricatedPlaylist(){
    this.dialog.open(PrefabricatedPlaylistComponent);
  }
}
