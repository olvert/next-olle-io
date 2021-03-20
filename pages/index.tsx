import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import {
  siteTitle,
  urls,
  occupation,
  email,
} from '../lib/data.json';

import {
  WavesIcon,
  GithubIcon,
  LinkedinIcon,
} from '../components/Icons';

import {
  getTopTracks,
  getTopAlbums,
  Item,
  getTopArtists,
  defaultPeriod,
} from '../lib/lastfm/lastfmClient';

import ScrobbleSection from '../components/ScrobbleSection';
import { getVersion } from '../lib/utils';

type Props = {
  tracks: Item[];
  albums: Item[];
  artists: Item[];
}

type NavItem = {
  url: string;
  label: string;
  Icon: React.FunctionComponent<React.HTMLAttributes<SVGSVGElement>>;
}

const navItems: NavItem[] = [
  { url: urls.waves, label: 'Waves', Icon: WavesIcon },
  { url: urls.github, label: 'Github', Icon: GithubIcon },
  { url: urls.linkedin, label: 'Linkedin', Icon: LinkedinIcon },
];

const Home = (props: Props): JSX.Element => {
  const { tracks, albums, artists } = props;
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={`${siteTitle} — ${occupation}`} />
      </Head>
      <header className="py-4">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-lg font-semibold tracking-wide select-none">{siteTitle}</h1>
          <nav className="flex">
            { navItems.map(({ url, label, Icon }) => (
              <a key={url} href={url} aria-label={label} target="_blank" rel="noopener noreferrer external" className="text-gray-100 hover:text-blue-600">
                <Icon className="w-5 h-5 ml-4" />
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-between text-gray-400">
          <p>{occupation}</p>
          <p>{email}</p>
        </div>
      </header>

      <main>
        <div className="py-4">
          <ScrobbleSection title="Top Tracks" items={tracks} baseKey="/api/top/tracks" />
          <ScrobbleSection title="Top Albums" items={albums} baseKey="/api/top/albums" />
          <ScrobbleSection title="Top Artists" items={artists} baseKey="/api/top/artists" />
        </div>
      </main>

      <footer>
        <p className="text-gray-400 text-sm text-center">{getVersion()}</p>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [, tracks] = await getTopTracks(defaultPeriod);
  const [, albums] = await getTopAlbums(defaultPeriod);
  const [, artists] = await getTopArtists(defaultPeriod);

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
