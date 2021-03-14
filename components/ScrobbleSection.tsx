import React from 'react';
import { Item } from '../lib/lastfm/lastfmClient';

type Props = {
  title: string;
  items: Item[];
}

const getKey = (t: Item): string => `${t.artist}+${t.name}`.split(' ').join('_').toLocaleLowerCase();

const ScrobbleSection = ({ title, items }: Props): JSX.Element => (
  <div className="pt-4 pb-2">
    <h3 className="font-semibold tracking-wide">{title}</h3>
    { items.map((t) => (
      <div key={getKey(t)} className="text-sm my-2 p-2 rounded border border-gray-800 hover:bg-gray-800">
        <p className="font-semibold">{t.name}</p>
        <p className="text-gray-400">{t.artist}</p>
        <p className="text-gray-400">{`${t.playCount} plays`}</p>
      </div>
    ))}
  </div>
);

export default ScrobbleSection;
