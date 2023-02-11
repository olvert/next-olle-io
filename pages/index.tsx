import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';

import imagePablo from '../public/img/pablo.png';
import imageMBDTF from '../public/img/mbdtf.png';

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
  const [imageIndex, setImageIndex] = React.useState(0);
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Head>
        <title>Olle Svensson</title>
        <meta name="description" content="" />

        <meta property="og:url" content="https://olle.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Olle Svensson" />
        <meta property="og:description" content="undefined" />
        <meta property="og:image" content="https://olle.io/img/mbdtf.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="olle.io" />
        <meta property="twitter:url" content="https://olle.io" />
        <meta name="twitter:title" content="Olle Svensson" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="https://olle.io/img/mbdtf.png" />

        <link rel="icon" href="favicon.svg" />
        <link rel="apple-touch-icon" href="favicon.svg" />
      </Head>
      <header className="cursor-pointer" onClick={() => setImageIndex((imageIndex + 1) % 2)}>
        {imageIndex === 0 && <NextImage src={imageMBDTF} width={1024} height={1024} quality={100} placeholder="blur" />}
        {imageIndex === 1 && <NextImage src={imagePablo} width={1024} height={1024} quality={100} placeholder="blur" />}
      </header>

      <main className="pt-5 sm:pt-10">
        <ScrobbleSection title="Top Tracks" items={tracks} baseKey="/api/top/tracks" />
        <ScrobbleSection title="Top Albums" items={albums} baseKey="/api/top/albums" />
        <ScrobbleSection title="Top Artists" items={artists} baseKey="/api/top/artists" />
      </main>

      <footer className="flex items-center justify-center text-sm">
        <p className="px-2">{getVersion()}</p>
        —
        <a className="px-2 text-blackish" href="https://github.com/olvert">GitHub</a>
        —
        <a className="px-2 text-blackish" href="https://se.linkedin.com/in/ollenossnevs">LinkedIn</a>
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
