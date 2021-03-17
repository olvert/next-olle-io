import React, { useState } from 'react';
import { Item, Period } from '../lib/lastfm/lastfmClient';
import { isPeriod } from '../lib/utils';

type Props = {
  title: string;
  items: Item[];
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

const getKey = (t: Item): string => `${t.artist}+${t.name}`.split(' ').join('_').toLocaleLowerCase();

const ScrobbleSection = ({ title, items }: Props): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<Period>('1month');

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;
    const period: Period = isPeriod(value) ? value : '1month';
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
      { items.map((t) => (
        <div key={getKey(t)} className="text-sm my-2 p-2 rounded border border-gray-800 hover:bg-gray-800">
          <p className="font-semibold">{t.name}</p>
          <p className="text-gray-400">{t.artist}</p>
          <p className="text-gray-400">{`${t.playCount} plays`}</p>
        </div>
      ))}
    </div>
  );
};

export default ScrobbleSection;
