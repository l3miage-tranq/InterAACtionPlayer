import { Injectable } from '@angular/core';
import { PlaylistService } from '../playlist/services/playlist.service';
import { ThemeService } from './theme.service';
import { LanguageService } from './language.service';
import { DwelltimeService } from './dwelltime.service';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  openRequest;
  playlistService: PlaylistService;
  themeService: ThemeService;
  languageService: LanguageService;
  dwellTimeService: DwelltimeService;

  constructor(playlistService: PlaylistService, themeService: ThemeService, languageService: LanguageService, dwellTimeService: DwelltimeService) {
    this.playlistService = playlistService;
    this.themeService = themeService;
    this.languageService = languageService;
    this.dwellTimeService = dwellTimeService;
    this.initPlaylist();
  }

  /**
   * Initialize the database;
   * If the store we search does not exit then we create it;
   * Else we recovery the recorded elem in database
   */
  initPlaylist(){

    // Opening of the Database
    this.openRequest = indexedDB.open('SavePlaylist', 4);

    // Creation of Stores if the version changes
    this.openRequest.onupgradeneeded = event => {
      const db = event.target.result;
      const transaction = event.target.transaction;

      // Creation of Playlist Store if this one does not exist
      if (!db.objectStoreNames.contains("Playlist")) {
        db.createObjectStore('Playlist', {autoIncrement: true});
        const playlistStore = transaction.objectStore('Playlist');
        playlistStore.add(this.playlistService.playList);
      }

      // Creation of Theme Store if this one does not exist
      if (!db.objectStoreNames.contains("Theme")) {
        db.createObjectStore('Theme', {autoIncrement: true});
        const themeStore = transaction.objectStore('Theme');
        themeStore.add(this.themeService.theme);
      }

      // Creation of Language Store if this one does not exist
      if (!db.objectStoreNames.contains("Language")) {
        db.createObjectStore('Language', {autoIncrement: true});
        const languageStore = transaction.objectStore('Language');
        languageStore.add(this.languageService.activeLanguage);
      }

      // // Creation of DwellTime Store if this one does not exist
      if (!db.objectStoreNames.contains("DwellTime")) {
        db.createObjectStore('DwellTime', {autoIncrement: true});
        const dwellTimeStore = transaction.objectStore('DwellTime');
        dwellTimeStore.add(this.dwellTimeService.getConfiguration());
      }
    };

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Recovery of the recorded Playlist
      const playlistStore = db.transaction(['Playlist'], 'readwrite').objectStore('Playlist').get(1);
      playlistStore.onsuccess = e => {
        this.playlistService.playList = playlistStore.result;
      };
      playlistStore.onerror = event => {
        alert('PlaylistStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Theme
      const themeStore = db.transaction(['Theme'], 'readwrite').objectStore('Theme').get(1);
      themeStore.onsuccess = e => {
        this.themeService.emitTheme(themeStore.result);
      };
      themeStore.onerror = event => {
        alert('ThemeStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Language
      const languageStore = db.transaction(['Language'], 'readwrite').objectStore('Language').get(1);
      languageStore.onsuccess = e => {
        this.languageService.switchLanguage(languageStore.result);
      };
      languageStore.onerror = event => {
        alert('LanguageStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded DwellTime
      const dwellTimeStore = db.transaction(['DwellTime'], 'readwrite').objectStore('DwellTime').get(1);
      dwellTimeStore.onsuccess = e => {
        this.dwellTimeService.setConfiguration(dwellTimeStore.result);
      };
      dwellTimeStore.onerror = event => {
        alert('DwellTimeStore error: ' + event.target.errorCode);
      };
    };

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  /**
   * Allows to save the Playlist in the database
   */
  updatePlaylist() {

    // Opening of the database
    this.openRequest = indexedDB.open('SavePlaylist', 4);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Update Playlist Store
      const playlistStore = db.transaction(['Playlist'], 'readwrite');
      const playlistObjectStore = playlistStore.objectStore('Playlist');
      const storePlaylistRequest = playlistObjectStore.get(1);
      storePlaylistRequest.onsuccess = () => {
        playlistObjectStore.put(this.playlistService.playList, 1);
      };
    }

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  /**
   * Allows to save the Settings in the database
   */
  updateSettings(){

    // Opening of the database
    this.openRequest = indexedDB.open('SavePlaylist', 4);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Update Theme Store
      const themeStore = db.transaction(['Theme'], 'readwrite');
      const themeObjectStore = themeStore.objectStore('Theme');
      const storeThemeRequest = themeObjectStore.get(1);
      storeThemeRequest.onsuccess = () => {
        themeObjectStore.put(this.themeService.theme, 1);
      };

      // Update Language Store
      const languageStore = db.transaction(['Language'], 'readwrite');
      const languageObjectStore = languageStore.objectStore('Language');
      const storeLanguageRequest = languageObjectStore.get(1);
      storeLanguageRequest.onsuccess = () => {
        languageObjectStore.put(this.languageService.activeLanguage, 1);
      };

      // Update DwellTime Store
      const dwellTimeStore = db.transaction(['DwellTime'], 'readwrite');
      const dwellTimeObjectStore = dwellTimeStore.objectStore('DwellTime');
      const storeDwellTimeRequest = dwellTimeObjectStore.get(1);
      storeDwellTimeRequest.onsuccess = () => {
        dwellTimeObjectStore.put(this.dwellTimeService.getConfiguration(), 1);
      };
    }

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

}
