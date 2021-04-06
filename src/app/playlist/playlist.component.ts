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

  private notifier: NotifierService;
  private sanitizer: DomSanitizer;
  public dialog: MatDialog;
  private playlistService: PlaylistService;
  public playList: Types[];
  private router: Router;
  private saveService: SaveService;

  constructor(notifier: NotifierService, sanitizer: DomSanitizer, dialog: MatDialog, playlistService: PlaylistService, router: Router, saveService: SaveService) {
    this.notifier = notifier;
    this.sanitizer = sanitizer;
    this.dialog = dialog;
    this.playlistService = playlistService;
    this.playList = playlistService.playList;
    this.router = router;
    this.saveService = saveService;
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

  getUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.currentElem.id)
  }

  getAudio(){
    let audio = new Audio(this.currentElem.id);
    return this.sanitizer.bypassSecurityTrustResourceUrl(audio.src);
  }

  getVideo(){
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
}
