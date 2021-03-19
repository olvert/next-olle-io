/* eslint-disable import/prefer-default-export */

import { useEffect, useRef } from 'react';
import _useSwr, { Key } from 'swr';
import { Fetcher, SWRConfiguration, SWRResponse } from 'swr/dist/types';

/**
 * @see https://github.com/vercel/swr/issues/284
 * @see https://github.com/vercel/swr/issues/284#issuecomment-706094532
 */
export const useSWR = <Data = never, Error = never>(
  key: Key,
  fn?: Fetcher<Data>,
  config?: SWRConfiguration<Data, Error>,
): SWRResponse<Data, Error> => {
  const hasMounted = useRef(false);

  useEffect(() => { hasMounted.current = true; }, []);

  return _useSwr<Data, Error>(key, fn, {
    ...config,
    initialData: hasMounted.current ? undefined : config?.initialData,
  });
};
