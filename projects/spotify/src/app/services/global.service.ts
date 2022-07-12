import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';

@Injectable()
export class GlobalService {

  clientId = 'cf0aa060f87b4c6e9edb2a1e067fd86a';
  clientSecret = '5beabd4b8c67453b8770e1fe309a105f';
  redirectUriHome = "http://localhost:4200/home";
  redirectUriPlaylist = "https://interaactionplayer.imag.fr/stable/#/playlist";

  accessToken = this.getToken().subscribe(data => {this.accessToken = data['access_token'];});

  constructor(private http: HttpClient) {
  }

  /**
   * Allows the user to login with his Spotify account
   */
  public getLoginAccountSpotify(){
    const scope = 'user-read-private user-read-email';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(this.clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(this.redirectUriPlaylist);

    window.location.href = url;
  }

  /**
   * Allows the user to logout Spotify
   */
  public getLogoutAccountSpotify(){
    const spotifyLogoutWindow = window.open('https://accounts.spotify.com/en/logout', "spotifyLogoutWindow", "top=10000, left=10000, innerWidth=100, innerHeight=100" );
    setTimeout(() => spotifyLogoutWindow.close(), 500);
  }

  /**
   * Allows to recover the token that we use for Query request in Spotify Api
   */
  public getToken(){
    const authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    const body = 'grant_type=client_credentials';
    return this.http.post(authorizationTokenUrl, body, {
      headers: new HttpHeaders({
        Authorization:
          'Basic  ' + btoa(this.clientId + ':' + this.clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded;',
      }),
    });
  }

  /**
   * Allows to get login on the Spotify Api
   */
  public getLogin(){
    const authorizationLoginUrl = `https://accounts.spotify.com/authorize?`;
    const responseType = 'response_type=code';
    const redirectUri = 'redirect_uri=' + this.redirectUriHome;
    return this.http.get(authorizationLoginUrl + this.clientId + '&' + responseType + '&' + redirectUri);
  }

  /**
   * @param query
   *
   * Through HTTP request, i'm able to get specific information and work with asynchronous data management
   */
  public getQuery(query: string) {

    this.getLogin();

    // define common url
    const url = `https://api.spotify.com/v1/${query}`;

    // define header to specify token
    const headers = new HttpHeaders({
      'Authorization' : 'Bearer ' + this.accessToken
    });

    // execute request
    return this.http.get(url, { headers });
  }

  /**
   * @param uri
   *
   * Allow the user to play the current Spotify music
   */
  public playMusic(uri: string){
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/play',
      type: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      },
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        "uris": [`spotify:track:${uri}`]
      })
    });
  }

  /**
   * Allow the user to pause the current Spotify music
   */
  public pauseMusic(){
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/pause',
      type: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      }
    });
  }

  /**
   * @param value
   *
   * Allow the user to set the volume of the current Spotify musics
   */
  public setVolume(value: Number){
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/play',
      type: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      },
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        "volume_percent": value
      })
    });
  }
}
