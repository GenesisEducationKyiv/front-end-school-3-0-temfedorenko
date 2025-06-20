import { SelectComponent } from '../Select';
import { SORT_URL_PARAM } from '../../constants';
import { useTrackFiltersAndSorting } from '../../hooks/useTrackFiltersAndSorting';

import type { SelectChangeEvent } from '@mui/material';
import type { TSortOption } from '../../types/track.types';
//////////////////////////////////////////////////

interface ISortOption {
  label: string;
  value: TSortOption;
}

export const sortOptions: ISortOption[] = [
  { label: 'Clear', value: '' },
  { label: 'Title ↑', value: 'title-asc' },
  { label: 'Title ↓', value: 'title-desc' },
  { label: 'Artist ↑', value: 'artist-asc' },
  { label: 'Artist ↓', value: 'artist-desc' },
  { label: 'Album ↑', value: 'album-asc' },
  { label: 'Album ↓', value: 'album-desc' },
  { label: 'Newest', value: 'createdAt-desc' },
  { label: 'Oldest', value: 'createdAt-asc' },
];

export function SortSelect() {
  const { sortOption, setFilters } = useTrackFiltersAndSorting();

  const handleChange = (event: SelectChangeEvent<string>) => setFilters(SORT_URL_PARAM, event.target.value as TSortOption);

  return (
    <SelectComponent
      id='sorting'
      label='Sort by'
      value={sortOption}
      options={sortOptions}
      styles={{ width: 200 }}
      dataTestId='sort-select'
      handleChange={handleChange}
    />
  );
}
