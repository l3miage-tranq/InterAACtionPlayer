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

  msaapDisplayTitle = true;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = true;
  msaapDisplayDuration = true;
  msaapDisablePositionSlider = true;
  msaapPlaylist: Track[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.msaapPlaylist = [
      {
        title: this.elemPlaylist.title,
        link: this.src,
        artist: this.elemPlaylist.artists
      },
    ];
  }

}
