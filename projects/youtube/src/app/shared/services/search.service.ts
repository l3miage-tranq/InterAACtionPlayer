import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_TOKEN = 'AIzaSyAmLmgM_a0-mENqVa9YGJlYs-ampbTxDKc';
  private nbMaxValue = '12';

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
    const url = `${this.API_URL}?q=${query}&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=${this.nbMaxValue}`;
    return this.http.get(url)
      .pipe(
        map((response: any) => response.items)
      );
  }
}
