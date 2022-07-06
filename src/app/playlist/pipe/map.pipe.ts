/* istanbul ignore file */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapPipe'
})
export class MapPipe implements PipeTransform{

  /**
   * Receives a map of Playlist
   * Then return an array of the map
   */
  /* istanbul ignore next */
  transform(value: any, args: any[]): any {
    const result = [];

    if (value.entries){
      // tslint:disable-next-line:no-shadowed-variable
      value.forEach((key: any, value: any) => {
        result.push({key, value});
      });
    } else {
      for (const key in value){
        if (value.hasOwnProperty(key)){
          result.push({key, value: value[key]});
        }
      }
    }
    return result;
  }
}
