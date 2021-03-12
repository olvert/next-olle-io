import React from 'react';
import Head from 'next/head';

import { siteTitle, twitterUrl, githubUrl, linkedinUrl } from '../lib/data.json';
import TwitterIcon from '../components/icons/TwitterIcon';
import GithubIcon from '../components/icons/GithubIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';

type NavItem = {
  url: string;
  Icon: React.FunctionComponent<React.HTMLAttributes<SVGSVGElement>>;
}

const navItems: NavItem[] = [
  { url: twitterUrl, Icon: TwitterIcon },
  { url: githubUrl, Icon: GithubIcon },
  { url: linkedinUrl, Icon: LinkedinIcon },
];

const Home = (): JSX.Element => (
  <div className="mx-auto w-full max-w-2xl py-4">
    <Head>
      <title>{siteTitle}</title>
    </Head>

    <header className="py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold tracking-wide uppercase select-none">{siteTitle}</h1>
      <nav className="flex">
        { navItems.map(({ url, Icon }) => (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer external" className="hover:text-blue-600">
            <Icon className="w-5 h-5 ml-4" />
          </a>
        ))}
      </nav>
    </header>

    <main />

    <footer />
  </div>
);

export default Home;
