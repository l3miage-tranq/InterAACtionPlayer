import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { Types } from '../model/types-interface';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  @Input() elemPlaylist: Types;
  @Input() src;

  playlist: Track[] = [];
  displayTitle = true;
  enableAutoplay = false;
  displayPlayList = false;
  displayArtist = true;
  displayDuration = true;
  enableExpanded = true;
  displayVolumeControls = true;
  displayRepeatControls = false;
  disablePositionSlider = true;

  constructor() {
  }

  /**
   * Load the Playlist with the local music selected
   */
  ngOnInit(): void {
    this.playlist = [
      {
        title: this.elemPlaylist.title,
        link: this.src,
        artist: this.elemPlaylist.artists
      },
    ];
  }

}
