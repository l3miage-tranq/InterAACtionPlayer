import { Component, OnInit, Input } from '@angular/core';
import { Types } from '../../../../../../../src/app/playlist/model/types-interface';
import { PlaylistService} from '../../../../../../../src/app/playlist/services/playlist.service';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  @Input() videos: Types[];
  private notifier: NotifierService;
  private type: string = "YouTube";
  private playlistService: PlaylistService;

  constructor( notifier: NotifierService, playlistService : PlaylistService ) {
    this.notifier = notifier;
    this.playlistService = playlistService;
  }

  ngOnInit(): void {
  }

  addVideoToPlaylist(video: Types) {
    video.types = this.type;
    this.playlistService.addVideoYoutubeToPlaylist(video);
    this.notifier.notify('success', 'Video add to playlist');
  }

  deleteVideoToPlaylist(video: Types) {
    video.types = this.type;
    this.playlistService.deleteToPlaylist(video);
    this.notifier.notify('success', 'Video delete to playlist');
  }

  videoAlreadyAddToPlaylist(video: Types){
    video.types = this.type;
    return this.playlistService.alreadyInPlaylist(video);
  }
}
