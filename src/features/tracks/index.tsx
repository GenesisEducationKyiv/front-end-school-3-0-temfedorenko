import { Box } from '@mui/material';

import { Panel } from '../../components/tracks/Panel';
import { TrackList } from '../../components/tracks/TrackList';
import { PaginationComponent } from '../../components/tracks/Pagination';
///////////////////////////////////////////////////////

export function TracksPage() {
  return (
    <Box component='section'>
      <Panel />
      <TrackList />
      <PaginationComponent />
    </Box>
  );
}
