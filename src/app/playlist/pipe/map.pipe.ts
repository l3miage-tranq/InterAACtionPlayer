/* istanbul ignore file */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapPipe'
})
export class MapPipe implements PipeTransform{
  /**
   * @param value
   * @param args
   *
   * Receives a map of Playlist
   * Then return a array of the map
   */
  /* istanbul ignore next */
  transform(value: any, args: any[]): any {
    let result = [];

    if (value.entries){
      value.forEach((key, value) => {
        result.push({key, value});
      });
    } else {
      for (let key in value){
        if (value.hasOwnProperty(key)){
          result.push({key, value: value[key]});
        }
      }
    }
    return result;
  }
}
