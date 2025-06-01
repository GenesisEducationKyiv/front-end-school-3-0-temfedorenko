import {
  Box,
  Table,
  Paper,
  Alert,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  CircularProgress,
} from '@mui/material';

import { TrackItem } from './TrackItem';
import { TrackModals } from './TrackModals';
import { getErrorMessage } from '../../helpers/index';
import { useTrackData } from '../../hooks/useTrackData';
///////////////////////////////////////////////////////

const headerCellStyles = {
  fontWeight: 700,
  color: '#4D4D4D',
  letterSpacing: '1px',
  fontSize: { sm: 18, md: 20 },
};

export function TrackList() {
  const { data, error, isError, isLoading } = useTrackData();

  if (isLoading) {
    return (
      <Box sx={{ mt: '20px', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color='inherit' data-testid='loading-tracks' />
      </Box>
    );
  }

  if (isError) return <Alert severity='error' sx={{ mt: '20px' }} data-testid='error-tracks'>{getErrorMessage(error)}</Alert>;

  if (data?.data?.length === 0) {
    return <Alert severity='info' sx={{ mt: '50px', fontSize: 18 }}>There are no tracks. Please, change the filters or create a new track</Alert>;
  }

  return (
    <>
      <Box sx={{ mt: '20px', overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={headerCellStyles}>Title</TableCell>
                <TableCell sx={headerCellStyles}>Artist</TableCell>
                <TableCell sx={headerCellStyles}>Album</TableCell>
                <TableCell sx={headerCellStyles}>Genres</TableCell>
                <TableCell align='center' sx={headerCellStyles}>Audio</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((track) => <TrackItem key={track.id} track={track} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TrackModals />
    </>
  );
}
