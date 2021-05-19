import { IArtist } from './iartist';
import { IAlbum } from './ialbum';
import { ITrack } from './itrack';

export interface IResult {
  album: IAlbum;
  artist: IArtist;
  tracks: ITrack;
  duration: number;
  id: number;
  title: string;
}
