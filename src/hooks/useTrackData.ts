import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useStore } from '../store';
import { getTracksRequest } from '../api/tracks';
import { PAGE_URL_PARAM, TRACKS_QUERY_KEY, TRACK_SORT_OPTIONS_MAP } from '../constants';
import { useTrackFiltersAndSorting } from './useTrackFiltersAndSorting';

import type { ITracksResponse } from '../types/track.types';
///////////////////////////////////////////////////////

export const useTrackData = () => {
  const { setTotalPages } = useStore();

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
