import React, { useState } from 'react';
import classNames from 'classnames';
import { isPeriod } from '../lib/utils';
import useSWR from 'swr';

import {
  defaultPeriod,
  fetchSize,
  Item,
  Period,
} from '../lib/lastfm/lastfmClient';
import { LoadingIcon, AngleDownIcon } from './Icons';

type Props = {
  title: string;
  items: Item[];
  baseKey: string;
}

type SelectOption = {
  label: string;
  value: Period
}

const selectOptions: SelectOption[] = [
  { label: 'Last 7 days', value: '7day' },
  { label: 'Last 30 days', value: '1month' },
  { label: 'Last 90 days', value: '3month' },
  { label: 'Last 180 days', value: '6month' },
  { label: 'Last 365 days', value: '12month' },
  { label: 'All time', value: 'overall' },
];

const fetcher = (key: string) => fetch(key).then((res) => res.json());

const getItemKey = (t: Item): string => `${t.artist}+${t.name}`.split(' ').join('_').toLocaleLowerCase();
const getFetchKey = (baseKey: string, period: Period): string => `${baseKey}?period=${period}`;

const ScrobbleSection = ({ title, items, baseKey }: Props): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<Period>(defaultPeriod);

  const swrOptions = { fallbackData: selectedOption === defaultPeriod ? items : null };
  const key = getFetchKey(baseKey, selectedOption);
  const { data, isValidating } = useSWR<Item[]>(key, fetcher, swrOptions);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;
    const period: Period = isPeriod(value) ? value : defaultPeriod;
    setSelectedOption(period);
  };

  return (
    <div className="pt-4 pb-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
        <div className="flex items-center">
          <Loading isLoading={isValidating} />
          <div
            className={classNames(
              'flex items-center bg-transparent rounded p-1',
              isValidating ? 'cursor-not-allowed' : 'hover:bg-gray-800 cursor-pointer',
            )}
          >
            <select
              disabled={isValidating}
              className="bg-inherit cursor-inherit focus:outline-none appearance-none"
              value={selectedOption}
              onChange={handleChange}
            >
              {selectOptions.map((so) => (
                <option key={so.value} value={so.value}>
                  {so.label}
                </option>
              ))}
            </select>
            <AngleDownIcon className="w-4 h-4 ml-4" />
          </div>
        </div>
      </div>
      <ul>
        {data && data.map((t) => (
          <li key={getItemKey(t)} className="h-20 text-sm my-2 p-2 rounded border border-gray-800">
            <p className="font-semibold truncate">{t.name}</p>
            <p className="text-gray-400 truncate">{t.artist}</p>
            <p className="text-gray-400 truncate">{`${t.playCount} plays`}</p>
          </li>
        ))}

        {!data && Array.from({ length: fetchSize }, (v, i) => (
          <li key={i} className="h-20 my-2 rounded border border-gray-800 animate-pulse" />
        )) }
      </ul>
    </div>
  );
};

const Loading = ({ isLoading }: { isLoading: boolean }): JSX.Element => (
  <LoadingIcon
    className={classNames(
      'w-4 h-4 mr-4 text-gray-100 animate-spin',
      isLoading ? 'visible' : 'hidden',
    )}
  />
);

export default ScrobbleSection;
