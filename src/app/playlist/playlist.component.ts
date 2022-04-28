import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

/**
 * Import Components
 */
import { ExportfileComponent } from './dialogComponents/exportFile/exportfile.component';
import { ImportfileComponent } from './dialogComponents/importFile/importfile.component';
import { DialogChooseTypeComponent } from './dialogComponents/choosePlatform/dialog-choose-type.component';
import { DeleteDialogComponent } from './dialogComponents/deletePlaylist/delete-dialog.component';
import { SavePlaylistComponent } from './dialogComponents/savePlaylist/save-playlist.component';
import { LoadPlaylistComponent } from './dialogComponents/loadPlaylist/load-playlist.component';
import { AlertComponent } from './dialogComponents/alert/alert.component';
import { AccountsComponent } from './dialogComponents/accounts/accounts.component';

/**
 * Import Services
 */
import { ThemeService } from '../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../projects/spotify/src/app/services/global.service';
import { DwelltimeService } from '../services/dwelltime.service';
import { SaveService } from '../services/save.service';
import { PlaylistService } from './services/playlist.service';
import { NotifierService } from 'angular-notifier';
import { AudioService } from './services/audio.service';
import { DefaultService } from '../services/default.service';
import { UsersService } from '../services/users.service';
import { AuthguardService } from '../services/authguard.service';
import { AlertService } from './services/alert.service';
import { LoginNotificationService } from "./services/login-notification.service";
import { LanguageService } from "../services/language.service";

/**
 * Import Models
 */
import { Types } from './model/types-interface';
import {DialogSiteASFRComponent} from "../dialog-site-asfr/dialog-site-asfr.component";
import {DialogLinkInteraactionboxComponent} from "./dialogComponents/dialog-link-interaactionbox/dialog-link-interaactionbox.component";
import {LogoutAppComponent} from "./dialogComponents/logoutApp/logout-app.component";
import {StatusInternetService} from "../services/status-internet.service";

/**
 * Import functions javascript
 */
declare var initDeezer: any;
declare var logoutDeezer: any;
declare var playDeezer: any;
declare var pauseDeezer: any;
declare var increaseVolumeDeezer: any;
declare var decreaseVolumeDeezer: any;

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @ViewChild('myVideo') myvideo: ElementRef;

  width = 560;
  height = 315;
  volumeYouTubeVideo = 50;
  volumeSpotifyMusic = 50;

  edit = false;
  launch = false;
  currentElem = null;
  timeout = null;
  spinnerValue: number = 0;
  fullScreen = false;
  disableDragDrop = false;
  theme = "";
  textColor = "";
  index = -1;
  displayTheSideBar = false;

  statusSpotify = "red";
  textStatusSpotify = "playlist.logOutSpotify"

  statusDeezer = "red";
  textStatusDeezer = "playlist.logOutDeezer"

  btnType: number = 1;
  idProgressIndicatorBtnNext = "btnNextProgressSpinner";
  idProgressIndicatorBtnPrevious = "btnPreviousProgressSpinner";
  idProgressIndicatorBtnPlay = "btnPlayProgressSpinner";
  idProgressIndicatorBtnPause= "btnPauseProgressSpinner";
  idProgressIndicatorBtnExpand = "btnExpandProgressSpinner";
  idProgressIndicatorBtnMinus = "btnMinusProgressSpinner";
  idProgressIndicatorBtnPlus = "btnPlusProgressSpinner";
  idProgressIndicatorBtnClose = "btnCloseProgressSpinner";

  sideIconType: number = 2;
  idProgressIndicatorSideIconUp = "sideIconUpProgressSpinner";
  idProgressIndicatorSideIconDown = "sideIconDownProgressSpinner";

  iconType: number = 5;
  idProgressIndicatorIconSave = "iconSaveProgressSpinner";
  idProgressIndicatorIconLoad = "iconLoadProgressSpinner";
  idProgressIndicatorIconDelete = "iconDeleteProgressSpinner";
  idProgressIndicatorIconExport = "iconExportProgressSpinner";
  idProgressIndicatorIconImport = "iconImportProgressSpinner";
  idProgressIndicatorIconEdit = "iconEditProgressSpinner";
  idProgressIndicatorIconSettings= "iconSettingsProgressSpinner";
  idProgressIndicatorIconUser = "iconUserProgressSpinner";
  idProgressIndicatorIconLogout = "iconLogoutProgressSpinner";
  idProgressIndicatorIconNew = "iconNewProgressSpinner";

  refresh = false;
  loopProgressIndicator = false;

  public playList: Types[];

  constructor(private notifier: NotifierService,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog,
              private playlistService: PlaylistService,
              private router: Router,
              private saveService: SaveService,
              private dwelltimeService: DwelltimeService,
              private themeService: ThemeService,
              private translate: TranslateService,
              private globalService: GlobalService,
              private audioService: AudioService,
              private defaultService: DefaultService,
              private usersService: UsersService,
              private authGuardService: AuthguardService,
              private alertService: AlertService,
              public languageService: LanguageService,
              private loginNotification: LoginNotificationService,
              private statusInternet: StatusInternetService) {
  }

  /**
   * Initialize the playlist with the id of the current user
   * Allows to know if the theme value has changed
   * Initialize DialogChooseTypeComponent
   * Allows time (500ms) to load the playlist from the database
   * Then check if the playlist is empty, if it's the case active the edit mode
   */
  ngOnInit(): void {
    this.authGuardService.canAccess();
    this.themeService.themeObservable.subscribe(value => {
      this.theme = value;
      if (value == "inverted"){
        this.textColor = "darkMode";
      }else {
        this.textColor = "lightMode";
      }
    });
    new DialogChooseTypeComponent(this.router, this.dialog, this.playlistService);
    setTimeout(() => {
      initDeezer();
      this.playList = this.playlistService.playList;
      if (this.isPlaylistEmpty()){
        this.goEdit()
      }
    },1000 );
    this.checkStatus();
  }

  checkStatus(){
    this.loginNotification.getStatusDeezer();
    setTimeout(() => {
      if (this.loginNotification.logOnSpotify){
        this.statusSpotify = "green";
        this.textStatusSpotify = "playlist.logInSpotify"
      }else {
        this.statusSpotify = "red";
        this.textStatusSpotify = "playlist.logOutSpotify"
      }
      if (this.loginNotification.logOnDeezer){
        this.statusDeezer = "green";
        this.textStatusDeezer = "playlist.logInDeezer"
      }else {
        this.statusDeezer = "red";
        this.textStatusDeezer = "playlist.logOutDeezer"
      }
    }, 3000);
  }

  /**
   * Check if the playlist is empty
   */
  isPlaylistEmpty(){
    return this.playList.length == 0;
  }

  /**
   * Check if the edit mode is On
   * If it's true disabled it
   */
  isEditModeActive(){
    if (this.edit){
      this.goEdit();
    }
  }

  /**
   * Set the boolean launch to false for delete the current video
   */
  deleteCurrentElement(){
    this.launch = false;
  }

  /**
   * @param elem -> and item of the Playlist
   *
   * Check if this item is the btnAdd then if is true open DialogueChooseTypeComponent and disable the edit mode
   * After the DialogueChooseTypeComponent is close, refresh the playlist and check if the playlist is empty
   * If it's the case then enable edit mode
   */
  openDialog(elem: Types): void{
    if (elem.types == "btnAdd") {
      this.isEditModeActive();
      const dialogChoose = this.dialog.open(DialogChooseTypeComponent);
      dialogChoose.afterClosed().subscribe( () => {
        this.playList = this.playlistService.playList;
        if (this.isPlaylistEmpty() && this.playlistService.addBtnAddInEmptyPlaylist){
          this.goEdit();
        }
      });
    }else {
      this.goLaunch(elem);
    }
  }

  /**
   * Allows to start a new playlist
   */
  newPlaylist(){
    this.isEditModeActive();
    if (this.alertService.doNotShowAgain == false){
      this.alertService.setNewPlaylist();
      const newPlaylist = this.dialog.open(AlertComponent);
      newPlaylist.afterClosed().subscribe(() => {
        if (this.alertService.alertCancel == false){
          this.playlistService.playList = [];
          this.playList = this.playlistService.playList;
          this.playlistService.nameActualPlaylist = "";
          this.saveService.updatePlaylist();
          this.notifier.notify('warning', this.translate.instant('notifier.newPlaylist'));
          this.goEdit();
        }
      });
    }else {
      this.playlistService.playList = [];
      this.playList = this.playlistService.playList;
      this.playlistService.nameActualPlaylist = "";
      this.saveService.updatePlaylist();
      this.notifier.notify('warning', this.translate.instant('notifier.newPlaylist'));
      this.goEdit();
    }
  }

  /**
   * If edit mode is On, disable it and open SavePlaylistComponent
   * Then when SaveDialog is close we check if the playlist is empty
   * If it's the case then enable edit mode & delete current music/video
   */
  openSave(){
    this.isEditModeActive();
    const savePlaylist = this.dialog.open(SavePlaylistComponent);
    savePlaylist.afterClosed().subscribe(() => {
      if (this.isPlaylistEmpty()){
        this.goEdit();
        this.deleteCurrentElement();
      }
    });
  }

  /**
   * If edit mode is On, disable it and open loadPlaylistComponent
   * Then when loadDialog is close refresh the playlist with the new playlist who contains new values
   * Then check if the playlist is empty
   * If it's the case then enable edit mode & delete current music/video
   */
  openLoad(){
    this.isEditModeActive();
    const loadPlaylist = this.dialog.open(LoadPlaylistComponent);
    loadPlaylist.afterClosed().subscribe( () => {
      this.playList = this.playlistService.playList;
      if (this.isPlaylistEmpty()){
        this.goEdit();
        this.deleteCurrentElement()
      }
    });
  }

  /**
   * If edit mode is On, disable it and open ImportFileComponent
   * Then when importDialog is close refresh the playlist with the new playlist who contains new values
   * Then check if the playlist is empty
   * If it's the case then enable edit mode & delete current music/video
   */
  openImport(){
    this.isEditModeActive();
    const importDialog = this.dialog.open(ImportfileComponent);
    importDialog.afterClosed().subscribe(() => {
      this.playList = this.playlistService.playList;
      if (this.isPlaylistEmpty()){
        this.goEdit();
        this.deleteCurrentElement()
      }
    });
  }

  /**
   * If edit mode is On, disable it and open ExportfileComponent
   * Then check if the playlist is empty
   * If it's the case then enable edit mode
   */
  openExport(){
    this.isEditModeActive();
    const saveDialog = this.dialog.open(ExportfileComponent);
    saveDialog.afterClosed().subscribe( () => {
      if (this.isPlaylistEmpty()){
        this.goEdit();
      }
    });
  }

  /**
   * If edit mode is On, disable it and open SettingsPageComponent
   * Then check if the playlist is empty
   * If it's the case then enable edit mode
   */
  openSettings(){
    this.router.navigate(['/settings']);
  }

  /**
   * If edit mode is On, disable it and open AccountsComponent
   * Then check if the playlist is empty
   * If it's the case then enable edit mode
   */
  openAccounts(){
    this.isEditModeActive();
    this.deleteCurrentElement();
    const accountsDialog = this.dialog.open(AccountsComponent);
    accountsDialog.afterClosed().subscribe( () => {
      if (this.isPlaylistEmpty()){
        this.goEdit();
      }
      this.checkStatus();
    });
  }

  /**
   * If edit mode is On, close it and open DeleteDialogComponent
   * Then when deleteDialog is close refresh the playlist with an empty playlist
   * Then check if the playlist is empty
   * If it's the case then enable edit mode & delete current music/video
   */
  openDelete(){
    this.isEditModeActive();
    const importDialog = this.dialog.open(DeleteDialogComponent);
    importDialog.afterClosed().subscribe(() => {
      this.playList = this.playlistService.playList;
      if (this.isPlaylistEmpty()){
        this.goEdit();
        this.deleteCurrentElement();
      }
    });
  }

  /**
   * Allows the user to enable or disable the edit mode
   * When edit mode is on, add button "Add" and disable Drag & Drop
   * Else delete button Add and enable Drag & Drop
   * Notify the statue of edit mode (on or off)
   */
  goEdit(): void {
    this.edit = !this.edit;
    if (this.edit){
      this.disableDragDrop = true;
      this.playlistService.addBtnAdd();
      this.notifier.notify('warning', this.translate.instant('notifier.editOn'));
    }else {
      this.disableDragDrop = false;
      this.playList = this.playlistService.deleteBtnAdd();
      this.notifier.notify('warning', this.translate.instant('notifier.editOff'));
    }
  }

  /**
   * @param elem -> item of Playlist
   *
   * Delete the item choose by the user of the Playlist
   * Delete also the button Add to avoid him to be in the update Playlist who save the actual Playlist in the database Playlist Store
   * Then re add it
   */
  goDelete(elem: Types): void {
    if (this.alertService.doNotShowAgain) {
      this.isCurrentElem(elem);
      this.playList = this.playlistService.deleteToPlaylist(elem);
      this.saveService.updatePlaylist();
      setTimeout(() => {
        this.playlistService.addBtnAdd();
      }, 100);
    }else {
      this.alertService.setDeleteItemPlaylist();
      const alertDialog = this.dialog.open(AlertComponent);
      alertDialog.afterClosed().subscribe(() => {
        if (!this.alertService.alertCancel){
          this.isCurrentElem(elem);
          this.playList = this.playlistService.deleteToPlaylist(elem);
          this.saveService.updatePlaylist();
          setTimeout(() => {
            this.playlistService.addBtnAdd();
          }, 100);
        }
      });
    }
  }

  /**
   * @param elem
   *
   * Check if the elem we want to delete is the current elem
   */
  isCurrentElem(elem){
    if (this.currentElem != null){
      if (elem.id == this.currentElem.id){
        this.launch = false;
      }
    }
  }

  /**
   * Allows the user to logout and return on the user page
   */
  logout(){
    logoutDeezer();
    this.globalService.getLogoutAccountSpotify();
    this.router.navigate(['user']);
  }

  /**
   * Allows the user to logout and return on the user page
   */
  logoutAFSR(){
    if (this.statusInternet.getStatusInternet()){
      logoutDeezer();
      this.globalService.getLogoutAccountSpotify();
    }
    this.dialog.open(LogoutAppComponent);
  }

  /**
   * @param elem -> item of the Playlist
   *
   * Launch the item in the Playlist selected by the user
   * Then go on it
   * And if it's a Youtube video or a Spotify music, set the volume default
   */
  goLaunch(elem: Types) {
    if (elem.types != "btnAdd"){
      this.currentElem = elem;
      this.launch = true;
      this.refreshAudioPlayer();
      this.goOnElement("watchPlace");
      this.setDefaultVolume();
    }
  }

  /**
   * Set the volume of a Youtube video or Spotify music by default
   */
  setDefaultVolume(){
    if (this.currentElem.types == "YouTube"){
      $(document).ready( () => {
        setTimeout( () => {
          (<HTMLIFrameElement> $("#myYoutubeVideo")[0]).contentWindow.postMessage(
            '{"event":"command","func":"setVolume","args":[' + this.volumeYouTubeVideo + ']}',
            '*'
          );
        }, 500);
      });

    }else if (this.currentElem.types == "Spotify"){
      this.globalService.setVolume(this.volumeSpotifyMusic);
    }
  }

  /**
   * Applies the mode FullScreen only on a Youtube / Video element
   */
  goFullScreen(){
    if (!this.fullScreen){
      this.fullScreen = true;
      if (this.currentElem.types == "YouTube"){
        const elem = document.getElementById("myYoutubeVideo");
        elem.classList.add("fullScreen");
        this.fixeBtn();
      }else if (this.currentElem.types == "video"){
        const elem = document.getElementById("myVideo");
        elem.classList.add("fullScreen");
        this.fixeBtn();
      }
    }else {
      this.exitFullScreen();
    }
  }

  /**
   * Exit the fullScreen and return to the current element
   */
  exitFullScreen(){
    if (this.fullScreen){
      this.fullScreen = false;
      if (this.currentElem.types == "YouTube"){
        const elem = document.getElementById("myYoutubeVideo");
        elem.classList.remove("fullScreen");
        this.unFixeBtn();
      }else if (this.currentElem.types == "video"){
        const elem = document.getElementById("myVideo");
        elem.classList.remove("fullScreen");
        this.unFixeBtn();
      }
      this.goOnElement("watchPlace");
    }
  }

  /**
   * Fixe all buttons when we are in fullscreen
   */
  fixeBtn(){
    const previousBtn = document.getElementById("previousBtn");
    const nextBtn = document.getElementById("nextBtn");
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const minusBtn = document.getElementById("minusBtn");
    const plusBtn = document.getElementById("plusBtn");
    const screenBtn = document.getElementById("screenBtn");
    const screenIcon = document.getElementById("screenIcon");

    previousBtn.classList.add("btnFullScreen");
    previousBtn.style.opacity = "0";
    nextBtn.style.opacity = "0";
    playBtn.style.opacity = "0";
    pauseBtn.style.opacity = "0";
    minusBtn.style.opacity = "0";
    plusBtn.style.opacity = "0";
    screenBtn.style.opacity = "0";
    screenIcon.classList.replace("expand", "compress");
  }

  /**
   * Unfixe all buttons when we leave the fullscreen
   */
  unFixeBtn(){
    const previousBtn = document.getElementById("previousBtn");
    const nextBtn = document.getElementById("nextBtn");
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const minusBtn = document.getElementById("minusBtn");
    const plusBtn = document.getElementById("plusBtn");
    const screenBtn = document.getElementById("screenBtn");
    const screenIcon = document.getElementById("screenIcon");

    previousBtn.classList.remove("btnFullScreen");
    previousBtn.style.opacity = "1";
    nextBtn.style.opacity = "1";
    playBtn.style.opacity = "1";
    pauseBtn.style.opacity = "1";
    minusBtn.style.opacity = "1";
    plusBtn.style.opacity = "1";
    screenBtn.style.opacity = "1";
    screenIcon.classList.replace("compress", "expand");
  }

  /**
   * @param idBtn -> button
   *
   * In FullScreen mode, allows tho show the button when mouseover on it
   */
  showBtn(idBtn: string){
    if (this.fullScreen){
      const elem = document.getElementById(idBtn);
      elem.style.transition = "opacity 0.5s"
      elem.style.opacity = "1";
    }
  }

  /**
   * @param idBtn -> button
   *
   * In FullScreen mode, allows tho hide the button when mouseleave the button
   */
  hideBtn(idBtn: string){
    if (this.fullScreen){
      const elem = document.getElementById(idBtn);
      elem.style.transition = "opacity 5s"
      elem.style.opacity = "0";
    }
  }

  /**
   * Get the src of the file
   */
  getSrcFile(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentElem.id);
  }

  /**
   * Allows the user to go to the next item in the Playlist
   * If it the last item, go to the first
   * Then go on this element and set default volume
   */
  goNext() {
    this.exitFullScreen();
    this.isEditModeActive();
    if (this.playList.length > 1){
      for (let i = 0; i < this.playList.length; i++ ){
        if (this.currentElem.id == this.playList[i].id){
          if (i == (this.playList.length - 1)){
            this.currentElem = this.playList[0];
            break;
          }else {
            this.currentElem = this.playList[i+1];
            break;
          }
        }
      }
    }
    this.goOnElement("watchPlace");
    this.setDefaultVolume();
    this.refreshAudioPlayer();
  }

  /**
   * Allows the user to go to the previous item in the Playlist
   * If it the first item, go to the last
   * Then go on this element and set default volume
   */
  goPrevious() {
    this.exitFullScreen();
    this.isEditModeActive();
    if (this.playList.length > 1){
      for (let i = 0; i < this.playList.length; i++ ){
        if (this.currentElem.id == this.playList[i].id){
          if (i == 0){
            this.currentElem = this.playList[this.playList.length - 1];
            break;
          }else {
            this.currentElem = this.playList[i-1];
            break;
          }
        }
      }
    }
    this.goOnElement("watchPlace");
    this.setDefaultVolume();
    this.refreshAudioPlayer();
  }

  /**
   * Allows to refresh the audio player with the new song
   */
  refreshAudioPlayer(){
    this.refresh = true;
    setTimeout(() => {
      this.refresh = false;
    }, 50);
  }

  /**
   * When the user choose an element in the Playlist, 500ms after we go on it
   */
  goOnElement(id){
    setTimeout( () => {
      let goTo = document.getElementById(id);
      goTo.scrollIntoView(true);
    }, 200);
  }

  /**
   * Allows the user to launch the current element selected
   */
  goPlay(){
    if (this.currentElem.types == 'video'){
      this.myvideo.nativeElement.play();
    }else if (this.currentElem.types == 'song' && !this.audioService.audioPlay){
      $('.play-pause').trigger('click');
    }else if (this.currentElem.types == 'YouTube'){
      (<HTMLIFrameElement> $('#myYoutubeVideo')[0]).contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }else if (this.currentElem.types == "Spotify"){
      this.globalService.playMusic(this.currentElem.id);
    }else if (this.currentElem.types == "Deezer"){
      playDeezer();
    }
  }

  /**
   * Allows the user to pause the current element selected
   */
  goPause(){
    if (this.currentElem.types == 'video'){
      this.myvideo.nativeElement.pause();
    }else if (this.currentElem.types == 'song' && this.audioService.audioPlay){
      $('.play-pause').trigger('click');
    }else if (this.currentElem.types == 'YouTube'){
      (<HTMLIFrameElement> $("#myYoutubeVideo")[0]).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }else if (this.currentElem.types == "Spotify"){
      this.globalService.pauseMusic();
    }else if (this.currentElem.types == "Deezer"){
      pauseDeezer();
    }
  }

  /**
   * Allow the user to decrease the volume of the current video/music
   */
  goDecreaseVolume(){
    let newVolume = 0;
    if (this.currentElem.types == "video" && this.myvideo.nativeElement.volume > 0){
      newVolume = this.myvideo.nativeElement.volume - 0.1;
      if (newVolume < 0){
        newVolume = 0
        this.myvideo.nativeElement.volume = newVolume;
      }else {
        this.myvideo.nativeElement.volume = newVolume;
      }
    }else if (this.currentElem.types == "song"){
      this.audioService.emitDecreaseVolume();
    }else if (this.currentElem.types == "YouTube"){
      this.volumeYouTubeVideo = this.volumeYouTubeVideo - 10;
      (<HTMLIFrameElement> $("#myYoutubeVideo")[0]).contentWindow.postMessage(
        '{"event":"command","func":"setVolume","args":[' + this.volumeYouTubeVideo + ']}',
        '*'
      );
    }else if (this.currentElem.types == "Spotify"){
      this.volumeSpotifyMusic = this.volumeSpotifyMusic - 10;
      this.globalService.setVolume(this.volumeSpotifyMusic);
    }else if (this.currentElem.types == "Deezer"){
      decreaseVolumeDeezer();
    }
  }

  /**
   * Allow the user to increase the volume of the current video/music
   */
  goIncreaseVolume(){
    let newVolume = 0;
    if (this.currentElem.types == "video" && this.myvideo.nativeElement.volume < 1){
      newVolume = this.myvideo.nativeElement.volume + 0.1;
      if (newVolume > 1){
        newVolume = 1
        this.myvideo.nativeElement.volume = newVolume;
      }else {
        this.myvideo.nativeElement.volume = newVolume;
      }
    }else if (this.currentElem.types == "song"){
      this.audioService.emitIncreaseVolume();
    }else if (this.currentElem.types == "YouTube"){
      this.volumeYouTubeVideo = this.volumeYouTubeVideo + 10;
      (<HTMLIFrameElement> $("#myYoutubeVideo")[0]).contentWindow.postMessage(
        '{"event":"command","func":"setVolume","args":[' + this.volumeYouTubeVideo + ']}',
        '*'
      );
    }else if (this.currentElem.types == "Spotify"){
      this.volumeSpotifyMusic = this.volumeSpotifyMusic + 10;
      this.globalService.setVolume(this.volumeSpotifyMusic);
    }else if (this.currentElem.types == "Deezer"){
      increaseVolumeDeezer();
    }
  }

  /**
   * @param elemId -> id of the element containing the spinner
   * @param spinnerId -> id of the spinner selected
   * @param loop
   *
   * Show the spinner when the user mouseover the element
   */
  showProgressIndicator(elemId: string, spinnerId: any, loop?: boolean) {
    clearInterval(this.timeout);
    const id = document.getElementById(elemId);
    id.style.opacity = '0.5';
    if (this.dwelltimeService.dwellTime){
      const spinner = document.getElementById(String(spinnerId));
      spinner.style.visibility = 'visible';
      this.startInterval(elemId, spinnerId, id, loop);
    }
  }

  /**
   * @param elemId -> id of the element containing the spinner
   * @param spinnerId -> id of the spinner selected
   *
   * Hide the spinner when the user leave the element
   * Delete the current Interval
   */
  hideProgressIndicator(elemId: string, spinnerId: any) {
    this.loopProgressIndicator = false;
    const card = document.getElementById(elemId);
    const spinner = document.getElementById(String(spinnerId));
    card.style.opacity = '1';
    spinner.style.visibility = 'hidden';
    clearInterval(this.timeout);
    this.spinnerValue = 0;
  }

  /**
   *
   * @param elemId -> id of the element containing the spinner
   * @param spinnerId -> id of the spinner selected
   * @param id -> htmlElement
   * @param loop
   *
   * When the spinner is show, launch an interval
   * When this interval is finish, simulate a user click
   * If the user leave before the end of the interval, the interval timer is reset
   */
  startInterval(elemId: string, spinnerId: any, id: HTMLElement, loop?: boolean) {
    if (loop != null) {
      this.loopProgressIndicator = loop;
    }
    this.spinnerValue = 0;
    this.timeout = setInterval(() => {
      if (this.spinnerValue == 100 && loop){
        clearInterval(this.timeout);
        setTimeout( () => {
          id.click();
          this.startInterval(elemId, spinnerId, id, loop);
        }, 500);
      }else if (this.spinnerValue == 100){
        clearInterval(this.timeout);
        setTimeout( () => {
          this.hideProgressIndicator(elemId, spinnerId);
          id.click();
        }, 500);
      }else {
        this.spinnerValue++;
      }
    }, ((this.dwelltimeService.dwellTimeValue - 500) / 100));
  }

  /**
   * @param event -> drag&drop event
   *
   * Allows the user to drag&drop the item in Playlist for design the Playlist as he wish if the edit mode is disable
   * Then save this Playlist in database
   */
  dragDrop(event: CdkDragDrop<any>){
    this.playList[event.previousContainer.data.index] = event.container.data.elem;
    this.playList[event.container.data.index] = event.previousContainer.data.elem;
    this.playlistService.playList = this.playList;
    this.saveService.updatePlaylist();
  }

  /**
   * Allows to scroll down by 50px
   */
  goDown(){
    document.body.scrollBy(0, 50);
  }

  /**
   * Allows to scroll up by 50px
   */
  goUp(){
    document.body.scrollBy(0, -50);
  }

  /**
   * Check if we need to display the side bar
   * True if we can scroll
   */
  displaySideBar(){
    return document.body.scrollHeight > document.body.offsetHeight;
  }
  getBrightnessOfAFSRLogo() {
    return (this.theme =='') ? '1' : '10';
  }

  getBrightnessOfInterAACtionBoxAFSRLogo() {
    return (this.theme =='') ? '0.2' : '1';
  }

  getColorOfTitle(){
    return (this.theme =='') ? '#81197f' : 'white';
  }

  openDialogSiteASFR() {
    this.dialog.open(DialogSiteASFRComponent,{
      height: '90%',
      width: '90%'
    });
  }

  openDialogSiteInteraactionBox() {
    this.dialog.open(DialogLinkInteraactionboxComponent,{
      height: '90%',
      width: '90%'
    });
  }
}
