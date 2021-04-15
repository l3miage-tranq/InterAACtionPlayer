import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Types } from './model/types-interface';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistService } from './services/playlist.service';
import { DialogChooseTypeComponent } from './dialogComponents/dialogChooseType/dialog-choose-type.component';
import { Router } from '@angular/router';
import { ImportfileComponent } from './dialogComponents/importFile/importfile.component';
import { SaveService } from '../services/save.service';
import { SaveDialogComponent } from './dialogComponents/saveDialog/save-dialog.component';
import { SettingsComponent } from './dialogComponents/settings/settings.component';
import { DwelltimeService } from '../services/dwelltime.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @ViewChild('myVideo') myvideo: ElementRef;
  @ViewChild('myAudio') myaudio: ElementRef;

  edit = false;
  launch = false;
  currentElem = null;
  timeout = null;
  spinnerValue: number = 0;
  fullScreen = false;

  idProgressIndicatorBtnNext = "nextProgressSpinner";
  idProgressIndicatorBtnPrevious = "previousProgressSpinner";
  idProgressIndicatorBtnPlay = "playProgressSpinner";
  idProgressIndicatorBtnPause= "pauseProgressSpinner";
  idProgressIndicatorBtnExpand = "expandProgressSpinner";
  idProgressIndicatorBtnCompress = "compressProgressSpinner";

  private notifier: NotifierService;
  private sanitizer: DomSanitizer;
  public dialog: MatDialog;
  private playlistService: PlaylistService;
  public playList: Types[];
  private router: Router;
  private saveService: SaveService;
  private dwelltimeService: DwelltimeService;

  constructor(notifier: NotifierService, sanitizer: DomSanitizer, dialog: MatDialog, playlistService: PlaylistService, router: Router, saveService: SaveService, dwelltimeService: DwelltimeService) {
    this.notifier = notifier;
    this.sanitizer = sanitizer;
    this.dialog = dialog;
    this.playlistService = playlistService;
    this.playList = playlistService.playList;
    this.router = router;
    this.saveService = saveService;
    this.dwelltimeService = dwelltimeService;
  }

  ngOnInit(): void {
    new DialogChooseTypeComponent(this.router, this.dialog);
    setTimeout(() => this.playList = this.playlistService.playList ,500 ); // permet de laisser le temps de charger la playlist sauvegarder dans la playlist
  }

  openDialog(elem: Types): void{
    if (elem.types == "btnAdd") {
      this.goEdit();
      this.dialog.open(DialogChooseTypeComponent);
    }
  }

  openImport(){
    if (this.edit){
      this.goEdit();
    }
    this.dialog.open(ImportfileComponent);
  }

  openSave(){
    if (this.edit){
      this.goEdit();
    }
    this.dialog.open(SaveDialogComponent);
  }

  openSettings(){
    this.dialog.open(SettingsComponent);
  }

  goEdit(): void {
    this.edit = !this.edit;
    if (this.edit){
      this.playlistService.addBtnAdd();
      this.notifier.notify('warning', 'Edit mode ON');
    }else {
      this.playList = this.playlistService.deleteBtnAdd();
      this.notifier.notify('warning', 'Edit mode OFF');
    }
  }

  goDelete(elem: Types): void {
    this.playList = this.playlistService.deleteToPlaylist(elem);
    this.playList = this.playlistService.deleteBtnAdd();
    this.saveService.updatePlaylist();
    this.playlistService.addBtnAdd();
  }

  goLaunch(elem: Types) {
    if (elem.types != "btnAdd"){
      this.currentElem = elem;
      this.launch = true;
      this.goOnElement();
    }
  }

  goFullScreen(){
    this.fullScreen = true;
    if (this.currentElem.types == "YouTube"){
      const elem = document.getElementById("myYoutubeVideo");
      elem.classList.add("fullScreen");
    }else if (this.currentElem.types == "video"){
      const elem = document.getElementById("myVideo");
      elem.classList.add("fullScreen");
      this.fixeBtn();
    }
  }

  exitFullScreen(){
    this.fullScreen = false;
    if (this.currentElem.types == "YouTube"){
      const elem = document.getElementById("myYoutubeVideo");
      elem.classList.remove("fullScreen");
    }else if (this.currentElem.types == "video"){
      const elem = document.getElementById("myVideo");
      elem.classList.remove("fullScreen");
      this.unFixeBtn();
    }
    this.goOnElement();
  }

  fixeBtn(){
    const previousBtn = document.getElementById("previousBtn");
    const nextBtn = document.getElementById("nextBtn");
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");

    previousBtn.classList.add("btnFullScreen");
    previousBtn.style.opacity = "0";
    nextBtn.style.opacity = "0";
    playBtn.style.opacity = "0";
    pauseBtn.style.opacity = "0";

  }

  unFixeBtn(){
    const previousBtn = document.getElementById("previousBtn");
    const nextBtn = document.getElementById("nextBtn");
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");

    previousBtn.classList.remove("btnFullScreen");
    previousBtn.style.opacity = "1";
    nextBtn.style.opacity = "1";
    playBtn.style.opacity = "1";
    pauseBtn.style.opacity = "1";
  }

  showBtn(idBtn: string){
    if (this.fullScreen){
      const elem = document.getElementById(idBtn);
      elem.style.opacity = "1";
    }
  }

  hideBtn(idBtn: string){
    if (this.fullScreen){
      const elem = document.getElementById(idBtn);
      elem.style.opacity = "0";
    }
  }

  getSrcFile(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentElem.id);
  }

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

  goOnElement(){
    setTimeout( () => {
      let goTo = document.getElementById("watchPlace");
      goTo.scrollIntoView(true);
    }, 500);
  }

  goPlay(){
    if (this.currentElem.types == 'video'){
      this.myvideo.nativeElement.play();
    }else if (this.currentElem.types == 'song'){
      this.myaudio.nativeElement.play();
    }
  }

  goPause(){
    if (this.currentElem.types == 'video'){
      this.myvideo.nativeElement.pause();
    }else if (this.currentElem.types == 'song'){
      this.myaudio.nativeElement.pause();
    }
  }

  showProgressIndicator(elemId: string, spinnerId: any) {
    if (this.dwelltimeService.dwellTime && (elemId != 'btnAddToPlaylistProjectMultimedia')){
      const id = document.getElementById(elemId);
      const spinner = document.getElementById(String(spinnerId));

      id.style.opacity = '0.5';
      spinner.style.visibility = 'visible';

      this.startInterval(elemId, spinnerId, id);
    }
  }

  hideProgressIndicator(elemId: string, spinnerId: any) {
    const card = document.getElementById(elemId);
    const spinner = document.getElementById(String(spinnerId));

    card.style.opacity = '1';
    spinner.style.visibility = 'hidden';

    clearInterval(this.timeout);
    this.spinnerValue = 0;
  }

  startInterval(elemId: string, spinnerId: any, id: HTMLElement) {
    this.spinnerValue = 0;
    this.timeout = setInterval(() => {
      if (this.spinnerValue == 100){
        clearInterval(this.timeout);
        console.log("click");
        setTimeout( () => {
          this.hideProgressIndicator(elemId, spinnerId);
          id.click();
        }, 500);
      }else {
        this.spinnerValue++;
        console.log("value +1");
      }
    }, ((this.dwelltimeService.dwellTimeValue - 500) / 100));
  }
}
