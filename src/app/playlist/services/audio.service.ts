import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Types } from '../model/types-interface';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public audioObservable = new Subject<boolean>();
  public audioPlayedObservable = new Subject<Types>();
  public volumeObservable = new Subject<number>();
  public unmutePlayerObservable = new Subject<boolean>();
  public statusSidebarPlayerObservable = new Subject<string>();
  public cancelSongObservable = new Subject<string>();

  displaySidebarPlayer = "displayCogBtn";
  displayVolumeSlider = false;
  startVolume = 50; //min = 0 & max = 100
  volume = this.startVolume;
  onPlay = false;

  constructor() {
  }

  /**
   * Notifies observers when value change then add value to theme variable
   */
  emitVolumeSlider(){
    this.audioObservable.next(this.displayVolumeSlider);
    this.displayVolumeSlider = !this.displayVolumeSlider;
  }

  /**
   * Notifies observers when the user want to decrease the volume of the current music
   */
  emitDecreaseVolume(){
    if (this.volume > 0){
      this.volume = this.volume - 5;
      if (this.volume < 0){
        this.volume = 0;
        this.volumeObservable.next(this.volume);
      }else {
        this.volumeObservable.next(this.volume);
      }
    }
  }

  /**
   * Notifies observers when the user want to increase the volume of the current music
   */
  emitIncreaseVolume(){
    if (this.volume < 100){
      this.volume = this.volume + 5;
      if (this.volume > 100){
        this.volume = 100;
        this.volumeObservable.next(this.volume);
      }else {
        this.volumeObservable.next(this.volume);
      }
    }
  }

  /**
   * Notifies observers when a new song is launch by the user
   */
  emitNewSong(song){
    this.audioPlayedObservable.next(song);
  }

  /**
   * Notifies observers to cancel the current song in the sidebar player
   */
  emitCancelSong(){
    this.cancelSongObservable.next("");
  }

  /**
   * Notifies observers to mute or not the sidebarPlayer
   */
  emitUnmutePlayer(value){
    (<HTMLIFrameElement> $("#sidebarYoutubePlayer")[0]).contentWindow.postMessage('{"event":"command","func":"setVolume","args":[' + this.volume + ']}', '*');
    this.unmutePlayerObservable.next(value);
  }

  /**
   * Notifies observers to display or not the sidebarPlayer
   */
  emitStatusSidebarPlayer(value){
    this.statusSidebarPlayerObservable.next(value);
  }
}
