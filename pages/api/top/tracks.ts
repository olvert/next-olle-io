import type { NextApiRequest, NextApiResponse } from 'next';
import { topItemsFetcherWrapper } from '../../../lib/apiUtils';
import { getTopTracks } from '../../../lib/lastfm/client';

const tracks = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => (
  topItemsFetcherWrapper(req, res, getTopTracks)
);

export default tracks;
