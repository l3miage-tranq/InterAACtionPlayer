import { Component, Input, OnInit } from '@angular/core';

/**
 * Import functions javascript
 */
declare var initDZPlayer: any;
declare var setTrack: any;

@Component({
  selector: 'app-deezer-player',
  templateUrl: './deezer-player.component.html',
  styleUrls: ['./deezer-player.component.css']
})
export class DeezerPlayerComponent implements OnInit {

  @Input() id; //id of the music we want to listen

  constructor() {
  }

  /**
   * Add the current music in the audio player Deezer
   * Then init deezer audio player
   */
  ngOnInit(): void {
    setTimeout(() => {
      setTrack(this.id);
      initDZPlayer();
    }, 500);
  }
}
