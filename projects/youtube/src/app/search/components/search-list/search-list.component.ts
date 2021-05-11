import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../../shared/models/search.interface'
import { PlaylistService } from '../../../../../../../src/app/playlist/services/playlist.service';
import { NotifierService } from "angular-notifier";
import { SaveService } from '../../../../../../../src/app/services/save.service';
import { ThemeService } from '../../../../../../../src/app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  theme = "";
  nbDisplayValue;

  @Input() videos: Video[];
  private notifier: NotifierService;
  private playlistService: PlaylistService;
  private saveService: SaveService;
  private themeService: ThemeService;
  private translate: TranslateService;
  private searchService: SearchService;

  constructor( notifier: NotifierService,
               playlistService : PlaylistService,
               saveService: SaveService,
               themeService: ThemeService,
               translate: TranslateService,
               searchService: SearchService) {
    this.notifier = notifier;
    this.playlistService = playlistService;
    this.saveService = saveService;
    this.themeService = themeService;
    this.theme = this.themeService.theme;
    this.translate = translate;
    this.searchService = searchService;
    this.nbDisplayValue = searchService.nbDisplayDefault;
  }

  /**
   * Subscribe to the nbDisplayElem for know how much video we need to display
   */
  ngOnInit(): void {
    this.searchService.nbDisplayElem.subscribe(value => {
      this.nbDisplayValue = value;
    })
  }

  /**
   * @param video
   *
   * Add the video selected in the Playlist;
   * Then notify the user that the video is added to the playlist;
   * And save the playlist in the database Playlist Store.
   */
  addVideoToPlaylist(video: Video) {
    this.playlistService.addVideoYoutubeToPlaylist(video);
    this.notifier.notify('success', this.translate.instant('notifier.addVideo'));
    this.saveService.updatePlaylist();
  }

  /**
   * @param video
   *
   * Delete the video selected to the Playlist;
   * Then notify the user that the video is deleted to the playlist;
   * And save the playlist in the database Playlist Store.
   */
  deleteVideoToPlaylist(video: Video) {
    this.playlistService.deleteVideoYoutubeToPlaylist(video);
    this.notifier.notify('success', this.translate.instant('notifier.deleteVideo'));
    this.saveService.updatePlaylist();
  }

  /**
   * @param video
   *
   * Check if the video is already in the playlist;
   */
  videoAlreadyAddToPlaylist(video: Video){
    return this.playlistService.videoYoutubeAlreadyInPlaylist(video);
  }
}
