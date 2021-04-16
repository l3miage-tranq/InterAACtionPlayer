import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

@Pipe({
  name: 'yt'
})
export class YoutubePipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer){ /*empty*/ }

  // receives url and verifies security
  transform( value: string): any {
    const url = "https://www.youtube-nocookie.com/embed/";
    const noSuggestVideo = "?rel=0";
    const jsApi = "&enablejsapi=1";
    const mute = "&mute=1";
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url + value + noSuggestVideo + jsApi + mute);
  }

}
