import { useCallback } from 'react';
import * as Belt from '@mobily/ts-belt';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useTracksStore } from '../store';
import { selectTotalPages } from '../selectors';

import {
  PAGE_URL_PARAM,
  SORT_URL_PARAM,
  GENRE_URL_PARAM,
  GENRES_QUERY_KEY,
  SEARCH_URL_PARAM,
} from '../constants';

import { isValidPageValue, isValidString } from '../types/guards';
import { isValidGenre, isTSortOption } from '../types/track.guards';
///////////////////////////////////////////////////////

type TUrlParamName = typeof SORT_URL_PARAM | typeof GENRE_URL_PARAM | typeof SEARCH_URL_PARAM | typeof PAGE_URL_PARAM;

const getBeltUrlParam = <T extends string>(
  params: URLSearchParams,
  name: TUrlParamName,
  isValid: (value: string) => value is T
): Belt.Option<T> => Belt.pipe(
  Belt.O.fromNullable(params.get(name)),
  Belt.O.map((value) => value.trim()),
  Belt.O.flatMap((value) => isValid(value) ? Belt.O.Some(value) : Belt.O.None),
);

export function useTrackFiltersAndSorting() {
  const totalPages = useTracksStore(selectTotalPages);

  const queryClient = useQueryClient();
  const genres = queryClient.getQueryData<string[]>([GENRES_QUERY_KEY]);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = getBeltUrlParam(searchParams, SORT_URL_PARAM, isTSortOption);
  const searchQueryParam = getBeltUrlParam(searchParams, SEARCH_URL_PARAM, (search): search is string => isValidString(search));
  const genreFilterParam = getBeltUrlParam(searchParams, GENRE_URL_PARAM, (genre): genre is string => isValidGenre(genre, genres));
  const currentPageParam = getBeltUrlParam(searchParams, PAGE_URL_PARAM, (page): page is string => isValidPageValue(page, totalPages));

  const sortOption = Belt.O.getWithDefault(sortParam, '');
  const genreFilter = Belt.O.getWithDefault(genreFilterParam, '');
  const searchQuery = Belt.O.getWithDefault(searchQueryParam, '');
  const currentPage = Number(Belt.O.getWithDefault(currentPageParam, '1'));

  const setFilters = useCallback((name: TUrlParamName, value: string) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      if (name !== PAGE_URL_PARAM) params.set(PAGE_URL_PARAM, '1');

      Belt.pipe(
        Belt.O.fromNullable(value === '' ? Belt.O.None : Belt.O.Some(value)),
        Belt.O.match(
          (value) => params.set(name, value),
          () => params.delete(name),
        ),
      );

      return params;
    });
  }, [setSearchParams]);

  const resetCurrentPage = useCallback(() => {
    setFilters(PAGE_URL_PARAM, '1');
  }, [setFilters]);

  return {
    setFilters,
    sortOption,
    currentPage,
    genreFilter,
    searchQuery,
    resetCurrentPage,
  };
}
