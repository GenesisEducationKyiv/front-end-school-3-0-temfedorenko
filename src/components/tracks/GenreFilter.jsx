import React from 'react';
import { Box } from '@mui/material';

import { useStore } from '../../store';
import { SelectComponent } from '../Select';
import { useTrackGenresData } from '../../hooks/useTrackGenresData';
//////////////////////////////////////////////////

export function GenreFilter() {
  const { genreFilter, setGenreFilter } = useStore();

  const { genres, isGenresError } = useTrackGenresData();

  if (!genres || isGenresError) return null;

  const handleChange = (event) => setGenreFilter(event.target.value);

  const options = genres?.map((name) => ({ label: name, value: name }));

  return (
    <SelectComponent
      value={genreFilter}
      id='filteringByGenre'
      label='Filter by Genre'
      styles={{ width: 200 }}
      dataTestId='filter-genre'
      handleChange={handleChange}
      options={[{ value: null, label: 'Clear' }, ...options]}
    />
  );
}