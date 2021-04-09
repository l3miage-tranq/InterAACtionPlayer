import { Component, OnInit } from '@angular/core';
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

  edit = false;
  launch = false;
  fullScreen = false;
  currentElem = null;
  timeout = null;
  spinnerValue = 0;

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
  }

  goLaunch(elem: Types) {
    this.fullScreen = false;
    if (elem.types != "btnAdd"){
      this.currentElem = elem;
      this.launch = true;
    }
  }

  goFullScreen(){
    this.fullScreen = true;
    document.getElementById("myVideoYouTube").requestFullscreen();
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.currentElem.id + "?autoplay=1");
  }

  getYoutubeUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.currentElem.id)
  }

  getSrcFile(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.currentElem.id);
  }

  goNext() {
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
  }

  goPrevious() {
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
  }

  showProgressIndicator(cardId: string, spinnerId: number) {
    const card = document.getElementById(cardId);
    const spinner = document.getElementById(String(spinnerId));

    card.style.opacity = '0.5';
    spinner.style.visibility = 'visible';

    this.startInterval(cardId, spinnerId, card);
  }

  hideProgressIndicator(cardId: string, spinnerId: number) {
    const card = document.getElementById(cardId);
    const spinner = document.getElementById(String(spinnerId));

    card.style.opacity = '1';
    spinner.style.visibility = 'hidden';

    this.stopInterval();
    this.spinnerValue = 0;
  }

  startInterval(cardId: string, spinnerId: number, card: HTMLElement) {
    this.timeout = setInterval(() => {
      if (this.spinnerValue == 100){
        setTimeout(() => {
          this.hideProgressIndicator(cardId, spinnerId);
          card.click();
        } ,500 );
      }else {
        this.spinnerValue++;
      }
    }, ((this.dwelltimeService.dwellTimeValue - 500) / 100));
  }

  stopInterval(){
    window.clearInterval(this.timeout);
  }
}
