import { Component, Input, OnInit } from '@angular/core';

/**
 * Import functions javascript
 */
declare var initDeezer: any;
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
    setTrack(this.id);
    setTimeout(() => {
      initDeezer();
    }, 500);
  }
}
