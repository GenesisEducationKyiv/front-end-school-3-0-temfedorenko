import Stack from '@mui/material/Stack';

import { SortSelect } from '@/components/tracks/SortSelect';
import { SearchInput } from '@/components/tracks/SearchInput';
import { GenreFilter } from '@/components/tracks/GenreFilter';
import { CreateTrackButton } from '@/components/tracks/CreateTrackButton';
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
