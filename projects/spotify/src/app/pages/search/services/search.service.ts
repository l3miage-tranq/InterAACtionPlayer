import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Import Services
 */
import { GlobalService } from '../../../services/global.service';

/**
 * Import Models
 */
import { APISearch } from '../models/search-model';

@Injectable()
export class SearchService {

  constructor(private globalService: GlobalService) {
  }

  /**
   * @param term
   *
   * Get both tracks and artist from Spotify
   */
  public getTracksAndArtists(term: string): Observable<APISearch[]> {
    const searchUrl: string = `search?q=${ term }&type=track%2Cartist`;

    return this.globalService.getQuery(searchUrl).pipe(
      map((res: APISearch[]) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          return res;
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      }));
  }
}
