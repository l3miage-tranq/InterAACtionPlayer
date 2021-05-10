import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public audioObservable = new Subject<boolean>();
  public volumeObservable = new Subject<number>();

  // if audioPlay == true -> audio player plays music else audio player pauses the music
  audioPlay = false;
  displayVolumeSlider = false;
  startVolume = 50; //min = 0 & max = 100
  volume = this.startVolume;

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
}
