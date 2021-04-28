import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-choose-type',
  templateUrl: './dialog-choose-type.component.html',
  styleUrls: ['./dialog-choose-type.component.css']
})
export class DialogChooseTypeComponent implements OnInit {

  private router: Router;
  private dialog: MatDialog;

  constructor(router: Router, dialog: MatDialog) {
    this.router = router;
    this.dialog = dialog;
  }

  ngOnInit(): void {
  }

  /**
   * Close all DialogComponents then on the web page Youtube
   */
  goYoutube(): void {
    this.dialog.closeAll();
    this.router.navigate(['/youtube']);
  }

  /**
   * Close all DialogComponents then on the web page Spotify
   */
  goSpotify() {
    this.dialog.closeAll();
    this.router.navigate(['/spotify']);
  }

}
