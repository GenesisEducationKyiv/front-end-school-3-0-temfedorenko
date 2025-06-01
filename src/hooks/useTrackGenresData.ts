import { useQuery } from '@tanstack/react-query';

import { getGenresRequest } from '../api/tracks';
///////////////////////////////////////////////////////

export const useTrackGenresData = () => {
  const { data: genres, isLoading: isGenresLoading, isError: isGenresError, error: genresError } = useQuery<string[]>({
    queryKey: ['genres'],
    queryFn: getGenresRequest,
  });

  return {
    genres,
    genresError,
    isGenresError,
    isGenresLoading,
  };
};
