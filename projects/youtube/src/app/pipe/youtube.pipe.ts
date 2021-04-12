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
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url + value );
  }

}
