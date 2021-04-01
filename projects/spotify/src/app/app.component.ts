import {Component, OnInit} from '@angular/core';
import {GlobalService} from './services/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'spotify';

  constructor(private globalService: GlobalService, private router: Router) {
  }

  ngOnInit(): void {
    this.globalService.accessToken; //initialise le token
    setTimeout(() => this.router.navigate(['/spotify/home']) ,500 ); // attend que le token s'initialise bien
  }
}
