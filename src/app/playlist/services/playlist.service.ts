import { Injectable } from '@angular/core';
import { Types } from '../model/types-interface';
import { Image, Item } from '../../../../projects/spotify/src/app/pages/album/models/album-model';
import { Video } from '../../../../projects/youtube/src/app/shared/models/search.interface';

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  // The Playlist that is displayed on the web
  playList: Types[] = [];

  constructor() { }

  /**
   * @param videoY -> Youtube video
   *
   * Add a Youtube video to the Playlist
   */
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

  /**
   * @param music -> Spotify music
   * @param image -> Thumbnail Spotify music
   *
   * Add a Spotify music to the Playlist
   */
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

  /**
   * @param file -> The file given by the user
   * @param typeFile -> Type of file (song or video)
   * @param titleFileInput -> The title of the file given by the user
   * @param artistFileInput -> The artist of the file given by the user
   *
   * Add the file given by the user to the Playlist
   */
  addFileToPlaylist(file: any, typeFile: string, titleFileInput: string, artistFileInput: string) {

    let img = './assets/no-image.png';
    if (typeFile == 'song'){
      img = './assets/Music.jpeg';
    }else if (typeFile == 'video'){
      img = './assets/video.png';
    }

    let songFile: Types = {
      types: typeFile,
      id: file,
      artists: artistFileInput,
      title: titleFileInput,
      publishedAt: null,
      description: null,
      thumbnail: img
    }
    this.playList.push(songFile);
  }

  /**
   * Add the button + to the Playlist
   */
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

  /**
   * Delete the button + to the Playlist
   */
  deleteBtnAdd(){
    return this.playList = this.playList.filter(value => value.types != "btnAdd");
  }

  /**
   * @param file -> local file
   *
   * Delete the local file, passed in parameter, to the Playlist
   */
  deleteToPlaylist(file: Types){
    return this.playList = this.playList.filter(value => value.title != file.title);
  }

  /**
   * @param elem -> Youtube video
   *
   * Delete the Youtube video, passed in parameter, to the Playlist
   */
  deleteVideoYoutubeToPlaylist(elem: Video){
    return this.playList = this.playList.filter(value => value.id != elem.videoId);
  }

  /**
   * @param elem -> Spotify music
   *
   * Delete the Spotify music, passed in parameter, to the Playlist
   */
  deleteSongSpotifyToPlaylist(elem: Item){
    return this.playList = this.playList.filter(value => value.id != elem.uri);
  }

  /**
   * @param elem -> Youtube video
   *
   * Chek if the Youtube video passed in parameter is already in the Playlist
   * Return true or false
   */
  videoYoutubeAlreadyInPlaylist(elem: Video){
    let find = false;
    this.playList.forEach(value => {
      if (value.id == elem.videoId){
        find = true;
      }
    });
    return find;
  }

  /**
   * @param elem -> Spotify music
   *
   * Chek if the Spotify music passed in parameter is already in the Playlist
   * Return true or false
   */
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
