import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Models
import { APIAlbums } from '../models/album-model';

// Services
import { GlobalService} from '../../../services/global.service';

@Injectable()
export class AlbumService {

  constructor(private globalService: GlobalService) {
  }

  /**
   * @param albumId
   *
   * Get album (selected by the user) information with a Query request (GlobalService)
   */
  public getAlbum(albumId: string): Observable<APIAlbums> {
    const albumUrl: string = `albums/${ albumId }`;

    return this.globalService.getQuery(albumUrl).pipe(
      map((res: APIAlbums) => {
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
