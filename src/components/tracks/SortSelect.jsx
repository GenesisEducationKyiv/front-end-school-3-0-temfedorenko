import React from 'react';
import { Box } from '@mui/material';

import { useStore } from '../../store';
import { SelectComponent } from '../Select';
//////////////////////////////////////////////////

const sortOptions = [
  { label: 'Clear', value: null },
  { label: 'Title ↑', value: { sort: 'title', order: 'asc' } },
  { label: 'Title ↓', value: { sort: 'title', order: 'desc' } },
  { label: 'Artist ↑', value: { sort: 'artist', order: 'asc' } },
  { label: 'Artist ↓', value: { sort: 'artist', order: 'desc' } },
  { label: 'Album ↑', value: { sort: 'album', order: 'asc' } },
  { label: 'Album ↓', value: { sort: 'album', order: 'desc' } },
  { label: 'Newest', value: { sort: 'createdAt', order: 'desc' } },
  { label: 'Oldest', value: { sort: 'createdAt', order: 'asc' } },
];

export function SortSelect() {
  const { sortOption, setSortOption } = useStore();

  const handleChange = (event) => setSortOption(event.target.value);

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