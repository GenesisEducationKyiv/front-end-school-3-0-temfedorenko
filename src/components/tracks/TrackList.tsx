import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

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
      <Skeleton variant='rectangular' sx={{ height: 200, width: 1100, mt: '20px' }} />
    );
  }

  if (isError) return <Alert severity='error' sx={{ mt: '20px' }} data-testid='error-tracks'>{getErrorMessage(error)}</Alert>;

  if (data?.data?.length === 0) {
    return <Alert severity='info' sx={{ mt: '50px', fontSize: 18 }}>There are no tracks. Please, change the filters or create a new track</Alert>;
  }

  return (
    <>
      <Box mt='20px'>
        <TableContainer component={Paper}>
          <Table sx={{ width: 1100, overflow: 'auto' }}>
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
