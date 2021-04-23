import { Injectable } from '@angular/core';
import { PlaylistService } from '../playlist/services/playlist.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  openRequest;
  playlistService: PlaylistService;
  themeService: ThemeService;

  constructor(playlistService: PlaylistService, themeService: ThemeService) {
    this.playlistService = playlistService;
    this.themeService = themeService;
    this.initPlaylist();
  }

  initPlaylist(){

    this.openRequest = indexedDB.open('SavePlaylist', 3);

    // Creation of Store
    this.openRequest.onupgradeneeded = event => {
      const db = event.target.result;
      const transaction = event.target.transaction;

      // Creation du Store de la Playlist
      if (!db.objectStoreNames.contains("Playlist")) {
        db.createObjectStore('Playlist', {autoIncrement: true});
        const playlistStore = transaction.objectStore('Playlist');
        playlistStore.add(this.playlistService.playList);
      }

      // Creation du Store du theme
      if (!db.objectStoreNames.contains("Theme")) {
        db.createObjectStore('Theme', {autoIncrement: true});
        const themeStore = transaction.objectStore('Theme');
        themeStore.add(this.themeService.theme);
      }
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Recupération de la Playlist enregistré
      const playlistStore = db.transaction(['Playlist'], 'readwrite').objectStore('Playlist').get(1);
      playlistStore.onsuccess = e => {
        this.playlistService.playList = playlistStore.result;
      };
      playlistStore.onerror = event => {
        alert('PlaylistStore error: ' + event.target.errorCode);
      };

      // Recupération du Thème enregistré
      const themeStore = db.transaction(['Theme'], 'readwrite').objectStore('Theme').get(1);
      themeStore.onsuccess = e => {
        this.themeService.emitTheme(themeStore.result);
      };
      themeStore.onerror = event => {
        alert('ThemeStore error: ' + event.target.errorCode);
      };
    };

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  updatePlaylist() {

    this.openRequest = indexedDB.open('SavePlaylist', 3);

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // UPDATE PLAYLIST
      const playlistStore = db.transaction(['Playlist'], 'readwrite');
      const playlistObjectStore = playlistStore.objectStore('Playlist');
      const storePlaylistRequest = playlistObjectStore.get(1);
      storePlaylistRequest.onsuccess = () => {
        playlistObjectStore.put(this.playlistService.playList, 1);
      };
    }

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  updateTheme(){

    this.openRequest = indexedDB.open('SavePlaylist', 3);

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // UPDATE THEME
      const themeStore = db.transaction(['Theme'], 'readwrite');
      const themeObjectStore = themeStore.objectStore('Theme');
      const storeThemeRequest = themeObjectStore.get(1);
      storeThemeRequest.onsuccess = () => {
        themeObjectStore.put(this.themeService.theme, 1);
      };
    }

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

}
