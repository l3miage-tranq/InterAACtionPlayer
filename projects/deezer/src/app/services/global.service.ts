import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) {
  }

  clientId = 479942;
  clientSecret = '5a82e56cd54b7c5da576b693f9853d6e'
}
