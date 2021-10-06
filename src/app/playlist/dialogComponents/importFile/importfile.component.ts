import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

/**
 * Import Services
 */
import { PlaylistService } from '../../services/playlist.service';
import { NotifierService } from 'angular-notifier';
import { SaveService } from '../../../services/save.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-importfile',
  templateUrl: './importfile.component.html',
  styleUrls: ['./importfile.component.css']
})
export class ImportfileComponent implements OnInit {

  public typeFile = "song"
  private fileUpload;
  private nameFileUpload;
  public titleFileInput = '';
  public artistFileInput = '';
  public titleFile = "importFilePlaylist.titleSong";
  public artistFile = "importFilePlaylist.artistSong";
  public authorizedExtension = "importFilePlaylist.authorizedSong";
  public error = '';
  public optionsPlaylist = "new";

  public extension = "audio/wav, audio/mpeg";
  public acceptedFile = false;
  public errorEmptyFile = false;
  public errorWrongFile = false;
  public errorEmptyTitle = false;
  public errorFileAlreadyInPlaylist = false;

  newPlaylistOption = "positive";
  mergePlaylistOption = "";

  constructor(private dialog: MatDialog,
              private playlistService: PlaylistService,
              private notifier: NotifierService,
              private saveService: SaveService,
              private translate: TranslateService,
              private alertService: AlertService) {
  }

  ngOnInit(){
    this.alertService.setReplacePlaylist();
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
      this.authorizedExtension = "importFilePlaylist.authorizedSong";
      this.extension = "audio/wav, audio/mpeg";
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
      this.authorizedExtension = "importFilePlaylist.authorizedVideo";
      this.extension = "video/mp4, video/webm";
    }
  }

  /**
   * Allows to know if the checked box is "file"
   * If file already checked do nothing
   * Else set the rights values to match the file type
   */
  public getTypeFile(){
    if (this.typeFile != "file"){
      this.typeFile = "file";
      this.authorizedExtension = "importFilePlaylist.authorizedFile";
      this.extension = ".AACPPlaylist";
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
   * Get the choice of the user and stock the choice in the global variable
   * Then set the alertService
   */
  public newPlaylist(){
    this.mergePlaylistOption = "";
    this.newPlaylistOption = "positive";
    this.optionsPlaylist = "new";
    this.alertService.setReplacePlaylist();
  }

  /**
   * Get the choice of the user and stock the choice in the global variable
   * Then set the alertService
   */
  public mergePlaylist(){
    this.newPlaylistOption = "";
    this.mergePlaylistOption = "positive";
    this.optionsPlaylist = "merge";
    this.alertService.setMergePlaylist();
  }

  /**
   * @param event -> change event
   *
   * Get the local file add by the user
   */
  public addFile(event){
    if (this.typeFile == 'file'){
      this.fileUpload = event.target.files[0];
      this.nameFileUpload = event.target.files[0].name;
      const reader = new FileReader();
      reader.readAsText(this.fileUpload);
      reader.onload = () => {
        this.fileUpload = reader.result;
      };
      this.acceptedFile = true;
    }else {
      this.fileUpload = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileUpload);
      reader.onload = () => {
        this.fileUpload = reader.result;
      };
      this.acceptedFile = true;
    }
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
   * Check if the Json file is a right file
   * Get the name of the file, split it from the point
   * Then get the last value of the split (= extension of the file) and check if this value == json
   * After check if the json file contains the right schema
   */
  public jsonIsValid(){
    if (this.typeFile == 'file'){
      if (this.nameFileUpload.split('.').pop() == "AACPPlaylist"){
        return this.playlistService.checkFileForPlaylist(JSON.parse(this.fileUpload));
      }else {
        return false;
      }
    }else{
      return false;
    }
  }

  /**
   * If the user submit :
   *  If typeFile == "video" or "song" :
   *    - Check if the file is not empty;
   *    - Chek if the file is not already in the Playlist;
   *    - Check if the file is valid for audio or video;
   *    - Check if the titleFileInput is not empty
   *    - Then add file to the Playlist, close the DialogComponent, notify that file is added to the Playlist and update database Playlist Store;
   *  Else if typeFile == "file" :
   *    - Display a warning message if the user allows us to display it
   *    - Check if the file is a json file
   *    - Parse the Json file;
   *    - Then add it to the Playlist;
   *  Else :
   *    - Show error message;
   */
  public submit(){
    if (this.fileUpload != null) {
      this.errorEmptyFile = false;
      if (this.audioIsValid() || this.videoIsValid() || this.jsonIsValid()) {
        this.errorWrongFile = false;
        if (this.titleFileInput != '' && this.typeFile != 'file') {
          if (!this.playlistService.fileAlreadyInPlaylist(this.fileUpload)) {
            this.errorFileAlreadyInPlaylist = false;
            this.errorEmptyTitle = false
            this.playlistService.addFileToPlaylist(this.fileUpload, this.typeFile, this.titleFileInput, this.artistFileInput);
            this.dialog.closeAll();
            this.notifier.notify('warning', this.typeFile + this.translate.instant('notifier.addPlaylist'));
            this.saveService.updatePlaylist();
          } else {
            this.errorFileAlreadyInPlaylist = true;
          }
        } else {
          if (this.typeFile == "file"){
            if (this.alertService.doNotShowAgain){
              if (this.optionsPlaylist == "new"){
                this.playlistService.newPlaylist(JSON.parse(this.fileUpload));
              }else {
                this.playlistService.mergePlaylist(JSON.parse(this.fileUpload))
              }
              this.dialog.closeAll();
              this.notifier.notify('warning', this.translate.instant('notifier.importPlaylist'));
              this.saveService.updatePlaylist();
            }else {
              const alertDialog = this.dialog.open(AlertComponent);
              alertDialog.afterClosed().subscribe(() => {
                if (!this.alertService.alertCancel){
                  if (this.optionsPlaylist == "new"){
                    this.playlistService.newPlaylist(JSON.parse(this.fileUpload));
                  }else {
                    this.playlistService.mergePlaylist(JSON.parse(this.fileUpload))
                  }
                  this.dialog.closeAll();
                  this.notifier.notify('warning', this.translate.instant('notifier.importPlaylist'));
                  this.saveService.updatePlaylist();
                }
              });
            }
          }else {
            this.acceptedFile = false;
            this.errorEmptyTitle = true;
          }
        }
      } else {
        this.acceptedFile = false;
        this.errorWrongFile = true;
      }
    }else {
      this.acceptedFile = false;
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
