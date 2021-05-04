import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  // if audioPlay == true -> audio player plays music else audio player pauses the music
  audioPlay = false;

  constructor() { }
}
