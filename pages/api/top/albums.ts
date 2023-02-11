import type { NextApiRequest, NextApiResponse } from 'next';
import { topItemsFetcherWrapper } from '../../../lib/apiUtils';
import { getTopAlbums } from '../../../lib/lastfm/client';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => (
  topItemsFetcherWrapper(req, res, getTopAlbums)
);
