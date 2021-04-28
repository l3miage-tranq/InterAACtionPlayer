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

  public typeFile = "song"
  private fileUpload;
  public titleFileInput = '';
  public artistFileInput = '';
  public titleFile = "importFilePlaylist.titleSong";
  public artistFile = "importFilePlaylist.artistSong";
  public error = '';

  public errorEmptyFile = false;
  public errorWrongFile = false;
  public errorEmptyTitle = false;


  constructor(private dialog: MatDialog,
              private playlistService: PlaylistService,
              private notifier: NotifierService,
              private saveService: SaveService) {
  }

  ngOnInit(){
  }

  /**
   * Allows to know if the checked box is "music"
   * If music already checked do nothing
   * Else set the rights values to match the file type
   */
  public getTypeSong(){
    if (this.typeFile != "song"){
      this.typeFile = "song";
      this.titleFile = "importFilePlaylist.titleSong";
      this.artistFile = "importFilePlaylist.artistSong";
    }
  }

  /**
   * Allows to know if the checked box is "video"
   * If music already checked do nothing
   * Else set the rights values to match the file type
   */
  public getTypeVideo(){
    if (this.typeFile != "video"){
      this.typeFile = "video";
      this.titleFile = "importFilePlaylist.titleVideo";
      this.artistFile = "importFilePlaylist.artistVideo";
    }
  }

  /**
   * @param event -> keyup event
   *
   * Get the title written by the user
   * Set this value in titleFileInput variable
   */
  public getTitle(event){
    this.titleFileInput = event.target.value;
  }

  /**
   * @param event -> keyup event
   *
   * Get the artist written by the user
   * Set this value in artistFileInput variable
   */
  public getArtist(event){
    this.artistFileInput = event.target.value;
  }

  /**
   * @param event -> change event
   *
   * Get the local file add by the user
   */
  public addFile(event){
    this.fileUpload = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileUpload);
    reader.onload = () => {
      this.fileUpload = reader.result;
    };
    return this.fileUpload;
  }

  /**
   * Check if the audio file given by the user is a mpeg or wav file
   */
  public audioIsValid(){
    if (this.typeFile == 'song'){
      return this.fileUpload.startsWith('data:audio/mpeg;base64') || this.fileUpload.startsWith('data:audio/wav');
    }else {
      return false;
    }
  }

  /**
   * Check if the video file given by the user is a mp4 or webm file
   */
  public videoIsValid(){
    if (this.typeFile == 'video'){
      return this.fileUpload.startsWith('data:video/mp4') || this.fileUpload.startsWith('data:video/webm');
    }else {
      return false;
    }
  }

  /**
   * If the user submit :
   *  - Check if the file is not empty;
   *  - Check if the file is valid for audio or video;
   *  - Check if the titleFileInput is not empty
   *  - then add file to the Playlist, close the DialogComponent , notify that file is added to the Playlist and update database Playlist Store;
   * Else :
   *  - Show error message;
   */
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

  /**
   * If the user cancel the importFile set variable to false
   * Then close the ImportFilComponent
   */
  public goCancel(){
    this.errorEmptyTitle = false;
    this.errorWrongFile = false;
    this.errorEmptyFile = false;
    this.dialog.closeAll();
  }
}
