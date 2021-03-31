import { Component, OnInit } from '@angular/core';
import { Types } from './model/types-interface';
import { NotifierService } from 'angular-notifier';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistService } from './services/playlist.service';
import { DialogChooseTypeComponent } from './dialogChooseType/dialog-choose-type.component';
import { Router } from '@angular/router';

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
  UrlVideoLaunch = null;
  typeElem = null;

  private notifier: NotifierService;
  private sanitizer: DomSanitizer;
  public dialog: MatDialog;
  private playlistService: PlaylistService;
  public PlayList: Types[];
  private router: Router;

  constructor(notifier: NotifierService, sanitizer: DomSanitizer, dialog: MatDialog, playlistService: PlaylistService, router: Router) {
    this.notifier = notifier;
    this.sanitizer = sanitizer;
    this.dialog = dialog;
    this.playlistService = playlistService;
    this.PlayList = playlistService.playList;
    this.router = router;
  }

  ngOnInit(): void {
    new DialogChooseTypeComponent(this.router, this.dialog);
  }

  openDialog(elem: Types): void{
    if (elem.types == "btnAdd") {
      this.dialog.open(DialogChooseTypeComponent);
      this.goEdit();
    }
  }

  goEdit(): void {
    this.edit = !this.edit;
    if (this.edit){
      this.playlistService.addBtnAdd();
      this.notifier.notify('warning', 'Edit mode ON');
    }else {
      this.PlayList = this.playlistService.deleteBtnAdd();
      this.notifier.notify('warning', 'Edit mode OFF');
    }
  }

  goDelete(elem: Types): void {
    this.PlayList = this.playlistService.deleteToPlaylist(elem);
  }

  goLaunch(elem: Types) {
    this.fullScreen = false;
    if (elem.types != "btnAdd"){
      this.currentElem = elem;
      this.UrlVideoLaunch = elem.id;
      this.typeElem = elem.types;
      this.launch = true;
    }
  }

  goFullScreen(){
    this.fullScreen = true;
    const elem = document.getElementById("myVideoYouTube");
    elem.requestFullscreen();
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.UrlVideoLaunch + "?autoplay=1");
  }

  getUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.UrlVideoLaunch)
  }

  goNext() {
    if (this.PlayList.length > 2){
      let nextElem = null;
      let find = false;
      this.PlayList.forEach(elem => {
        if (find){
          find = false;
          if (elem.title != null){
            nextElem = elem;
          }else {
            nextElem = this.PlayList[0];
          }
        }
        if (elem.title == this.currentElem.videoUrl){
          find = true;
        }
      });
      this.UrlVideoLaunch = nextElem.videoId;
      this.currentElem = nextElem;
    }
  }

  goPrevious() {
    if (this.PlayList.length > 1){
      for (let i = 0; i < (this.PlayList.length - 1); i++){
        if (this.PlayList[i].title == this.currentElem.videoUrl){
          if (this.currentElem == this.PlayList[0]){
            this.UrlVideoLaunch = this.PlayList[this.PlayList.length-1].id;
            this.currentElem = this.PlayList[this.PlayList.length-1];
            i = this.PlayList.length;
          }else {
            this.UrlVideoLaunch = this.PlayList[i - 1].id;
            this.currentElem = this.PlayList[i - 1];
          }
        }
      }
    }
  }

  goSave() {

  }

  getFile(event) {
  }

}
