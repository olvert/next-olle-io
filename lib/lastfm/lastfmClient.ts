import fetch from 'node-fetch';
import { Album, EnvelopeTopAlbums, EnvelopeTopTracks, Track } from './lastfmModels';

type Period = 'overall' | '7day' | '1month' | '3month' | '6month' | '12month';

type QueryKey = 'method' | 'user' | 'api_key' | 'format' | 'period' | 'limit';
type QueryMethod = 'user.gettoptracks' | 'user.gettopalbums' | 'user.gettopartists';
type QueryObject = Record<QueryKey, string>;

type ItemsResponse = [number, Item[] | undefined];
type Mapper = (json: any) => Item[];

export type Item = {
  name: string;
  artist: string;
  playCount: string;
}

const BASE_URL = 'https://ws.audioscrobbler.com/2.0';
const API_KEY = process.env.LAST_FM_API_KEY;
const USER = process.env.LAST_FM_USER;

const LIMIT = 5;

const getKey = (method: QueryMethod, period: Period): string => {
  const queryObject: QueryObject = {
    api_key: API_KEY,
    user: USER,
    format: 'json',
    limit: LIMIT.toString(),
    method: method.toString(),
    period: period.toString(),
  };

  const queryString = new URLSearchParams(queryObject).toString();

  return `${BASE_URL}?${queryString}`;
};

const getTopTracksKey = (period: Period): string => getKey('user.gettoptracks', period);
const getTopAlbumsKey = (period: Period): string => getKey('user.gettopalbums', period);
const getTopArtistsKey = (period: Period): string => getKey('user.gettopartists', period);

const trackToItem = (track: Track): Item => ({
  name: track.name,
  artist: track.artist.name,
  playCount: track.playcount,
});

const albumToItem = (album: Album): Item => ({
  name: album.name,
  artist: album.artist.name,
  playCount: album.playcount,
});

const mapTopTracksEnvelopeToItems = (envelope: EnvelopeTopTracks): Item[] => {
  const tracks = envelope.toptracks.track ?? undefined;

  return (tracks !== undefined) ? tracks.map(trackToItem) : undefined;
};

const mapTopAlbumsEnvelopeToItems = (envelope: EnvelopeTopAlbums): Item[] => {
  const albums = envelope.topalbums.album ?? undefined;

  return (albums !== undefined) ? albums.map(albumToItem) : undefined;
};

const getItems = async (key: string, mapper: Mapper): Promise<ItemsResponse> => {
  const res = await fetch(key);

  if (res.ok !== true) {
    return [res.status, undefined];
  }

  const json = await res.json();
  const items = mapper(json);

  return [res.status, items];
};

export const getTopTracks = async (period: Period): Promise<ItemsResponse> => {
  const key = getTopTracksKey(period);

  return getItems(key, mapTopTracksEnvelopeToItems);
};

export const getTopAlbums = async (period: Period): Promise<ItemsResponse> => {
  const key = getTopAlbumsKey(period);

  return getItems(key, mapTopAlbumsEnvelopeToItems);
};
