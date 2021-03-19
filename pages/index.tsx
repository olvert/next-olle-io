import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import {
  siteTitle,
  wavesUrl,
  twitterUrl,
  githubUrl,
  linkedinUrl,
  occupation,
  email,
} from '../lib/data.json';

import {
  WavesIcon,
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
} from '../components/Icons';

import {
  getTopTracks,
  getTopAlbums,
  Item,
  getTopArtists,
} from '../lib/lastfm/lastfmClient';

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
  { url: wavesUrl, Icon: WavesIcon },
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
          <h1 className="text-xl font-semibold tracking-wider select-none uppercase">{siteTitle}</h1>
          <nav className="flex">
            { navItems.map(({ url, Icon }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer external" className="text-gray-100 hover:text-blue-600">
                <Icon className="w-5 h-5 ml-4" />
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-between">
          <p>{occupation}</p>
          <p>{email}</p>
        </div>
      </header>

      <main>
        <div className="pt-4">
          <ScrobbleSection title="Top Tracks" items={tracks} baseKey="/api/top/tracks" />
          <ScrobbleSection title="Top Albums" items={albums} baseKey="/api/top/albums" />
          <ScrobbleSection title="Top Artists" items={artists} baseKey="/api/top/artists" />
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
