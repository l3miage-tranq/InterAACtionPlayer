import { Component, OnInit } from '@angular/core';
import { SaveService } from './services/save.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ProjectMultimedia';

  constructor(private saveService: SaveService) {
  }

  ngOnInit(): void {
    this.saveService.initPlaylist();
  }
}
