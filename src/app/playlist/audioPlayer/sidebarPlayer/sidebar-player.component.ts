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
  songToPlay: SafeResourceUrl = "";
  display = "hideCogBtn";
  displaySidebarPlayer = "disableSidebarPlayer";

  constructor(private audioService: AudioService,
              private playlistService: PlaylistService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.audioService.audioPlayedObservable.subscribe(value => {
      this.elemPlaylist = value;
      this.songToPlay = this.sanitizer.bypassSecurityTrustResourceUrl(value.id);
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
      }
      this.display = value;
    });
  }

  /**
   * Allows to show or hide the sidebar player
   */
  showHideSidebarPlayer(){
    if (this.displaySidebarPlayer == ""){
      this.displaySidebarPlayer = "disableSidebarPlayer";
    }else {
      this.displaySidebarPlayer = "";
    }
  }

  /**
   * @param value
   *
   * Set the volume of the sidebar player with the value send
   */
  setVolume(value){
    $("#sidebarPlayer").prop("volume", value / 100);
  }

  /**
   * Put the player in play mode
   */
  play(){
    $("audio").trigger('play');
  }

  /**
   * Put the player in pause mode
   */
  pause(){
    $("audio").trigger('pause');
  }

  /**
   * Allows to up the volume of the sidebar player by 10
   */
  volumeUp(){
    this.audioService.volume = this.audioService.volume + 10;
    $("#sidebarPlayer").prop("volume", this.audioService.volume / 100);
  }

  /**
   * Allows to down the volume of the sidebar player by 10
   */
  volumeDown(){
    this.audioService.volume = this.audioService.volume - 10;
    $("#sidebarPlayer").prop("volume", this.audioService.volume / 100);
  }

  /**
   * Allows to go to the next song of the playlist
   */
  nextSong(){
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
        this.songToPlay = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistService.playList[index].id);
      }else {
        this.elemPlaylist = this.playlistService.playList[0];
        this.songToPlay = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistService.playList[0].id);
      }
    }
  }

  /**
   * Allows to go to the previous song of the playlist
   */
  previousSong(){
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
        this.songToPlay = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistService.playList[index].id);
      }else {
        this.elemPlaylist = this.playlistService.playList[length];
        this.songToPlay = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistService.playList[length].id);
      }
    }
  }
}
