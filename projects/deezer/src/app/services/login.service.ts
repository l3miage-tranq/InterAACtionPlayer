import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  id = "479942";
  secretKey = "5a82e56cd54b7c5da576b693f9853d6e";

  accessCode = this.getCodeDeezer().subscribe(data =>  {
    this.accessCode = data['code'];
  });

  /*accessToken = this.getTokenDeezer().subscribe(data => {
    this.accessToken = data['access_token'];
    console.log(data['access_token']);
  });*/

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      let code = params['code'];
      console.log(code);
    });
  }

  getCodeDeezer(){
    const codeUrl = "https://connect.deezer.com/oauth/auth.php?";
    const appId = "app_id=" + this.id;
    const redirectUri = "&redirect_uri=http://localhost:4200";
    const perms = "&perms=offline_access";
    return this.http.get(codeUrl + appId + redirectUri + perms);
  }

  /*getTokenDeezer(){
    const tokenUrl = "https://connect.deezer.com/oauth/access_token.php?";
    const appId = "app_id=" + this.id;
    const secret = "&secret=" + this.secretKey;
    const code = "&code=" + this.accessCode;
    return this.http.get(tokenUrl + appId + secret + code);
  }*/
}
