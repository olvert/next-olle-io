import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import {
  siteTitle,
  twitterUrl,
  githubUrl,
  linkedinUrl,
  occupation,
  email,
} from '../lib/data.json';

import { TwitterIcon, GithubIcon, LinkedinIcon } from '../components/Icons';
import { getTopTracks, getTopAlbums, Item, getTopArtists } from '../lib/lastfm/lastfmClient';
import ScrobbleSection from '../components/ScrobbleSection';

type Props = {
  tracks: Item[];
  albums: Item[];
  artists: Item[];
}

type NavItem = {
  url: string;
  Icon: React.FunctionComponent<React.HTMLAttributes<SVGSVGElement>>;
}

const navItems: NavItem[] = [
  { url: twitterUrl, Icon: TwitterIcon },
  { url: githubUrl, Icon: GithubIcon },
  { url: linkedinUrl, Icon: LinkedinIcon },
];

const Home = (props: Props): JSX.Element => {
  const { tracks, albums, artists } = props;
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <header className="py-4">
        <div className="flex items-center justify-between pb-2">
          <h1 className="font-fira text-xl font-semibold tracking-wide select-none uppercase">{siteTitle}</h1>
          <nav className="flex">
            { navItems.map(({ url, Icon }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer external" className="text-gray-100 hover:text-blue-600">
                <Icon className="w-5 h-5 ml-4" />
              </a>
            ))}
          </nav>
        </div>
        <div className="font-fira flex items-center justify-between">
          <p>{occupation}</p>
          <p>{email}</p>
        </div>
      </header>

      <main>
        <div className="pt-8">
          <h2 className="font-fira text-xl font-semibold tracking-wide">Waves</h2>
          <a href="https://waves.olle.io" target="_blank" rel="noopener noreferrer external" className="text-blue-600 hover:underline">https://waves.olle.io</a>
        </div>
        <div className="pt-8">
          <h2 className="font-fira text-xl font-semibold tracking-wide">Scrobbles</h2>
          <div className="border border-gray-800 rounded-md py-2 px-4 mt-2">
            <ScrobbleSection title="Top Tracks" items={tracks} />
            <ScrobbleSection title="Top Albums" items={albums} />
            <ScrobbleSection title="Top Artists" items={artists} />
          </div>
        </div>
      </main>

      <footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [, tracks] = await getTopTracks('1month');
  const [, albums] = await getTopAlbums('1month');
  const [, artists] = await getTopArtists('1month');

  return {
    props: {
      tracks,
      albums,
      artists,
    },
    revalidate: 1,
  };
};

export default Home;
