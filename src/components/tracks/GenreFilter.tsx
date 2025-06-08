import { SelectComponent } from '../Select';
import { useStore } from '../../store/index';
import { useTrackGenresData } from '../../hooks/useTrackGenresData';

import type { SelectChangeEvent } from '@mui/material';
//////////////////////////////////////////////////

export function GenreFilter() {
  const { genreFilter, setGenreFilter } = useStore();

  const { genres, isGenresError } = useTrackGenresData();

  if (!genres || isGenresError) return null;

  const handleChange = (event: SelectChangeEvent<string>) => setGenreFilter(event.target.value);

  const options = genres?.map((name) => ({ label: name, value: name }));

  return (
    <SelectComponent
      id='filteringByGenre'
      label='Filter by Genre'
      styles={{ width: 200 }}
      value={genreFilter || ''}
      dataTestId='filter-genre'
      handleChange={handleChange}
      options={[{ value: '', label: 'Clear' }, ...options]}
    />
  );
}
