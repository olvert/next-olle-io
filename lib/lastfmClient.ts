type Period = 'overall' | '7day' | '1month' | '3month' | '6month' | '12month';

type QueryKey = 'method' | 'user' | 'api_key' | 'format' | 'period' | 'limit';
type QueryMethod = 'user.gettoptracks';
type QueryObject = Record<QueryKey, string>;

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

export const getTopTracksKey = (period: Period): string => getKey('user.gettoptracks', period);

export default getTopTracksKey;
