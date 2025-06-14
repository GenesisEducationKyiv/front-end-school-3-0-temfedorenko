import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useStore } from '../store';
import { getTracksRequest } from '../api/tracks';
import { TRACKS_QUERY_KEY, TRACK_SORT_OPTIONS_MAP } from '../constants';
import { useTrackFiltersAndSorting } from './useTrackFiltersAndSorting';

import type { ITracksResponse } from '../types/track.types';
///////////////////////////////////////////////////////

export const useTrackData = () => {
  const { currentPage, setTotalPages, setCurrentPage } = useStore();

  const { sortOption, genreFilter, searchQuery } = useTrackFiltersAndSorting();

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
      setCurrentPage(data.meta.page);
      setTotalPages(data.meta.totalPages);
    }
    
  }, [data, setTotalPages, setCurrentPage]);

  return {
    data,
    error,
    isError,
    isLoading,
  };
};
