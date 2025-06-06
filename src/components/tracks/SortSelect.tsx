import { useStore } from '../../store';
import { SelectComponent } from '../Select';

import type { SelectChangeEvent } from '@mui/material';
import type { TSortOption } from '../../types/track.types';
//////////////////////////////////////////////////

interface ISortOption {
  label: string;
  value: TSortOption;
}

const sortOptions: ISortOption[] = [
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
  const { sortOption, setSortOption } = useStore();

  const handleChange = (event: SelectChangeEvent<string>) => setSortOption(event.target.value as TSortOption);

  return (
    <SelectComponent
      id='sorting'
      label='Sort by'
      options={sortOptions}
      styles={{ width: 200 }}
      value={sortOption || ''}
      dataTestId='sort-select'
      handleChange={handleChange}
    />
  );
}
