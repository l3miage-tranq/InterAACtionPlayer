import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public nbDisplayElem = new Subject<number>()
  public nbDisplayDefault = 12;
  private nbDisplay = this.nbDisplayDefault;

  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_TOKEN = 'AIzaSyAmLmgM_a0-mENqVa9YGJlYs-ampbTxDKc';
  private nbMaxValue = '50'; //min = 0 and max = 50

  constructor(private http: HttpClient) {
  }

  /**
   * @param query
   *
   * This method receives a search query string;
   * Then uses the 'http get' method to send off a request to the url constructed;
   * It returns a response that we handle whit the 'map' operator;
   * The list of YouTube video details is expected to be located in the 'response.items' object;
   * Since we're just interested in that, we return it and discard the other parts
   */
  getVideos(query: string): Observable <any> {
    this.emitNbDisplayValueDefault();
    const url = `${this.API_URL}?q=${query}&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=${this.nbMaxValue}`;
    return this.http.get(url)
      .pipe(
        map((response: any) => response.items)
      );
  }

  /**
   * Allow to increase by 8 the number of video to display
   * It's +8 because a line can contains 4 elements, so that makes 2 lines
   */
  emitIncreaseNbDisplayValue(){
    this.nbDisplay = this.nbDisplay + 8;
    this.nbDisplayElem.next(this.nbDisplay);
  }

  /**
   * When we launch a new search, we reset the number of element displayed
   */
  emitNbDisplayValueDefault(){
    this.nbDisplay = this.nbDisplayDefault;
    this.nbDisplayElem.next(this.nbDisplayDefault);
  }
}
