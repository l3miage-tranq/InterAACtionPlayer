import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../../shared/models/search.interface'
import { PlaylistService } from '../../../../../../../src/app/playlist/services/playlist.service';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  @Input() videos: Video[];
  private notifier: NotifierService;
  private playlistService: PlaylistService;

  constructor( notifier: NotifierService, playlistService : PlaylistService ) {
    this.notifier = notifier;
    this.playlistService = playlistService;
  }

  ngOnInit(): void {
  }

  addVideoToPlaylist(video: Video) {
    this.playlistService.addVideoYoutubeToPlaylist(video);
    this.notifier.notify('success', 'Video add to playlist');
  }

  deleteVideoToPlaylist(video: Video) {
    this.playlistService.deleteVideoYoutubeToPlaylist(video);
    this.notifier.notify('success', 'Video delete to playlist');
  }

  videoAlreadyAddToPlaylist(video: Video){
    return this.playlistService.videoYoutubeAlreadyInPlaylist(video);
  }
}
