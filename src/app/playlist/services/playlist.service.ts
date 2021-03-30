import { Injectable } from '@angular/core';
import { Types } from '../model/types-interface';
import { Item } from '../../../../projects/spotify/src/app/pages/album/models/album-model';

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  btnAdd: Types = {types: "btnAdd",
    videoId: "btnAddToPlaylistProjectMultimedia",
    videoUrl: null,
    channelId: null,
    channelUrl: null,
    channelTitle: null,
    title: null,
    publishedAt: null,
    description: null,
    thumbnail: './assets/Add.png'};

  playList: Types[] = [];

  constructor() { }

  addVideoYoutubeToPlaylist(video: Types) {
    this.playList.push(video);
  }

  addFileToPlaylist(file: File) {
  }

  addSongToPlaylist(item: Item) {
    let song: Types = {
      types: "spotify",
      videoId: item.uri,
      videoUrl: null,
      channelId: null,
      channelUrl: null,
      channelTitle: null,
      title: item.name,
      publishedAt: null,
      description: null,
      thumbnail: './assets/Spotify.png'
    }
    this.playList.push(song);
  }

  addBtnAdd(){
    this.playList.push(this.btnAdd);
  }

  deleteBtnAdd(){
    return this.playList = this.playList.filter(value => value.types != "btnAdd");
  }

  deleteToPlaylist(elem: Types){
    return this.playList = this.playList.filter(value => value.title != elem.title);
  }

  alreadyInPlaylist(elem: Types){
    let find = false;
    this.playList.forEach(value => {
      if ((value.types == elem.types) && (value.title == elem.title)){
        find = true;
      }
    });
    return find;
  }

}
