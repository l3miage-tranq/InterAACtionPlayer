import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../../shared/models/search.interface'
import { PlaylistService } from '../../../../../../../src/app/playlist/services/playlist.service';
import { NotifierService } from "angular-notifier";
import { SaveService } from '../../../../../../../src/app/services/save.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  @Input() videos: Video[];
  private notifier: NotifierService;
  private playlistService: PlaylistService;
  private saveService: SaveService;

  constructor( notifier: NotifierService, playlistService : PlaylistService, saveService: SaveService ) {
    this.notifier = notifier;
    this.playlistService = playlistService;
    this.saveService = saveService;
  }

  ngOnInit(): void {
  }

  addVideoToPlaylist(video: Video) {
    this.playlistService.addVideoYoutubeToPlaylist(video);
    this.notifier.notify('success', 'Video add to playlist');
    this.saveService.updatePlaylist();
  }

  deleteVideoToPlaylist(video: Video) {
    this.playlistService.deleteVideoYoutubeToPlaylist(video);
    this.notifier.notify('success', 'Video delete to playlist');
    this.saveService.updatePlaylist();
  }

  videoAlreadyAddToPlaylist(video: Video){
    return this.playlistService.videoYoutubeAlreadyInPlaylist(video);
  }
}
