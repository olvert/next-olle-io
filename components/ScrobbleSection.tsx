import classNames from 'classnames';
import React, { useState } from 'react';
import useSWR from 'swr';
import { isPeriod } from '../lib/utils';

import {
  defaultPeriod,
  fetchSize,
  Item,
  Period,
} from '../lib/lastfm/client';

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

const ScrobbleSection = ({ title, items, baseKey }: Props): React.JSX.Element => {
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
    <div className="pb-10 sm:pb-20">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-xl sm:text-2xl font-semibold uppercase">{title}</h2>
        <div className="flex items-center text-sm sm:text-base">
          <select
            className={classNames(
              'focus:outline-none appearance-none bg-transparent hover:underline pr-2',
              isValidating ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            value={selectedOption}
            onChange={handleChange}
          >
            {selectOptions.map((so) => (
              <option key={so.value} value={so.value}>
                {so.label}
              </option>
            ))}
          </select>
          {!isValidating && <span className="block mt-0 sm:mt-0.5">↓</span>}
          {isValidating && <span className="block mt-0 sm:mt-0.5 animate-spin">↻</span>}
        </div>
      </div>
      <ul>
        {data && data.map((t, i) => (
          <li key={getItemKey(t)} className="h-14 my-1 sm:my-2">
            <p className="text-base sm:text-lg font-semibold truncate">{`${i + 1}. ${t.name}`}</p>
            <p className="text-sm sm:text-base truncate">
              {t.artist}
              {' — '}
              {`${t.playCount} plays`}
            </p>
          </li>
        ))}

        {!data && Array.from({ length: fetchSize }, (v, i) => (
          <li key={i} className="h-14 my-1 sm:my-2" />
        )) }
      </ul>
    </div>
  );
};

export default ScrobbleSection;
