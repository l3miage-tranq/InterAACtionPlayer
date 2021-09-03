import { Component, OnInit } from '@angular/core';
import { SearchService} from '../../shared/services/search.service';
import { Video} from '../../shared/models/search.interface';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent implements OnInit{

  inputValue = "";
  inputTouched = false;
  loading = false;
  moreVideo = false;
  videos: Video[] = [];

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
  }

  /**
   * @param inputValue
   *
   * The 'handleSearch' method takes in the user input as an argument.
   * It then communicates with the 'getVideos' method in the searchService passing in the input value as an argument;
   *
   * The 'subscribe' function invokes the searchService call and the response from the 'getVideos' method is passed to it as the items argument;
   * Then i filter out the necessary values needed and add that to the videos array component.
   *
   * Finally, I show the button who allow to display more videos
   */
  handleSearch(inputValue: string) {
    this.inputValue = inputValue;
    this.loading = true;
    this.searchService.getVideos(inputValue)
      .subscribe((items: any) => {
        this.videos = items.map(item => {
          return {
            title: item.snippet.title,
            videoId: item.id.videoId,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            channelId: item.snippet.channelId,
            channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url
          };
        });
        this.inputTouched = true;
        this.loading = false;
        this.moreVideo = true;
      });
  }
}
