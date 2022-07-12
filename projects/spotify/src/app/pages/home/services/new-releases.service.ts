import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Import Models
 */
import { FormattedNewReleases, APINewReleases } from '../models/new-releases-model';

/**
 * Import Services
 */
import { GlobalService } from '../../../services/global.service';

@Injectable()
export class NewReleasesService {
  private newReleasesUrl: string = 'browse/new-releases';

  constructor(private globalService: GlobalService) {
  }

  /**
   * Allows to get the last new releases musics in spotify with Query request (GlobalService)
   */
  public getNewReleases(): Observable<FormattedNewReleases[]> {
    return this.globalService.getQuery(this.newReleasesUrl).pipe(
      map((res: APINewReleases) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          const formattedItems: FormattedNewReleases[] = res.albums.items.map((
            { id, images, name, artists, type }) => (
            { id, images, name, artists, type }
          ));
          return formattedItems;
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      }));
  }
}
