import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';

@Injectable() // provide service in module
export class GlobalService {

  constructor(private http: HttpClient) { /*empty*/ }

  clientId = 'cf0aa060f87b4c6e9edb2a1e067fd86a';
  clientSecret = '5beabd4b8c67453b8770e1fe309a105f';
  accessToken = this.getToken().subscribe(data => {this.accessToken = data['access_token'];});

  public getToken(){
    const authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    const body = 'grant_type=client_credentials';
    return this.http.post(authorizationTokenUrl, body, {
      headers: new HttpHeaders({
        Authorization:
          'Basic  ' + btoa(this.clientId + ':' + this.clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded;',
      }),
    })
  }

  public getLogin(){
    const authorizationLoginUrl = `https://accounts.spotify.com/authorize?`;
    const responseType = 'response_type=code';
    const redirectUri = 'redirect_uri=http://localhost:4200/home'
    return this.http.get(authorizationLoginUrl + this.clientId + '&' + responseType + '&' + redirectUri)
  }

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

  public pauseMusic(){
    $.ajax({
      url: 'https://api.spotify.com/v1/me/player/pause',
      type: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      }
    });
  }
}
