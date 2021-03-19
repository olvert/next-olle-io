import React, { useState } from 'react';
import { useSWR } from '../lib/customSWR';
import { defaultPeriod, Item, Period } from '../lib/lastfm/lastfmClient';
import { isPeriod } from '../lib/utils';

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

  const swrOptions = { initialData: selectedOption === defaultPeriod ? items : null };
  const key = getFetchKey(baseKey, selectedOption);
  const { data } = useSWR<Item[]>(key, fetcher, swrOptions);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;
    const period: Period = isPeriod(value) ? value : defaultPeriod;
    setSelectedOption(period);
  };

  return (
    <div className="pt-4 pb-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
        <select className="bg-transparent rounded p-1 focus:outline-none hover:bg-gray-800 cursor-pointer" value={selectedOption} onChange={handleChange}>
          { selectOptions.map((so) => <option key={so.value} value={so.value}>{so.label}</option>) }
        </select>
      </div>
      { data && data.map((t) => (
        <div key={getItemKey(t)} className="text-sm my-2 p-2 rounded border border-gray-800 hover:bg-gray-800">
          <p className="font-semibold">{t.name}</p>
          <p className="text-gray-400">{t.artist}</p>
          <p className="text-gray-400">{`${t.playCount} plays`}</p>
        </div>
      ))}
    </div>
  );
};

export default ScrobbleSection;
