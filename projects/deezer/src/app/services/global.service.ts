import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

/**
 * Import Models
 */
import { IAlbum } from '../models/ialbum';
import { IArtist } from '../models/iartist';
import { IResult } from '../models/iresult';
import { ITrack } from '../models/itrack';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private artistUrl: string;
  private albumsUrl: string;
  private tracksUrl: string;

  public idArtistChoose;
  public albumChoose;

  constructor(private http: HttpClient) {
  }

  /**
   * @param inputSearchBar
   *
   * Get all result who are in related to the artist the user want
   */
  searchMusic(inputSearchBar: string): Observable<IResult[]> {
    const searchUrl = `https://api.deezer.com/search/artist?q=${inputSearchBar}`;
    return this.http.get(searchUrl).pipe(map((res: any) => <IResult[]>res.data));
  }

  /**
   * @param artistId
   *
   * Get all information about the artist the user want
   */
  getArtist(artistId: string): Observable<IArtist> {
    this.artistUrl = `https://api.deezer.com/artist/${artistId}`;
    return this.http.get(this.artistUrl).pipe(map(res => <IArtist> res));
  }

  /**
   * @param albumArtistId
   *
   * Get all album who are related to the artist the user want
   */
  getListAlbums(albumArtistId: string): Observable<IAlbum[]> {
    this.albumsUrl = `https://api.deezer.com/artist/${albumArtistId}/albums`;
    return this.http.get(this.albumsUrl).pipe(map((res: any) => <IAlbum[]> res.data));
  }

  /**
   * @param albumId
   *
   * Get all tracks related to the album the user want
   */
  getTracksAlbum(albumId: string): Observable<ITrack[]> {
    this.tracksUrl = `https://api.deezer.com/album/${albumId}/tracks`;
    return this.http.get(this.tracksUrl).pipe(map((res: any) => <ITrack[]> res.data));
  }
}
