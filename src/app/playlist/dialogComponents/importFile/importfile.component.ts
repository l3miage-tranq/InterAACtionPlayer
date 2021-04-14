import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistService } from '../../services/playlist.service';
import { NotifierService } from 'angular-notifier';
import { SaveService } from '../../../services/save.service';

@Component({
  selector: 'app-importfile',
  templateUrl: './importfile.component.html',
  styleUrls: ['./importfile.component.css']
})
export class ImportfileComponent implements OnInit {

  private typeFile = "song"
  private fileUpload;
  public titleFileInput = '';
  public artistFileInput = '';
  public titleFilePlaceholder = "Title of song";
  public artistFilePlaceholder = "Artist of song";
  public error = '';

  public errorEmptyFile = false;
  public errorWrongFile = false;
  public errorEmptyTitle = false;


  constructor(private dialog: MatDialog, private playlistService: PlaylistService, private notifier: NotifierService, private saveService: SaveService) { }

  ngOnInit(){
  }

  public getTypeSong(){
    if (this.typeFile != "song"){
      this.typeFile = "song";
      this.titleFilePlaceholder = "Title of song";
      this.artistFilePlaceholder = "Artist of song";
    }
  }

  public getTypeVideo(){
    if (this.typeFile != "video"){
      this.typeFile = "video";
      this.titleFilePlaceholder = "Title of video";
      this.artistFilePlaceholder = "Artist of video";
    }
  }

  public getTitle(event){
    this.titleFileInput = event.target.value;
  }

  public getArtist(event){
    this.artistFileInput = event.target.value;
  }

  public addFile(event){
    this.fileUpload = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileUpload);
    reader.onload = () => {
      this.fileUpload = reader.result;
    };
    return this.fileUpload;
  }

  public audioIsValid(){
    if (this.typeFile == 'song'){
      return this.fileUpload.startsWith('data:audio/mpeg;base64') || this.fileUpload.startsWith('data:audio/wav');
    }else {
      return false;
    }
  }

  public videoIsValid(){
    if (this.typeFile == 'video'){
      return this.fileUpload.startsWith('data:video/mp4') || this.fileUpload.startsWith('data:video/webm');
    }else {
      return false;
    }
  }

  public submit(){
    if (this.fileUpload !== null) {
      this.errorEmptyFile = false;
      if (this.audioIsValid() || this.videoIsValid()){
        this.errorWrongFile = false;
        if (this.titleFileInput != ''){
          this.errorEmptyTitle = false
          this.playlistService.addFileToPlaylist(this.fileUpload, this.typeFile, this.titleFileInput, this.artistFileInput);
          this.dialog.closeAll();
          this.notifier.notify('warning', this.typeFile + ' add to playlist !');
          this.saveService.updatePlaylist();
        }else {
          this.errorEmptyTitle = true;
        }
      }else {
        this.errorWrongFile = true;
      }
    }else {
      this.errorEmptyFile = true;
    }
  }

  public goCancel(){
    this.errorEmptyTitle = false;
    this.errorWrongFile = false;
    this.errorEmptyFile = false;
    this.dialog.closeAll();
  }
}
