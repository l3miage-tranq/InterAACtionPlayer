import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  test;

  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;
  private tracksUrl: string;

  headerOption = {
    "Access-Control-Allow-Origin": "*"
  }

  header = {
    headers: new HttpHeaders(this.headerOption),
  };

  constructor(private http: HttpClient) {
    //this.test = this.getLogin().subscribe(data => {this.test = data['code'];});
  }

  /*clientId = '479942';
  clientSecret = '5a82e56cd54b7c5da576b693f9853d6e';
  redirectUri = "http://localhost:4200/deezer";

  public getLogin(){
    const loginUrl = `https://connect.deezer.com/oauth/auth.php?`;
    const appId = "app_id=" + this.clientId;
    const redirectUri = '&redirect_uri=http://localhost:4200';
    const perms = '&perms=basic_access,email,offline_access';
    return this.http.get(loginUrl + appId + redirectUri + perms);
  }*/

  /**
   * @param artist
   *
   * Get all result who are in related to the artist the user want
   */
  searchMusic(artist: string): Observable<IResult[]> {
    const searchUrl = `https://api.deezer.com/search?q=${artist}&offset=0&limit=10&type=artist`;
    return this.http.get(searchUrl, this.header).pipe(map((res: any) => <IResult[]>res.data));
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
  getAlbums(albumArtistId: string): Observable<IAlbum[]> {
    this.albumsUrl = `https://api.deezer.com/artist/${albumArtistId}/albums`;
    return this.http.get(this.albumsUrl).pipe(map((res: any) => <IAlbum[]> res.data));
  }

  /**
   * @param albumId
   *
   * Get all information about the album the user want
   */
  getAlbum(albumId: string): Observable<IAlbum> {
    this.albumUrl = `https://api.deezer.com/album/${albumId}`;
    return this.http.get(this.albumUrl).pipe(map((res: any) => <IAlbum> res));
  }


  /**
   * @param trackAlbumId
   *
   * Get all tracks related to the album the user want
   */
  getTracks(trackAlbumId: string): Observable<ITrack[]> {
    this.tracksUrl = `https://api.deezer.com/album/${trackAlbumId}/tracks`;
    return this.http.get(this.tracksUrl).pipe(map((res: any) => <ITrack[]> res.data));
  }
}
