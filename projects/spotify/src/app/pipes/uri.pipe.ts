import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

@Pipe({
  name: 'uri'
})
export class UriPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer){
  }

  /**
   * @param value
   *
   * Audios will be displayed and played as a Spotify Widget.
   * To make use of them i need to make use of the uri;
   * This data (uri) can be retrieved from the Spotify API when making a request for a song album;
   *
   * It's very important than i verify the uri.
   * For this purpose i have created the 'Pipe' uri.pipe with which we verify that the uri is not harmful through the DomSanitizer;
   */
  transform( value: string): any {
    const url = 'https://open.spotify.com/embed?uri=';
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url + value );
  }

}
