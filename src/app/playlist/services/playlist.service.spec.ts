import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';

describe('PlaylistService', () => {
  let service: PlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addVideoYoutubeToPlaylist:: should push object to playlist', () => {
    spyOn(service.playList, 'push');
    service.addVideoYoutubeToPlaylist({
      videoId: '',
      channelTitle: '',
      title: '',
      publishedAt: '',
      description: '',
      thumbnail: ''
    } as any);
    expect(service.playList.push).toHaveBeenCalled();
  });

  it('addSpotifySongToPlaylist:: should push object to playlist', () => {
    spyOn(service.playList, 'push');
    service.addSpotifySongToPlaylist({
      uri: '',
      artists: [{ name: '' }],
      name: '',
    } as any, { url: '' } as any);
    expect(service.playList.push).toHaveBeenCalled();
  });

  it('addDeezerSongToPlaylist:: should push object to playlist', () => {
    spyOn(service.playList, 'push');
    service.addDeezerSongToPlaylist('', '', '', '');
    expect(service.playList.push).toHaveBeenCalled();
  });

  it('addFileToPlaylist:: should push object to playlist', () => {
    spyOn(service.playList, 'push');
    service.addFileToPlaylist('', 'song', '', '');
    expect(service.playList.push).toHaveBeenCalled();
  });

  it('addFileToPlaylist:: should push object to playlist', () => {
    spyOn(service.playList, 'push');
    service.addFileToPlaylist('', 'video', '', '');
    expect(service.playList.push).toHaveBeenCalled();
  });

  it('service:: should filter playlist', () => {
    service.playList = [{id: 1, title: 'abc', types: 'btnAdda'}, {id: 2, title: 'xyz', types: 'btnAdsdd'}] as any;
    service.deleteToPlaylist({ title: 'abdc' } as any);
    service.deleteVideoYoutubeToPlaylist({ videoId: 3 } as any);
    service.deleteSongSpotifyToPlaylist({ uri: 1 } as any);
    service.deleteSongDeezerToPlaylist(4);
    service.fileAlreadyInPlaylist(4);
    service.videoYoutubeAlreadyInPlaylist({ videoId: 3 } as any);
    service.songSpotifyAlreadyInPlaylist({ uri: 1 } as any);
    service.songDeezerAlreadyInPlaylist(4);
    expect(service).toBeTruthy();
  });

  it('service:: should find the given playlist', () => {
    service.playList = [{id: 1, title: 'abc', types: 'btnAdda'}, 
    {id: 2, title: 'xyz', types: 'btnAdsdd'}, 
    {id: 3, title: 'xyz', types: 'btnAdsdd'}, 
    {id: 4, title: 'xyz', types: 'btnAdsdd'}] as any;
    service.deleteMapPlaylist('abc');
    service.playlistNameAlreadyInMap('abc');
    expect(service.fileAlreadyInPlaylist(4)).toBeTruthy();
    expect(service.videoYoutubeAlreadyInPlaylist({ videoId: 3 } as any)).toBeTruthy();
    expect(service.songSpotifyAlreadyInPlaylist({ uri: 1 } as any)).toBeTruthy();
    expect(service.songDeezerAlreadyInPlaylist(2)).toBeTruthy();
  });

  it('newPlaylist:: should set new playlist', () => {
    service.newPlaylist([]);
    expect(service.playList).toEqual([]);
  });

  it('mergePlaylist:: should merge playlist', () => {
    service.playList = [{id: 1, title: 'abc', types: 'btnAdda'}, {id: 2, title: 'xyz', types: 'btnAdsdd'}] as any;
    service.mergePlaylist([{id: 3, title: 'abc', types: 'btnAdda'}, {id: 2, title: 'xyz', types: 'btnAdsdd'}]);
    expect(service.playList.length).toEqual(3);
  });
});
