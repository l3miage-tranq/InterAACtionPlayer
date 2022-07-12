import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Import Services
 */
import { GlobalService} from '../../../services/global.service';

/**
 * Import Modules
 */
import { APIArtist } from '../models/artist-model';
import { APIArtistTracks } from '../models/artist-top-track-model';
import { APIArtistAlbums, AlbumItem } from '../models/artist-albums';

@Injectable()
export class ArtistService {

  constructor(private globalService: GlobalService) {
  }

  /**
   * @param artistId
   *
   * Get artist (selected by the user) information with Query request (GlobalService)
   */
  public getArtist(artistId: string): Observable<APIArtist> {
    const artistUrl: string = `artists/${ artistId }`;

    return this.globalService.getQuery(artistUrl).pipe(
      map((res: APIArtist) => {
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

  /**
   * @param artistId
   *
   * Get artist (selected by the user) Top Tracks with Query request (GlobalService)
   */
  public getTopTracks(artistId: string): Observable<APIArtistTracks[]> {
    const artistUrl: string = `artists/${ artistId }/top-tracks?country=us`;

    return this.globalService.getQuery(artistUrl).pipe(
      map((res: APIArtistTracks[]) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          return res['tracks'];
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      }));
  }

  /**
   * @param artistId
   *
   * Get artist (selected by the user) albums with Query request (GlobalService)
   */
  public getAlbums(artistId: string): Observable<AlbumItem[]> {
    const albumUrl: string = `artists/${ artistId }/albums`;

    return this.globalService.getQuery(albumUrl).pipe(
      map((res: APIArtistAlbums) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          return res.items;
        }
      }),
      catchError((err) => {
        throw new Error(err.message);
      }));
  }
}
