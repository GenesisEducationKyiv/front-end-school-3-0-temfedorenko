import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useStore } from '../store';
import { getTracksRequest } from '../api/tracks';
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

  const { data, error, isError, isLoading } = useQuery({
    queryFn: getTracksRequest,
    queryKey: ['tracks', {
      page: currentPage,
      genre: genreFilter,
      search: searchQuery,
      sort: sortOption?.sort,
      order: sortOption?.order,
    }],
  });

  useEffect(() => {
    if (data) {
      setCurrentPage(data?.meta?.page);
      setTotalPages(data?.meta?.totalPages);
    }
    
  }, [data, setTotalPages, setCurrentPage]);

  return {
    data,
    error,
    isError,
    isLoading,
  };
};