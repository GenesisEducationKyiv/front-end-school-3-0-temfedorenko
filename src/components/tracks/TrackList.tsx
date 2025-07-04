import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';

import { TrackItem } from './TrackItem';
import { TrackModals } from './TrackModals';
import { getErrorMessage } from '../../helpers';
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
