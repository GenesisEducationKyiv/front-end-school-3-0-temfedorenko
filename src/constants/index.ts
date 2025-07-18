import type { ISortOption } from '@/types/track.types';
///////////////////////////////////////////////////////

// track modal types
export const EDIT_TRACK = 'editTrack';
export const CREATE_TRACK = 'createTrack';
export const DELETE_TRACK = 'deleteTrack';
export const UPLOAD_TRACK_FILE = 'uploadTrackFile';
export const DELETE_TRACK_FILE = 'deleteTrackFile';

export const TRACK_MODAL_TYPES = {
  [EDIT_TRACK]: EDIT_TRACK,
  [CREATE_TRACK]: CREATE_TRACK,
  [DELETE_TRACK]: DELETE_TRACK,
  [UPLOAD_TRACK_FILE]: UPLOAD_TRACK_FILE,
  [DELETE_TRACK_FILE]: DELETE_TRACK_FILE,
} as const;

// query keys
export const TRACKS_QUERY_KEY = 'tracks';
export const GENRES_QUERY_KEY = 'genres';

// fields
export const FIELD_TITLE = 'title';
export const FIELD_ALBUM = 'album';
export const FIELD_ARTIST = 'artist';
export const FIELD_GENRES = 'genres';
export const FIELD_AUDIO_FILE = 'audioFile';
export const FIELD_COVER_IMAGE = 'coverImage';

// options
export const TRACK_SORT_OPTIONS_MAP = {
  'title-asc': { sort: 'title', order: 'asc' },
  'title-desc': { sort: 'title', order: 'desc' },
  'artist-asc': { sort: 'artist', order: 'asc' },
  'artist-desc': { sort: 'artist', order: 'desc' },
  'album-asc': { sort: 'album', order: 'asc' },
  'album-desc': { sort: 'album', order: 'desc' },
  'createdAt-asc': { sort: 'createdAt', order: 'asc' },
  'createdAt-desc': { sort: 'createdAt', order: 'desc' },
} as const;

export const TRACK_SORT_OPTIONS: ISortOption[] = [
  { label: 'Clear', value: '' },
  { label: 'Title ↑', value: 'title-asc' },
  { label: 'Title ↓', value: 'title-desc' },
  { label: 'Artist ↑', value: 'artist-asc' },
  { label: 'Artist ↓', value: 'artist-desc' },
  { label: 'Album ↑', value: 'album-asc' },
  { label: 'Album ↓', value: 'album-desc' },
  { label: 'Newest', value: 'createdAt-desc' },
  { label: 'Oldest', value: 'createdAt-asc' },
];

// url params
export const PAGE_URL_PARAM = 'page';
export const SORT_URL_PARAM = 'sort';
export const GENRE_URL_PARAM = 'genre';
export const SEARCH_URL_PARAM = 'search';
