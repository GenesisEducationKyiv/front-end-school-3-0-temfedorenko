import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useStore } from '../store';
import { getTracksRequest } from '../api/tracks';
import { TRACKS_QUERY_KEY, TRACK_SORT_OPTIONS_MAP } from '../constants';

import type { ITracksResponse } from '../types/track.types';
///////////////////////////////////////////////////////

export const useTrackData = () => {
  const {
    sortOption,
    currentPage,
    genreFilter,
    searchQuery,
    setTotalPages,
    setCurrentPage,
  } = useStore();

  const { data, error, isError, isLoading } = useQuery<ITracksResponse>({
    queryFn: getTracksRequest,
    queryKey: [TRACKS_QUERY_KEY, {
      page: currentPage,
      genre: genreFilter,
      search: searchQuery,
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
