import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

@Pipe({
  name: 'dz'
})
export class DeezerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){
  }

  /**
   * @param value -> ID of the video
   *
   * Receives the ID of the song and verifies security
   * Then return URL of the song verified and secured
   */
  transform(value: string): any {
    const url = "https://widget.deezer.com/widget/dark/track/";
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }

}
