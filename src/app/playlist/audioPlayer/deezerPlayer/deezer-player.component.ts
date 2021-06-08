import { Component, Input, OnInit } from '@angular/core';

declare var setTrack: any;
declare var initDeezer: any;

@Component({
  selector: 'app-deezer-player',
  templateUrl: './deezer-player.component.html',
  styleUrls: ['./deezer-player.component.css']
})
export class DeezerPlayerComponent implements OnInit {

  @Input() id;

  constructor() { }

  ngOnInit(): void {
    setTrack(this.id);
    initDeezer();
  }

}
