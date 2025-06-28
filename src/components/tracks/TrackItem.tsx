import { lazy } from 'react';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import AudioFile from '@mui/icons-material/AudioFile';
import HighlightOff from '@mui/icons-material/HighlightOff';

import { Fallback } from '../Fallback';
import { useTracksStore } from '../../store';
import { selectOpenTrackModal } from '../../selectors';
import { API_BASE_URL, endpoints } from '../../api/endpoints';
import defaultCoverImage from '../../assets/images/cover-image.jpg';
import { EDIT_TRACK, DELETE_TRACK, UPLOAD_TRACK_FILE, DELETE_TRACK_FILE } from '../../constants';

import type { ITrack } from '../../types/track.types';
///////////////////////////////////////////////////////

const Audio = lazy(() => import('./Audio'));

export function TrackItem({ track }: { track: ITrack }) {
  const { id, title, artist, album, genres, audioFile, coverImage } = track;

  const openTrackModal = useTracksStore(selectOpenTrackModal);

  const testId = `track-item-${id}`;

  return (
    <TableRow data-testid={testId}>
      <TableCell>
        <Box gap='10px' display='flex' alignItems='center'>
          <Box width={50} height={50} flexShrink={0}>
            <Box
              alt={title}
              width='100%'
              height='100%'
              component='img'
              sx={{ objectFit: 'contain' }}
              src={coverImage || defaultCoverImage}
              onError={({ currentTarget }: { currentTarget: HTMLImageElement }) => {
                if (currentTarget.src !== defaultCoverImage) {
                  currentTarget.src = defaultCoverImage;
                }
              }}
            />
          </Box>
          <Box data-testid={`${testId}-title`}>{title}</Box>
        </Box>
      </TableCell>
      <TableCell data-testid={`${testId}-artist`}>{artist}</TableCell>
      <TableCell data-testid={`${testId}-album`}>{album}</TableCell>
      <TableCell data-testid={`${testId}-genres`}>{genres?.join(', ')}</TableCell>
      <TableCell width={250}>
        <Fallback>
          {
            audioFile &&
            <Box display='flex' gap='5px' alignItems='center' justifyContent='flex-start'>
              <Audio id={id} url={`${API_BASE_URL}${endpoints.files}/${audioFile}`} />
              <IconButton title='Delete audio file' onClick={() => openTrackModal({ track, type: DELETE_TRACK_FILE })}>
                <HighlightOff />
              </IconButton>
            </Box>
          }
        </Fallback>
      </TableCell>
      <TableCell>
        <IconButton
          title='Edit Track'
          data-testid={`edit-track-${id}`}
          onClick={() => openTrackModal({ track, type: EDIT_TRACK })}
        >
          <Edit />
        </IconButton>
        <IconButton
          title='Delete Track'
          data-testid={`delete-track-${id}`}
          onClick={() => openTrackModal({ track, type: DELETE_TRACK })}
        >
          <Delete />
        </IconButton>
        {
          !audioFile &&
          <IconButton
            title='Upload Track File'
            data-testid={`upload-track-${id}`}
            onClick={() => openTrackModal({ track, type: UPLOAD_TRACK_FILE })}
          >
            <AudioFile />
          </IconButton>
        }
      </TableCell>
    </TableRow>
  );
}
