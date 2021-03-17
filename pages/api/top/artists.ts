import type { NextApiRequest, NextApiResponse } from 'next';
import { topItemsFetcherWrapper } from '../../../lib/apiUtils';
import { getTopArtists } from '../../../lib/lastfm/lastfmClient';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => (
  topItemsFetcherWrapper(req, res, getTopArtists)
);
