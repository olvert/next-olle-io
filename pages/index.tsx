import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';

import imagePablo from '../public/img/pablo.png';

import {
  title,
  urls,
} from '../lib/data.json';

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

const Home = (props: Props): JSX.Element => {
  const { tracks, albums, artists } = props;
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content="olle" /> */}

        <meta property="og:title" content={title} />
        {/* <meta property="og:description" content={getOccupation()} /> */}
        <meta property="og:type" content="website" />
      </Head>
      <header>
        <NextImage
          src={imagePablo}
          width={1024}
          height={1024}
          quality={100}
          placeholder="blur"
        />
      </header>

      <main className="pt-10">
        <ScrobbleSection title="Top Tracks" items={tracks} baseKey="/api/top/tracks" />
        <ScrobbleSection title="Top Albums" items={albums} baseKey="/api/top/albums" />
        <ScrobbleSection title="Top Artists" items={artists} baseKey="/api/top/artists" />
      </main>

      <footer className="flex items-center justify-center text-sm">
        <p className="px-2">{getVersion()}</p>
        —
        <a className="px-2 text-blackish" href={urls.github}>GitHub</a>
        —
        <a className="px-2 text-blackish" href={urls.github}>LinkedIn</a>
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
