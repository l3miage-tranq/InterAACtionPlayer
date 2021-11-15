import { Component, OnInit } from '@angular/core';
import { LoginNotificationService } from "../playlist/services/login-notification.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-spotify-redirect',
  templateUrl: './spotify-redirect.component.html',
  styleUrls: ['./spotify-redirect.component.css']
})
export class SpotifyRedirectComponent implements OnInit {

  constructor(private loginNotification: LoginNotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginNotification.logOnSpotify = true;
    this.router.navigate(["/playlist"]);
  }
}
