import { useQuery } from '@tanstack/react-query';

import { GENRES_QUERY_KEY } from '../constants';
import { getGenresRequest } from '../api/tracks';
///////////////////////////////////////////////////////

export const useTrackGenresData = () => {
  const { data: genres, isLoading: isGenresLoading, isError: isGenresError, error: genresError } = useQuery<string[]>({
    queryKey: [GENRES_QUERY_KEY],
    queryFn: getGenresRequest,
  });

  return {
    genres,
    genresError,
    isGenresError,
    isGenresLoading,
  };
};
