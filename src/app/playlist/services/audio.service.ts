import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public audioObservable = new Subject<boolean>()

  // if audioPlay == true -> audio player plays music else audio player pauses the music
  audioPlay = false;
  displayVolumeSlider = false;
  startVolume = 50; //min = 0 & max = 100

  constructor() {
  }

  /**
   * Notifies observers when value change then add value to theme variable
   */
  emitVolumeSlider(){
    this.audioObservable.next(this.displayVolumeSlider);
    this.displayVolumeSlider = !this.displayVolumeSlider;
  }
}
