import { Injectable } from '@angular/core';
import {Types} from '../playlist/model/types-interface';
import {PlaylistService} from '../playlist/services/playlist.service';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  openRequest;
  playlistService: PlaylistService

  constructor(playlistService: PlaylistService) {
    this.playlistService = playlistService;
  }

  initPlaylist(){

    this.openRequest = indexedDB.open('SavePlaylist', 2);

    this.openRequest.onupgradeneeded = event => {

      // Creation of Store
      const db = event.target.result;
      const transaction = event.target.transaction;

      if (!db.objectStoreNames.contains("Playlist")) {
        db.createObjectStore('Playlist', {autoIncrement: true});
        const playlistStore = transaction.objectStore('Playlist');
        playlistStore.add(this.playlistService.playList);
      }
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      const gridStore = db.transaction(['Playlist'], 'readwrite').objectStore('Playlist').get(1);
      gridStore.onsuccess = e => {
        this.playlistService.playList = gridStore.result;
      };
      gridStore.onerror = e => {
      };
    };

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  updatePlaylist() {

    this.openRequest = indexedDB.open('SavePlaylist', 2);

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // UPDATE THE SCENE
      const scenesStore = db.transaction(['Playlist'], 'readwrite');
      const scenesObjectStore = scenesStore.objectStore('Playlist');
      const storeScenesRequest = scenesObjectStore.get(1);
      storeScenesRequest.onsuccess = () => {
        scenesObjectStore.put(this.playlistService.playList, 1);
      };
    }

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }
}
