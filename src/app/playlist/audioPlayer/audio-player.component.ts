import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { Types } from '../model/types-interface';
import * as $ from 'jquery';
import { AudioService } from '../services/audio.service';

declare var initVisualizer: any; //function in the javascript file

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
  volume = 50;

  constructor(private audioService: AudioService) {
    this.volume = audioService.startVolume;
  }

  /**
   * Initialise the visualizer
   * Adjust the size of the display number
   * Set the volume;
   * Subscribe to the displayVolumeSlider in audioService, then show or hide the volume slider;
   * Subscribe to the volumeValue in audioService, then increase or decrease the volume of the current music
   * Add a event listener ("click" event) on the play-pause button of the audio-player
   * Add a event listener ("click" event) on the volume button of the audio-player
   * Load the Playlist with the local music selected
   */
  ngOnInit(): void {

    this.initVisualizer();

    $(document).ready(function(){
      $(".ngx-px-1").css("font-size", "25px");
    });

    this.setVolume(this.volume);
    this.audioService.volumeObservable.subscribe(value => {
      this.setVolume(value);
    });
    this.audioService.audioObservable.subscribe( value => {
      if (value){
        this.setVolume(this.volume);
        $('#volumeSlider').css("opacity", "1");
      }else {
        $('#volumeSlider').css("opacity", "0");
      }
    });

    this.addEventPlayPause(this.audioService);
    this.addEventVolume(this.audioService);

    this.playlist = [
      {
        title: this.elemPlaylist.title,
        link: this.src,
        artist: this.elemPlaylist.artists
      },
    ];
  }

  /**
   * @param value
   *
   * Get the value of the mat-slider
   * And use it to set the volume with this value
   */
  setVolume(value: number){
    this.volume = value;
    $(document).ready(function(){
      $("audio").prop("volume", value / 100);
    });
    this.audioService.volume = value;
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

  /**
   * @param audioService
   *
   * When the document is ready, add an event listener on the "Volume" button of the ngx-audio-player
   * Then on a click event, call the function emitVolumeSlider
   */
  addEventVolume(audioService: AudioService){
    $(document).ready(function(){
      $('.volume').on("click", function(e){
        audioService.emitVolumeSlider();
      });
    });
  }

  /**
   * Allows to initialise the visualizer
   */
  initVisualizer(){
    $(document).ready(function(){
      $("audio").attr('id', 'audio');
      initVisualizer();
    });
  }
}
