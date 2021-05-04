import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

/**
 * Import Components
 */
import { SaveDialogComponent } from './dialogComponents/saveDialog/save-dialog.component';
import { SettingsComponent } from './dialogComponents/settings/settings.component';
import { ImportfileComponent } from './dialogComponents/importFile/importfile.component';
import { DialogChooseTypeComponent } from './dialogComponents/dialogChooseType/dialog-choose-type.component';

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

/**
 * Import Models
 */
import { Types } from './model/types-interface';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @ViewChild('myVideo') myvideo: ElementRef;

  width = 560;
  height = 315;

  edit = false;
  launch = false;
  currentElem = null;
  timeout = null;
  spinnerValue: number = 0;
  fullScreen = false;
  theme = "";

  idProgressIndicatorBtnNext = "nextProgressSpinner";
  idProgressIndicatorBtnPrevious = "previousProgressSpinner";
  idProgressIndicatorBtnPlay = "playProgressSpinner";
  idProgressIndicatorBtnPause= "pauseProgressSpinner";
  idProgressIndicatorBtnExpand = "expandProgressSpinner";

  private notifier: NotifierService;
  private sanitizer: DomSanitizer;
  public dialog: MatDialog;
  private playlistService: PlaylistService;
  public playList: Types[];
  private router: Router;
  private saveService: SaveService;
  private dwelltimeService: DwelltimeService;
  private themeService: ThemeService;
  private translate: TranslateService;
  private globalService: GlobalService;
  private audioService: AudioService;

  constructor(notifier: NotifierService,
              sanitizer: DomSanitizer,
              dialog: MatDialog,
              playlistService: PlaylistService,
              router: Router,
              saveService: SaveService,
              dwelltimeService: DwelltimeService,
              themeService: ThemeService,
              translate: TranslateService,
              globalService: GlobalService,
              audioService: AudioService) {
    this.notifier = notifier;
    this.sanitizer = sanitizer;
    this.dialog = dialog;
    this.playlistService = playlistService;
    this.playList = playlistService.playList;
    this.router = router;
    this.saveService = saveService;
    this.dwelltimeService = dwelltimeService;
    this.themeService = themeService;
    this.theme = this.themeService.theme;
    this.translate = translate;
    this.globalService = globalService;
    this.audioService = audioService;
  }

  /**
   * Allows to know if the theme value has changed
   * Initialize DialogChooseTypeComponent
   * Allows time (500ms) to load the playlist from the database
   * Then check if the playlist is empty, if it's the case active the edit mode
   */
  ngOnInit(): void {
    this.themeService.themeObservable.subscribe(value => {
      this.theme = value;
    })
    new DialogChooseTypeComponent(this.router, this.dialog);
    setTimeout(() => {
      this.playList = this.playlistService.playList;
      if (this.playList.length == 0){
        this.goEdit();
      }
    },500 );
  }

  /**
   * @param elem -> and item of the Playlist
   *
   * Check if this item is the btnAdd then if is true open DialogueChooseTypeComponent
   */
  openDialog(elem: Types): void{
    if (elem.types == "btnAdd") {
      this.goEdit();
      this.dialog.open(DialogChooseTypeComponent);
    }
  }

  /**
   * If edit mode is On, close it and open ImportFileComponent
   * Then when importDialog is close refresh the playlist with the new playlist who contains new values
   */
  openImport(){
    if (this.edit){
      this.goEdit();
    }
    const importDialog = this.dialog.open(ImportfileComponent);
    importDialog.afterClosed().subscribe(() => {
      this.playList = this.playlistService.playList;
      });
  }

  /**
   * If edit mode is On, close it and open SaveDialogComponent
   */
  openSave(){
    if (this.edit){
      this.goEdit();
    }
    this.dialog.open(SaveDialogComponent);
  }

  /**
   * If edit mode is On, close it and open SettingsComponent
   */
  openSettings(){
    if (this.edit){
      this.goEdit();
    }
    this.dialog.open(SettingsComponent);
  }

  /**
   * Allows the user to enable or disable the edit mode
   * When edit mode is on, add button Add else delete button Add
   * Notify the statue of edit mode (on or off)
   */
  goEdit(): void {
    this.edit = !this.edit;
    if (this.edit){
      this.playlistService.addBtnAdd();
      this.notifier.notify('warning', this.translate.instant('notifier.editOn'));
    }else {
      this.playList = this.playlistService.deleteBtnAdd();
      this.notifier.notify('warning', this.translate.instant('notifier.editOff'));
    }
  }

  /**
   * @param elem -> item of Playlist
   *
   * Delete the item choose by the user of the Playlist
   * Delete also the button Add to avoid him to be in the upadte Playlist who save the actual Playlist in the database Palylist Store
   * Then re add it
   */
  goDelete(elem: Types): void {
    this.playList = this.playlistService.deleteToPlaylist(elem);
    this.playList = this.playlistService.deleteBtnAdd();
    this.saveService.updatePlaylist();
    this.playlistService.addBtnAdd();
  }

  /**
   * @param elem -> item of the Playlist
   *
   * Launch the item in the Playlist selected by the user
   * Then go on it
   */
  goLaunch(elem: Types) {
    if (elem.types != "btnAdd"){
      this.currentElem = elem;
      this.launch = true;
      this.goOnElement();
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
      this.goOnElement();
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
    const screenBtn = document.getElementById("screenBtn");
    const screenIcon = document.getElementById("screenIcon");

    previousBtn.classList.add("btnFullScreen");
    previousBtn.style.opacity = "0";
    nextBtn.style.opacity = "0";
    playBtn.style.opacity = "0";
    pauseBtn.style.opacity = "0";
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
    const screenBtn = document.getElementById("screenBtn");
    const screenIcon = document.getElementById("screenIcon");

    previousBtn.classList.remove("btnFullScreen");
    previousBtn.style.opacity = "1";
    nextBtn.style.opacity = "1";
    playBtn.style.opacity = "1";
    pauseBtn.style.opacity = "1";
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
   * Then go on this element
   */
  goNext() {
    this.exitFullScreen();
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
    this.goOnElement();
  }

  /**
   * Allows the user to go to the previous item in the Playlist
   * If it the first item, go to the last
   * Then go on this element
   */
  goPrevious() {
    this.exitFullScreen();
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
    this.goOnElement();
  }

  /**
   * When the user choose an element in the Playlist, 500ms after we go on it
   */
  goOnElement(){
    setTimeout( () => {
      let goTo = document.getElementById("watchPlace");
      goTo.scrollIntoView(true);
    }, 500);
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
    }else{
      //this.globalService.playMusic(this.currentElem.id);
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
    }else {
      //this.globalService.pauseMusic();
    }
  }

  /**
   * @param elemId -> id of the element containing the spinner
   * @param spinnerId -> id of the spinner selected
   *
   * Show the spinner when the user mouseover the element
   */
  showProgressIndicator(elemId: string, spinnerId: any) {
    if (this.dwelltimeService.dwellTime && (elemId != 'btnAddToPlaylistProjectMultimedia')){
      const id = document.getElementById(elemId);
      const spinner = document.getElementById(String(spinnerId));

      id.style.opacity = '0.5';
      spinner.style.visibility = 'visible';

      this.startInterval(elemId, spinnerId, id);
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
   *
   * When the spinner is show, launch an interval
   * When this interval is finish, simulate a user click
   * If the user leave before the end of the interval, the interval timer is reset
   */
  startInterval(elemId: string, spinnerId: any, id: HTMLElement) {
    this.spinnerValue = 0;
    this.timeout = setInterval(() => {
      if (this.spinnerValue == 100){
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
   * Allows the user to drag&drop the item in Playlist for design the Playlist as he wish
   * Then save this Playlist in database
   */
  dragDrop(event: CdkDragDrop<any>){
    this.playList[event.previousContainer.data.index] = event.container.data.elem;
    this.playList[event.container.data.index] = event.previousContainer.data.elem;
    if (this.edit){
      this.goEdit();
    }
    this.saveService.updatePlaylist();
  }
}
