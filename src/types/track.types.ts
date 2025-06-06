import type { TRACK_SORT_OPTIONS_MAP } from '../constants';
///////////////////////////////////////////////////////

export type TSortOption = keyof typeof TRACK_SORT_OPTIONS_MAP | '';

export interface ITrack {
  album?: string;
  artist: string;
  audioFile?: string;
  coverImage?: string;
  createdAt: string;
  genres: string[];
  id: string;
  slug: string;
  title: string;
  updatedAt: string;
}

export interface ICreateTrackPayload {
  album?: string;
  artist: string;
  coverImage?: string;
  genres: string[];
  title: string;
}

export interface IUpdateTrackPayload extends ICreateTrackPayload {
  id: string;
}

export interface ITracksResponse {
  data: ITrack[];
  meta: {
    limit: number;
    page: number;
    totalPages: number;
    total: number;
  };
}

export interface ITracksQuery {
  page: number;
  genre: string;
  search: string;
  sort: string;
  order: string;
}
