import { SelectComponent } from '../Select';
import { useTrackGenresData } from '../../hooks/useTrackGenresData';
import { useTrackFiltersAndSorting } from '../../hooks/useTrackFiltersAndSorting';

import { GENRE_URL_PARAM } from '../../constants';
import { createGenreOptions } from '../../helpers';

import type { SelectChangeEvent } from '@mui/material';
//////////////////////////////////////////////////

export function GenreFilter() {
  const { setFilters, genreFilter } = useTrackFiltersAndSorting();

  const { genres, isGenresError } = useTrackGenresData();

  if (!genres || isGenresError) return null;

  const handleChange = (event: SelectChangeEvent<string>) => setFilters(GENRE_URL_PARAM, event.target.value);

  const options = createGenreOptions(genres);

  return (
    <SelectComponent
      value={genreFilter}
      id='filteringByGenre'
      label='Filter by Genre'
      styles={{ width: 200 }}
      dataTestId='filter-genre'
      handleChange={handleChange}
      options={[{ value: '', label: 'Clear' }, ...options]}
    />
  );
}
