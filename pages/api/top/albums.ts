import type { NextApiRequest, NextApiResponse } from 'next';
import { topItemsFetcherWrapper } from '../../../lib/apiUtils';
import { getTopAlbums } from '../../../lib/lastfm/client';

const albums = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => (
  topItemsFetcherWrapper(req, res, getTopAlbums)
);

export default albums;
