import { NextApiRequest, NextApiResponse } from 'next';
import { Period, TopItemsFetcher } from './lastfm/client';
import { isPeriod } from './utils';

const validatePeriodQueryParam = (value: unknown): [boolean, string] => {
  if (!value) {
    return [true, 'Missing parameter: \'period\''];
  }

  if (typeof value !== 'string') {
    return [true, 'Expected \'period\' to be of type: \'string\''];
  }

  if (!isPeriod(value)) {
    return [true, `Unexpected value for 'period': ${value}`];
  }

  return [false, ''];
};

export const topItemsFetcherWrapper = async (
  req: NextApiRequest,
  res: NextApiResponse,
  fetcher: TopItemsFetcher,
): Promise<void> => {
  const { period } = req.query;
  const [hasErrors, errorMessage] = validatePeriodQueryParam(period);

  if (hasErrors) {
    res.status(400).json({ error: errorMessage });
    return;
  }

  const validatedPeriod = period as Period;
  const [status, items] = await fetcher(validatedPeriod);

  if (status !== 200) {
    res.status(502).json({ error: `Received the following status from last.fm: ${status}` });
    return;
  }

  res.status(200).json(items);
};
