import { Injectable } from '@angular/core';
import { Types } from '../model/types-interface';
import { Image, Item } from '../../../../projects/spotify/src/app/pages/album/models/album-model';
import { Video } from '../../../../projects/youtube/src/app/shared/models/search.interface'

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  playList: Types[] = [];

  constructor() { }

  addVideoYoutubeToPlaylist(videoY: Video) {
    let video: Types = {
      types: "YouTube",
      id: videoY.videoId,
      artists: videoY.channelTitle,
      title: videoY.title,
      publishedAt: videoY.publishedAt,
      description: videoY.description,
      thumbnail: videoY.thumbnail
    }
    this.playList.push(video);
  }

  addSongToPlaylist(music: Item, image: Image) {
    let song: Types = {
      types: "Spotify",
      id: music.uri,
      artists: music.artists[0].name,
      title: music.name,
      publishedAt: null,
      description: null,
      thumbnail: image.url
    }
    this.playList.push(song);
  }

  addFileToPlaylist(file: File) {
  }

  addBtnAdd(){
    let btnAdd: Types = {
      types: "btnAdd",
      id: "btnAddToPlaylistProjectMultimedia",
      artists: null,
      title: null,
      publishedAt: null,
      description: null,
      thumbnail: './assets/Add.png'
    };
    this.playList.push(btnAdd);
  }

  deleteBtnAdd(){
    return this.playList = this.playList.filter(value => value.types != "btnAdd");
  }

  deleteToPlaylist(elem: Types){
    return this.playList = this.playList.filter(value => value.title != elem.title);
  }

  deleteVideoYoutubeToPlaylist(elem: Video){
    return this.playList = this.playList.filter(value => value.id != elem.videoId);
  }

  deleteSongSpotifyToPlaylist(elem: Item){
    return this.playList = this.playList.filter(value => value.id != elem.uri);
  }

  videoYoutubeAlreadyInPlaylist(elem: Video){
    let find = false;
    this.playList.forEach(value => {
      if (value.id == elem.videoId){
        find = true;
      }
    });
    return find;
  }

  songSpotifyAlreadyInPlaylist(elem: Item){
    let find = false;
    this.playList.forEach(value => {
      if (value.id == elem.uri){
        find = true;
      }
    });
    return find;
  }
}
