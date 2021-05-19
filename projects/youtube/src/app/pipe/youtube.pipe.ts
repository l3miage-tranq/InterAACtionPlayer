import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

@Pipe({
  name: 'yt'
})
export class YoutubePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){
  }

  /**
   * @param value -> ID of the video
   *
   * Receives the ID of the video and verifies security
   * Then return URL of the video verified and secured
   */
  transform( value: string): any {
    const url = "https://www.youtube-nocookie.com/embed/";
    const noSuggestVideo = "?rel=0";
    const jsApi = "&enablejsapi=1";
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url + value + noSuggestVideo + jsApi);
  }

}
