import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { Types } from '../model/types-interface';
import * as $ from 'jquery';
import { AudioService } from '../services/audio.service';

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
  disablePositionSlider = false;

  constructor(private audioService: AudioService) {
  }

  /**
   * Add a event listener ("click" event) on the play-pause button of the audio-player
   * Load the Playlist with the local music selected
   */
  ngOnInit(): void {

    this.addEventPlayPause(this.audioService);

    this.playlist = [
      {
        title: this.elemPlaylist.title,
        link: this.src,
        artist: this.elemPlaylist.artists
      },
    ];
  }

  /**
   * @param audioService
   *
   * This event listener chek if a "click" event occur
   * If this is the case, then change the value of audioPlay in audioService
   */
  addEventPlayPause(audioService: AudioService){
    $('.play-pause').on("click", function(){
      audioService.audioPlay = !audioService.audioPlay;
    });
  }
}
