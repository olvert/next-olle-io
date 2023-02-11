import { Period } from './lastfm/client';

const periodValues = ['overall', '7day', '1month', '3month', '6month', '12month'];

export const isPeriod = (value: unknown): value is Period => typeof value === 'string' && periodValues.includes(value);
