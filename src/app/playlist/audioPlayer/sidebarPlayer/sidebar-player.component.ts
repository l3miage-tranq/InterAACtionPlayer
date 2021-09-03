import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import * as $ from 'jquery';
import { PlaylistService } from '../../services/playlist.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Types } from '../../model/types-interface';

@Component({
  selector: 'app-sidebar-player',
  templateUrl: './sidebar-player.component.html',
  styleUrls: ['./sidebar-player.component.css']
})
export class SidebarPlayerComponent implements OnInit {

  elemPlaylist: Types;
  elemToPlay: SafeResourceUrl = "";
  elemType: String = "";
  display = "hideCogBtn";
  displaySidebarPlayer = "disableSidebarPlayer";
  styleSidebarPlayer = "";

  widthYoutubePlayer = 560;
  heightYoutubePlayer = 315;

  constructor(private audioService: AudioService,
              private playlistService: PlaylistService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.audioService.audioPlayedObservable.subscribe(value => {
      this.elemPlaylist = value;
      this.elemType = value.types;
      this.elemToPlay = this.sanitizer.bypassSecurityTrustResourceUrl(value.id);
      this.setVolume(0);
    });
    this.audioService.unmutePlayerObservable.subscribe(value => {
      if (value){
        this.setVolume(this.audioService.volume);
      }else {
        this.setVolume(0);
      }
    });
    this.audioService.statusSidebarPlayerObservable.subscribe(value => {
      if (value == "hideCogBtn"){
        this.displaySidebarPlayer = "disableSidebarPlayer";
        this.styleSidebarPlayer = "width: 150px !important; margin-left: 90% !important;";
      }else {
        this.displaySidebarPlayer = "";
        this.styleSidebarPlayer = "";
      }
      this.display = value;
    });
    this.audioService.cancelSongObservable.subscribe(value => {
      this.elemToPlay = value;
      this.elemType = "";
    });
  }

  /**
   * Allows to show or hide the sidebar player
   */
  showHideSidebarPlayer(){
    if (this.displaySidebarPlayer == ""){
      this.displaySidebarPlayer = "disableSidebarPlayer";
      this.styleSidebarPlayer = "width: 150px !important; margin-left: 90% !important;";
    }else {
      this.displaySidebarPlayer = "";
      this.styleSidebarPlayer = "";
    }
  }

  /**
   * @param value
   *
   * Set the volume of the sidebar player with the value send
   */
  setVolume(value){
    if (this.elemType == "song"){
      $(document).ready(function(){
        $("#sidebarAudioPlayer").prop("volume", value / 100);
      });
    }else if (this.elemType == "YouTube"){
      (<HTMLIFrameElement> $("#sidebarYoutubePlayer")[0]).contentWindow.postMessage(
        '{"event":"command","func":"setVolume","args":['+ value +']}', '*'
      );
    }
  }

  /**
   * Put the player in play mode
   */
  play(){
    if (this.elemType == "song") {
      $("audio").trigger('play');
    }else if (this.elemType == "YouTube"){
      (<HTMLIFrameElement> $('#sidebarYoutubePlayer')[0]).contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  }

  /**
   * Put the player in pause mode
   */
  pause(){
    if (this.elemType == "song") {
      $("audio").trigger('pause');
    }else if (this.elemType == "YouTube"){
      (<HTMLIFrameElement> $("#sidebarYoutubePlayer")[0]).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  }

  /**
   * Allows to up the volume of the sidebar player by 10
   */
  volumeUp(){
    this.audioService.volume = this.audioService.volume + 10;
    if (this.elemType == "song"){
      $("#sidebarAudioPlayer").prop("volume", this.audioService.volume / 100);
    }else if (this.elemType == "YouTube"){
      (<HTMLIFrameElement> $("#sidebarYoutubePlayer")[0]).contentWindow.postMessage(
        '{"event":"command","func":"setVolume","args":['+ this.audioService.volume + ']}',
        '*'
      );
    }
  }

  /**
   * Allows to down the volume of the sidebar player by 10
   */
  volumeDown(){
    this.audioService.volume = this.audioService.volume - 10;
    if (this.elemType == "song"){
      $("#sidebarAudioPlayer").prop("volume", this.audioService.volume / 100);
    }else if (this.elemType == "YouTube"){
      (<HTMLIFrameElement> $("#sidebarYoutubePlayer")[0]).contentWindow.postMessage(
        '{"event":"command","func":"setVolume","args":['+ this.audioService.volume + ']}',
        '*'
      );
    }
  }

  /**
   * Allows to go to the next element of the playlist
   */
  nextElem(){
    let index = 0;
    let length = this.playlistService.playList.length - 1;
    if (length > 0){
      for (let i = 0; i <= length; i++){
        if (this.playlistService.playList[i].id == this.elemPlaylist.id){
          index = i + 1;
          break;
        }
      }
      if (index <= length){
        this.elemPlaylist = this.playlistService.playList[index];
        this.elemToPlay = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistService.playList[index].id);
      }else {
        this.elemPlaylist = this.playlistService.playList[0];
        this.elemToPlay = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistService.playList[0].id);
      }
    }
    this.elemType = this.elemPlaylist.types;
  }

  /**
   * Allows to go to the previous element of the playlist
   */
  previousElem(){
    let index = 0;
    let length = this.playlistService.playList.length - 1;
    if (length > 0){
      for (let i = 0; i <= length; i++){
        if (this.playlistService.playList[i].id == this.elemPlaylist.id){
          index = i - 1;
          break;
        }
      }
      if (index >= 0){
        this.elemPlaylist = this.playlistService.playList[index];
        this.elemToPlay = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistService.playList[index].id);
      }else {
        this.elemPlaylist = this.playlistService.playList[length];
        this.elemToPlay = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistService.playList[length].id);
      }
    }
    this.elemType = this.elemPlaylist.types;
  }
}
