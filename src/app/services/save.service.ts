import { Injectable } from '@angular/core';

/**
 * Import Services
 */
import { PlaylistService } from '../playlist/services/playlist.service';
import { ThemeService } from './theme.service';
import { LanguageService } from './language.service';
import { DwelltimeService } from './dwelltime.service';
import { AlertService } from '../playlist/services/alert.service';
import { UsersService } from './users.service';
import {Types} from "../playlist/model/types-interface";

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  version = 8;

  openRequest;
  playlistService: PlaylistService;
  themeService: ThemeService;
  languageService: LanguageService;
  dwellTimeService: DwelltimeService;
  alertService: AlertService;
  userService: UsersService;

  //Informations of user
  playlistUser;
  namePlaylistUser;
  themeUser;
  languageUser;
  dwellTimeUser;
  alertMessageUser;
  mapPlaylistUser;

  constructor(playlistService: PlaylistService,
              themeService: ThemeService,
              languageService: LanguageService,
              dwellTimeService: DwelltimeService,
              alertService: AlertService,
              userService: UsersService) {
    this.playlistService = playlistService;
    this.themeService = themeService;
    this.languageService = languageService;
    this.dwellTimeService = dwellTimeService;
    this.alertService = alertService;
    this.userService = userService;
    this.init();
  }

  /**
   * Initialize the database;
   * If the store we search does not exit then we create it;
   */
  init(){

    // Opening of the Database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

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

      // Creation of PlaylistName Store if this one does not exist
      if (!db.objectStoreNames.contains("PlaylistName")) {
        db.createObjectStore('PlaylistName', {autoIncrement: true});
        const playlistStore = transaction.objectStore('PlaylistName');
        playlistStore.add(this.playlistService.nameActualPlaylist);
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

      // Creation of DwellTime Store if this one does not exist
      if (!db.objectStoreNames.contains("DwellTime")) {
        db.createObjectStore('DwellTime', {autoIncrement: true});
        const dwellTimeStore = transaction.objectStore('DwellTime');
        dwellTimeStore.add(this.dwellTimeService.getConfiguration());
      }

      // Creation of Alert Message Store if this one does not exist
      if (!db.objectStoreNames.contains("alertMessage")) {
        db.createObjectStore('alertMessage', {autoIncrement: true});
        const alertMessageStore = transaction.objectStore('alertMessage');
        alertMessageStore.add(this.alertService.doNotShowAgain);
      }

      // Creation of mapPlaylist Store if this one does not exist
      if (!db.objectStoreNames.contains("mapPlaylist")) {
        db.createObjectStore('mapPlaylist', {autoIncrement: true});
        const mapPlaylistStore = transaction.objectStore('mapPlaylist');
        mapPlaylistStore.add(this.playlistService.mapPlaylist);
      }

      // Creation of User Store if this one does not exist
      if (!db.objectStoreNames.contains("user")) {
        db.createObjectStore('user', {autoIncrement: true});
        const userStore = transaction.objectStore('user');
        userStore.add(this.userService.getConfiguration());
      }

      // Creation of ListUsers Store if this one does not exist
      if (!db.objectStoreNames.contains("listUsers")) {
        db.createObjectStore('listUsers', {autoIncrement: true});
        const listUsersStore = transaction.objectStore('listUsers');
        listUsersStore.add(this.userService.listUsers);
      }
    };

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Recovery of User
      const userStore = db.transaction(['user'], 'readwrite').objectStore('user').get(1);
      userStore.onsuccess = e => {
        this.userService.setConfiguration(userStore.result);
      };
      /* istanbul ignore next */
      userStore.onerror = event => {
        alert('userStore error: ' + event.target.errorCode);
      };

      // Recovery of ListUsers
      const listUsersStore = db.transaction(['listUsers'], 'readwrite').objectStore('listUsers').get(1);
      listUsersStore.onsuccess = e => {
        this.userService.listUsers = listUsersStore.result;
      };
      /* istanbul ignore next */
      listUsersStore.onerror = event => {
        alert('listUsersStore error: ' + event.target.errorCode);
      };
    }
  }

  /**
   * We recovery the recorded elem of playlist in database
   */
  initPlaylist(idUser){

    // Opening of the Database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Recovery of the recorded Playlist
      const playlistStore = db.transaction(['Playlist'], 'readwrite').objectStore('Playlist').get(idUser);
      playlistStore.onsuccess = e => {
        this.playlistService.playList = playlistStore.result;
      };
      /* istanbul ignore next */
      playlistStore.onerror = event => {
        alert('PlaylistStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Playlist name
      const playlistNameStore = db.transaction(['PlaylistName'], 'readwrite').objectStore('PlaylistName').get(idUser);
      playlistNameStore.onsuccess = e => {
        this.playlistService.nameActualPlaylist = playlistNameStore.result;
      };
      /* istanbul ignore next */
      playlistNameStore.onerror = event => {
        alert('playlistNameStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Theme
      const themeStore = db.transaction(['Theme'], 'readwrite').objectStore('Theme').get(idUser);
      themeStore.onsuccess = e => {
        this.themeService.emitTheme(themeStore.result);
      };
      /* istanbul ignore next */
      themeStore.onerror = event => {
        alert('ThemeStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Language
      const languageStore = db.transaction(['Language'], 'readwrite').objectStore('Language').get(idUser);
      languageStore.onsuccess = e => {
        this.languageService.switchLanguage(languageStore.result);
      };
      /* istanbul ignore next */
      languageStore.onerror = event => {
        alert('LanguageStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded DwellTime
      const dwellTimeStore = db.transaction(['DwellTime'], 'readwrite').objectStore('DwellTime').get(idUser);
      dwellTimeStore.onsuccess = e => {
        this.dwellTimeService.setConfiguration(dwellTimeStore.result);
      };
      /* istanbul ignore next */
      dwellTimeStore.onerror = event => {
        alert('DwellTimeStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Alert Message
      const alertMessageStore = db.transaction(['alertMessage'], 'readwrite').objectStore('alertMessage').get(idUser);
      alertMessageStore.onsuccess = e => {
        this.alertService.doNotShowAgain = alertMessageStore.result;
      };
      /* istanbul ignore next */
      alertMessageStore.onerror = event => {
        alert('alertMessageStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded mapPlaylist
      const mapPlaylistStore = db.transaction(['mapPlaylist'], 'readwrite').objectStore('mapPlaylist').get(idUser);
      mapPlaylistStore.onsuccess = e => {
        this.playlistService.mapPlaylist = mapPlaylistStore.result;
      };
      /* istanbul ignore next */
      mapPlaylistStore.onerror = event => {
        alert('mapPlaylistStore error: ' + event.target.errorCode);
      };
    };

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  /**
   * We recovery the recorded elem of playlist in database
   */
  initPlaylistAFSR(){

    // Opening of the Database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Recovery of the recorded Playlist
      const playlistStore = db.transaction(['Playlist'], 'readwrite').objectStore('Playlist').get(this.userService.idUser);
      playlistStore.onsuccess = e => {
        this.playlistService.playList = playlistStore.result;
      };
      /* istanbul ignore next */
      playlistStore.onerror = event => {
        alert('PlaylistStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Playlist name
      const playlistNameStore = db.transaction(['PlaylistName'], 'readwrite').objectStore('PlaylistName').get(this.userService.idUser);
      playlistNameStore.onsuccess = e => {
        this.playlistService.nameActualPlaylist = playlistNameStore.result;
      };
      /* istanbul ignore next */
      playlistNameStore.onerror = event => {
        alert('playlistNameStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Theme
      const themeStore = db.transaction(['Theme'], 'readwrite').objectStore('Theme').get(this.userService.idUser);
      themeStore.onsuccess = e => {
        this.themeService.emitTheme(themeStore.result);
      };
      /* istanbul ignore next */
      themeStore.onerror = event => {
        alert('ThemeStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded DwellTime
      const dwellTimeStore = db.transaction(['DwellTime'], 'readwrite').objectStore('DwellTime').get(this.userService.idUser);
      dwellTimeStore.onsuccess = e => {
        this.dwellTimeService.setConfiguration(dwellTimeStore.result);
      };
      /* istanbul ignore next */
      dwellTimeStore.onerror = event => {
        alert('DwellTimeStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Alert Message
      const alertMessageStore = db.transaction(['alertMessage'], 'readwrite').objectStore('alertMessage').get(this.userService.idUser);
      alertMessageStore.onsuccess = e => {
        this.alertService.doNotShowAgain = alertMessageStore.result;
      };
      /* istanbul ignore next */
      alertMessageStore.onerror = event => {
        alert('alertMessageStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded mapPlaylist
      const mapPlaylistStore = db.transaction(['mapPlaylist'], 'readwrite').objectStore('mapPlaylist').get(this.userService.idUser);
      mapPlaylistStore.onsuccess = e => {
        this.playlistService.mapPlaylist = mapPlaylistStore.result;
      };
      /* istanbul ignore next */
      mapPlaylistStore.onerror = event => {
        alert('mapPlaylistStore error: ' + event.target.errorCode);
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
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Update Playlist Store
      const playlistStore = db.transaction(['Playlist'], 'readwrite');
      const playlistObjectStore = playlistStore.objectStore('Playlist');
      const storePlaylistRequest = playlistObjectStore.get(this.userService.idUser);
      storePlaylistRequest.onsuccess = () => {
        playlistObjectStore.put(this.playlistService.playList, this.userService.idUser);
      };
    }

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    this.updatePlaylistName();
  }

  /**
   * Allows to save the Playlist in the database
   */
  updatePlaylistName(){

    // Opening of the database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Update PlaylistName Store
      const playlistNameStore = db.transaction(['PlaylistName'], 'readwrite');
      const playlistNameObjectStore = playlistNameStore.objectStore('PlaylistName');
      const storePlaylistNameRequest = playlistNameObjectStore.get(this.userService.idUser);
      storePlaylistNameRequest.onsuccess = () => {
        playlistNameObjectStore.put(this.playlistService.nameActualPlaylist, this.userService.idUser);
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
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Update Theme Store
      const themeStore = db.transaction(['Theme'], 'readwrite');
      const themeObjectStore = themeStore.objectStore('Theme');
      const storeThemeRequest = themeObjectStore.get(this.userService.idUser);
      storeThemeRequest.onsuccess = () => {
        themeObjectStore.put(this.themeService.theme, this.userService.idUser);
      };

      // Update Language Store
      const languageStore = db.transaction(['Language'], 'readwrite');
      const languageObjectStore = languageStore.objectStore('Language');
      const storeLanguageRequest = languageObjectStore.get(this.userService.idUser);
      storeLanguageRequest.onsuccess = () => {
        languageObjectStore.put(this.languageService.activeLanguage, this.userService.idUser);
      };

      // Update DwellTime Store
      const dwellTimeStore = db.transaction(['DwellTime'], 'readwrite');
      const dwellTimeObjectStore = dwellTimeStore.objectStore('DwellTime');
      const storeDwellTimeRequest = dwellTimeObjectStore.get(this.userService.idUser);
      storeDwellTimeRequest.onsuccess = () => {
        dwellTimeObjectStore.put(this.dwellTimeService.getConfiguration(), this.userService.idUser);
      };

      // Update Alert Message Store
      const alertMessageStore = db.transaction(['alertMessage'], 'readwrite');
      const alertMessageObjectStore = alertMessageStore.objectStore('alertMessage');
      const storeAlertMessageRequest = alertMessageObjectStore.get(this.userService.idUser);
      storeAlertMessageRequest.onsuccess = () => {
        alertMessageObjectStore.put(this.alertService.doNotShowAgain, this.userService.idUser);
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
  updateSettingsAFSR(){

    // Opening of the database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Update Theme Store
      const themeStore = db.transaction(['Theme'], 'readwrite');
      const themeObjectStore = themeStore.objectStore('Theme');
      const storeThemeRequest = themeObjectStore.get(this.userService.idUser);
      storeThemeRequest.onsuccess = () => {
        themeObjectStore.put(this.themeService.theme, this.userService.idUser);
      };

      // Update Language Store
      const languageStore = db.transaction(['Language'], 'readwrite');
      const languageObjectStore = languageStore.objectStore('Language');
      const storeLanguageRequest = languageObjectStore.get(this.userService.idUser);
      storeLanguageRequest.onsuccess = () => {
        languageObjectStore.put(this.languageService.activeLanguage, this.userService.idUser);
      };

      // Update DwellTime Store
      const dwellTimeStore = db.transaction(['DwellTime'], 'readwrite');
      const dwellTimeObjectStore = dwellTimeStore.objectStore('DwellTime');
      const storeDwellTimeRequest = dwellTimeObjectStore.get(this.userService.idUser);
      storeDwellTimeRequest.onsuccess = () => {
        dwellTimeObjectStore.put(this.dwellTimeService.getConfiguration(), this.userService.idUser);
      };

      // Update Alert Message Store
      const alertMessageStore = db.transaction(['alertMessage'], 'readwrite');
      const alertMessageObjectStore = alertMessageStore.objectStore('alertMessage');
      const storeAlertMessageRequest = alertMessageObjectStore.get(this.userService.idUser);
      storeAlertMessageRequest.onsuccess = () => {
        alertMessageObjectStore.put(this.alertService.doNotShowAgain, this.userService.idUser);
      };
    }

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  /**
   * Allows to save the mapPlaylist in the database
   */
  updateMapPlaylist(){

    // Opening of the database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Update mapPlaylist Store
      const mapPlaylistStore = db.transaction(['mapPlaylist'], 'readwrite');
      const mapPlaylistObjectStore = mapPlaylistStore.objectStore('mapPlaylist');
      const storeMapPlaylistRequest = mapPlaylistObjectStore.get(this.userService.idUser);
      storeMapPlaylistRequest.onsuccess = () => {
        mapPlaylistObjectStore.put(this.playlistService.mapPlaylist, this.userService.idUser);
      };
    }

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  /**
   * Allows to save the User in the database
   */
  updateUser(){

    // Opening of the database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Update User Store
      const userStore = db.transaction(['user'], 'readwrite');
      const userObjectStore = userStore.objectStore('user');
      const storeUserRequest = userObjectStore.get(1);
      storeUserRequest.onsuccess = () => {
        userObjectStore.put(this.userService.getConfiguration(), 1);
      };
    }

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  /**
   * Allows to save the list of user in the database
   */
  updateListUsers(){

    // Opening of the database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Update User Store
      const listUsersStore = db.transaction(['listUsers'], 'readwrite');
      const listUsersObjectStore = listUsersStore.objectStore('listUsers');
      const storeListUsersRequest = listUsersObjectStore.get(1);
      storeListUsersRequest.onsuccess = () => {
        listUsersObjectStore.put(this.userService.listUsers, 1);
      };
    }

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  /**
   * @param user
   *
   * Allows to delete the user passed in parameter of the database
   */
  deleteUser(user){

    // Opening of the database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      db.transaction(['Playlist'], 'readwrite').objectStore('Playlist').delete(user);
      db.transaction(['Theme'], 'readwrite').objectStore('Theme').delete(user);
      db.transaction(['Language'], 'readwrite').objectStore('Language').delete(user);
      db.transaction(['DwellTime'], 'readwrite').objectStore('DwellTime').delete(user);
      db.transaction(['alertMessage'], 'readwrite').objectStore('alertMessage').delete(user);
      db.transaction(['mapPlaylist'], 'readwrite').objectStore('mapPlaylist').delete(user);
    }

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  /**
   * Allows to get the user in databse
   */
  getUser(){

    // Opening of the database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Recovery of User
      const userStore = db.transaction(['user'], 'readwrite').objectStore('user').get(1);
      userStore.onsuccess = e => {
        this.userService.setConfiguration(userStore.result);
      };
      /* istanbul ignore next */
      userStore.onerror = event => {
        alert('userStore error: ' + event.target.errorCode);
      };
    }

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  /**
   *
   */
  getAllInformationsUser(userId){

    // Opening of the Database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Recovery of the recorded Playlist
      const playlistStore = db.transaction(['Playlist'], 'readwrite').objectStore('Playlist').get(userId);
      playlistStore.onsuccess = e => {
        this.playlistUser = playlistStore.result;
      };
      /* istanbul ignore next */
      playlistStore.onerror = event => {
        alert('PlaylistStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Playlist name
      const playlistNameStore = db.transaction(['PlaylistName'], 'readwrite').objectStore('PlaylistName').get(userId);
      playlistNameStore.onsuccess = e => {
        this.namePlaylistUser = playlistNameStore.result;
      };
      /* istanbul ignore next */
      playlistNameStore.onerror = event => {
        alert('playlistNameStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Theme
      const themeStore = db.transaction(['Theme'], 'readwrite').objectStore('Theme').get(userId);
      themeStore.onsuccess = e => {
        this.themeUser = themeStore.result;
      };
      /* istanbul ignore next */
      themeStore.onerror = event => {
        alert('ThemeStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Language
      const languageStore = db.transaction(['Language'], 'readwrite').objectStore('Language').get(userId);
      languageStore.onsuccess = e => {
        this.languageUser = languageStore.result;
      };
      /* istanbul ignore next */
      languageStore.onerror = event => {
        alert('LanguageStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded DwellTime
      const dwellTimeStore = db.transaction(['DwellTime'], 'readwrite').objectStore('DwellTime').get(userId);
      dwellTimeStore.onsuccess = e => {
        this.dwellTimeUser = dwellTimeStore.result;
      };
      /* istanbul ignore next */
      dwellTimeStore.onerror = event => {
        alert('DwellTimeStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded Alert Message
      const alertMessageStore = db.transaction(['alertMessage'], 'readwrite').objectStore('alertMessage').get(userId);
      alertMessageStore.onsuccess = e => {
        this.alertMessageUser = alertMessageStore.result;
      };
      /* istanbul ignore next */
      alertMessageStore.onerror = event => {
        alert('alertMessageStore error: ' + event.target.errorCode);
      };

      // Recovery of the recorded mapPlaylist
      const mapPlaylistStore = db.transaction(['mapPlaylist'], 'readwrite').objectStore('mapPlaylist').get(userId);
      mapPlaylistStore.onsuccess = e => {
        this.mapPlaylistUser = mapPlaylistStore.result;
      };
      /* istanbul ignore next */
      mapPlaylistStore.onerror = event => {
        alert('mapPlaylistStore error: ' + event.target.errorCode);
      };
    };

    // Error open Database
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }

  /**
   * Allows to add in the database the user imported
   */
  addImportUser(user, playlist, namePlaylist, theme, language, dwellTime, alertMessage, mapPlaylist){

    // Opening of the database
    this.openRequest = indexedDB.open('SavePlaylist', this.version);

    // Success open Database
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // Update User Store
      const listUsersStore = db.transaction(['listUsers'], 'readwrite');
      const listUsersObjectStore = listUsersStore.objectStore('listUsers');
      const storeListUsersRequest = listUsersObjectStore.get(1);
      /* istanbul ignore next */
      storeListUsersRequest.onsuccess = () => {
        listUsersObjectStore.put(this.userService.listUsers, 1);
      };

      // Update Playlist Store
      const playlistStore = db.transaction(['Playlist'], 'readwrite');
      const playlistObjectStore = playlistStore.objectStore('Playlist');
      const storePlaylistRequest = playlistObjectStore.get(user.id);
      storePlaylistRequest.onsuccess = () => {
        playlistObjectStore.put(playlist, user.id);
      };

      // Update PlaylistName Store
      const playlistNameStore = db.transaction(['PlaylistName'], 'readwrite');
      const playlistNameObjectStore = playlistNameStore.objectStore('PlaylistName');
      const storePlaylistNameRequest = playlistNameObjectStore.get(user.id);
      storePlaylistNameRequest.onsuccess = () => {
        playlistNameObjectStore.put(namePlaylist, user.id);
      };

      // Update Theme Store
      const themeStore = db.transaction(['Theme'], 'readwrite');
      const themeObjectStore = themeStore.objectStore('Theme');
      const storeThemeRequest = themeObjectStore.get(user.id);
      storeThemeRequest.onsuccess = () => {
        themeObjectStore.put(theme, user.id);
      };

      // Update Language Store
      const languageStore = db.transaction(['Language'], 'readwrite');
      const languageObjectStore = languageStore.objectStore('Language');
      const storeLanguageRequest = languageObjectStore.get(user.id);
      storeLanguageRequest.onsuccess = () => {
        languageObjectStore.put(language, user.id);
      };

      // Update DwellTime Store
      const dwellTimeStore = db.transaction(['DwellTime'], 'readwrite');
      const dwellTimeObjectStore = dwellTimeStore.objectStore('DwellTime');
      const storeDwellTimeRequest = dwellTimeObjectStore.get(user.id);
      storeDwellTimeRequest.onsuccess = () => {
        dwellTimeObjectStore.put(dwellTime, user.id);
      };

      // Update Alert Message Store
      const alertMessageStore = db.transaction(['alertMessage'], 'readwrite');
      const alertMessageObjectStore = alertMessageStore.objectStore('alertMessage');
      const storeAlertMessageRequest = alertMessageObjectStore.get(user.id);
      storeAlertMessageRequest.onsuccess = () => {
        alertMessageObjectStore.put(alertMessage, user.id);
      };

      // Update mapPlaylist Store
      const mapPlaylistStore = db.transaction(['mapPlaylist'], 'readwrite');
      const mapPlaylistObjectStore = mapPlaylistStore.objectStore('mapPlaylist');
      const storeMapPlaylistRequest = mapPlaylistObjectStore.get(user.id);
      storeMapPlaylistRequest.onsuccess = () => {
        mapPlaylistObjectStore.put(mapPlaylist, user.id);
      };
    }

    // Error open Database 
    /* istanbul ignore next */
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };
  }
}
