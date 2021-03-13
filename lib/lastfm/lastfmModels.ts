export interface ResultAttr {
  page: string;
  total: string;
  user: string;
  perPage: string;
  totalPages: string;
}

export interface RankAttr {
  rank: string;
}

export interface Artist {
  url: string;
  name: string;
  mbid: string;
}

export interface Image {
  size: string;
  '#text': string;
}

export interface Streamable {
  fulltrack: string;
  '#text': string;
}

export interface Track {
  '@attr': RankAttr;
  duration: string;
  playcount: string;
  artist: Artist;
  image: Image[];
  streamable: Streamable;
  mbid: string;
  name: string;
  url: string;
}

export interface Album {
  artist: Artist;
  '@attr': RankAttr;
  image: Image[];
  playcount: string;
  url: string;
  name: string;
  mbid: string;
}

export interface TopTracks {
  '@attr': ResultAttr;
  track: Track[];
}

export interface EnvelopeTopTracks {
  toptracks: TopTracks;
}

export interface TopAlbums {
  album: Album[];
  '@attr': ResultAttr;
}

export interface EnvelopeTopAlbums {
  topalbums: TopAlbums;
}
