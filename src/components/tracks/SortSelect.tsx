import { SelectComponent } from '../Select';
import { SORT_URL_PARAM, TRACK_SORT_OPTIONS } from '../../constants';
import { useTrackFiltersAndSorting } from '../../hooks/useTrackFiltersAndSorting';

import type { TSortOption } from '../../types/track.types';
import type { SelectChangeEvent } from '@mui/material/Select';
//////////////////////////////////////////////////

export function SortSelect() {
  const { sortOption, setFilters } = useTrackFiltersAndSorting();

  const handleChange = (event: SelectChangeEvent<string>) => setFilters(SORT_URL_PARAM, event.target.value as TSortOption);

  return (
    <SelectComponent
      id='sorting'
      label='Sort by'
      value={sortOption}
      styles={{ width: 200 }}
      dataTestId='sort-select'
      handleChange={handleChange}
      options={TRACK_SORT_OPTIONS}
    />
  );
}
