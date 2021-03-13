import fetch from 'node-fetch';
import { EnvelopeTopTracks, Track as RawTrack } from './lastfmModels';

type Period = 'overall' | '7day' | '1month' | '3month' | '6month' | '12month';

type QueryKey = 'method' | 'user' | 'api_key' | 'format' | 'period' | 'limit';
type QueryMethod = 'user.gettoptracks';
type QueryObject = Record<QueryKey, string>;

export type Track = {
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

const rawTrackToTrack = (rawTrack: RawTrack): Track => ({
  name: rawTrack.name,
  artist: rawTrack.artist.name,
  playCount: rawTrack.playcount,
});

const mapEnvelopeToTracks = (envelope: EnvelopeTopTracks): Track[] => {
  const tracks = envelope.toptracks.track ?? undefined;

  if (tracks === undefined) {
    return undefined;
  }

  return tracks.map(rawTrackToTrack);
};

export const getTopTracks = async (period: Period): Promise<[number, Track[] | undefined]> => {
  const key = getTopTracksKey(period);
  const res = await fetch(key);

  if (res.ok !== true) {
    return [res.status, undefined];
  }

  const json = await res.json();
  const tracks = mapEnvelopeToTracks(json);

  return [res.status, tracks];
};
