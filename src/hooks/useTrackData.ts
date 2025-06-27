import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useTracksStore } from '../store';
import { getTracksRequest } from '../api/tracks';
import { selectSetTotalPages } from '../selectors';
import { useTrackFiltersAndSorting } from './useTrackFiltersAndSorting';
import { PAGE_URL_PARAM, TRACKS_QUERY_KEY, TRACK_SORT_OPTIONS_MAP } from '../constants';

import type { ITracksResponse } from '../types/track.types';
///////////////////////////////////////////////////////

export const useTrackData = () => {
  const setTotalPages = useTracksStore(selectSetTotalPages);

  const { sortOption, currentPage, genreFilter, searchQuery, setFilters } = useTrackFiltersAndSorting();

  const { data, error, isError, isLoading } = useQuery<ITracksResponse>({
    queryFn: getTracksRequest,
    queryKey: [TRACKS_QUERY_KEY, {
      page: currentPage,
      genre: genreFilter || null,
      search: searchQuery || null,
      sort: sortOption ? TRACK_SORT_OPTIONS_MAP[sortOption]?.sort : null,
      order: sortOption ? TRACK_SORT_OPTIONS_MAP[sortOption]?.order : null,
    }],
  });

  useEffect(() => {
    if (data?.meta) {
      setFilters(PAGE_URL_PARAM, String(data.meta.page));
      setTotalPages(data.meta.totalPages);
    }
    
  }, [data, setFilters, setTotalPages]);

  return {
    data,
    error,
    isError,
    isLoading,
  };
};
