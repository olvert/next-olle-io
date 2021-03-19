import fetch, { RequestInit } from 'node-fetch';

import {
  Album,
  Artist,
  EnvelopeTopAlbums,
  EnvelopeTopArtists,
  EnvelopeTopTracks,
  Track,
} from './lastfmModels';

import { userAgent } from '../data.json';

export type Period = 'overall' | '7day' | '1month' | '3month' | '6month' | '12month';

export const defaultPeriod: Period = '1month';

type QueryKey = 'method' | 'user' | 'api_key' | 'format' | 'period' | 'limit';
type QueryMethod = 'user.gettoptracks' | 'user.gettopalbums' | 'user.gettopartists';
type QueryObject = Record<QueryKey, string>;

type ItemsResponse = [number, Item[] | undefined];
type Mapper = (json: unknown) => Item[];

export type TopItemsFetcher = (period: Period) => Promise<ItemsResponse>;

export type Item = {
  name: string;
  artist: string;
  playCount: string;
}

export const fetchSize = 5;

const BASE_URL = 'https://ws.audioscrobbler.com/2.0';
const API_KEY = process.env.LAST_FM_API_KEY;
const USER = process.env.LAST_FM_USER;

const fetchOtions: RequestInit = {
  headers: {
    'User-Agent': userAgent,
  },
};

const getKey = (method: QueryMethod, period: Period): string => {
  const queryObject: QueryObject = {
    api_key: API_KEY,
    user: USER,
    format: 'json',
    limit: fetchSize.toString(),
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

const artistToItem = (artist: Artist): Item => ({
  name: artist.name,
  artist: '',
  playCount: artist.playcount,
});

const mapTopTracksEnvelopeToItems = (envelope: EnvelopeTopTracks): Item[] => {
  const tracks = envelope.toptracks.track ?? undefined;

  return (tracks !== undefined) ? tracks.map(trackToItem) : undefined;
};

const mapTopAlbumsEnvelopeToItems = (envelope: EnvelopeTopAlbums): Item[] => {
  const albums = envelope.topalbums.album ?? undefined;

  return (albums !== undefined) ? albums.map(albumToItem) : undefined;
};

const mapTopArtistsEnvelopeToItems = (envelope: EnvelopeTopArtists): Item[] => {
  const artists = envelope.topartists.artist ?? undefined;

  return (artists !== undefined) ? artists.map(artistToItem) : undefined;
};

const getItems = async (key: string, mapper: Mapper): Promise<ItemsResponse> => {
  const res = await fetch(key, fetchOtions);

  if (res.ok !== true) {
    return [res.status, undefined];
  }

  const json = await res.json();
  const items = mapper(json);

  return [res.status, items];
};

export const getTopTracks: TopItemsFetcher = async (period) => {
  const key = getTopTracksKey(period);

  return getItems(key, mapTopTracksEnvelopeToItems);
};

export const getTopAlbums: TopItemsFetcher = async (period) => {
  const key = getTopAlbumsKey(period);

  return getItems(key, mapTopAlbumsEnvelopeToItems);
};

export const getTopArtists: TopItemsFetcher = async (period) => {
  const key = getTopArtistsKey(period);

  return getItems(key, mapTopArtistsEnvelopeToItems);
};
