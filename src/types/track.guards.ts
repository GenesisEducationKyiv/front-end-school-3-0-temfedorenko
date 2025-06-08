import { TRACK_SORT_OPTIONS_MAP } from '../constants';

import type { TSortOption } from './track.types';
///////////////////////////////////////////////////////

export const isTSortOption = (value: string): value is TSortOption => Object.keys(TRACK_SORT_OPTIONS_MAP).includes(value);

export const isValidGenre = (genre: string, genres: unknown): genre is string => Array.isArray(genres) && genres.includes(genre);
