import { Stack } from '@mui/material';

import { SortSelect } from './SortSelect';
import { SearchInput } from './SearchInput';
import { GenreFilter } from './GenreFilter';
import { CreateTrackButton } from './CreateTrackButton';
///////////////////////////////////////////////////////

export function Panel() {
  return (
    <Stack mt='20px' gap='20px' flexWrap='wrap' direction='row' alignItems='center' justifyContent='space-between'>
      <CreateTrackButton />
      <Stack flexWrap='wrap' direction='row' gap={{ xs: '12px', md: '20px' }}>
        <SortSelect />
        <GenreFilter />
        <SearchInput />
      </Stack>
    </Stack>
  );
}
