import { Injectable } from '@angular/core';
import * as Ajv from 'ajv';

/**
 * Import Models
 */
import { Types } from '../model/types-interface';
import { Image, Item } from '../../../../projects/spotify/src/app/pages/album/models/album-model';
import { Video } from '../../../../projects/youtube/src/app/shared/models/search.interface';

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  // The Playlist that is displayed on the web
  playList: Types[] = [];

  // Schema for the json validator
  schemaPlaylist = {
    "properties": {
      types: { "type": "string" },
      id: { "type": "string" },
      artists: { "type": "string" },
      title: { "type": "string" },
      publishedAt: {
        type: "string",
        format: "date-time",
      },
      description: { "type": "string" },
      thumbnail: { "type": "string" }
    },
    "required": ["types", "id", "artists", "title", "publishedAt", "description", "thumbnail"],
    "additionalProperties": false
  }

  constructor() {
  }

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

    let importFile: Types = {
      types: typeFile,
      id: file,
      artists: artistFileInput,
      title: titleFileInput,
      publishedAt: null,
      description: null,
      thumbnail: img
    }
    this.playList.push(importFile);
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
   * @param file -> file imported by the user
   *
   * Chek if the file passed in parameter is already in the Playlist
   * Return true or false
   */
  fileAlreadyInPlaylist(file: any){
    let find = false;
    this.playList.forEach(value => {
      if (value.id == file){
        find = true;
      }
    });
    return find;
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

  /**
   * @param jsonFile
   *
   * Replace the current playlist with the playlist send by the user
   */
  newPlaylist(jsonFile: any){
    this.playList = jsonFile;
  }

  /**
   * @param jsonFile
   *
   * Merge the current playlist with the playlist send by the user
   * Check, all element in the playlist send by the user, if is not already existing in the current playlist
   * If it's false then add it to the current playlist
   * Else skip
   */
  mergePlaylist(jsonFile: any){
    const tmpPlaylist: Types[] = jsonFile;
    let find = false;
    tmpPlaylist.forEach(elemTmp => {
      this.playList.forEach(elemPlt => {
        if (elemTmp.id == elemPlt.id){
          find = true;
        }
      });
      if (!find){
        this.playList.push(elemTmp);
      }else {
        find = false;
      }
    });
  }

  /**
   * @param jsonFile
   *
   * Test the json file send by the user with Ajv (a json validator)
   * He use my schema to check if the json file has the good schema
   */
  checkFileForPlaylist(jsonFile: any){
    const ajv = new Ajv();
    const valid = ajv.validate(this.schemaPlaylist, jsonFile);
    if (valid){
      return true;
    }else {
      console.log(ajv.errorsText(ajv.errors));
      return false;
    }
  }
}
