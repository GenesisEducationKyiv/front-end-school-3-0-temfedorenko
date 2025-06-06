import { Box, TableCell, TableRow, IconButton } from '@mui/material';
import { Edit, Delete, AudioFile, HighlightOff } from '@mui/icons-material';

import { Audio } from './Audio';
import { useStore } from '../../store';
import { API_BASE_URL, endpoints } from '../../api/endpoints';
import defaultCoverImage from '../../assets/images/cover-image.jpg';
import { EDIT_TRACK, DELETE_TRACK, UPLOAD_TRACK_FILE, DELETE_TRACK_FILE } from '../../constants';

import type { ITrack } from '../../types/track.types';
///////////////////////////////////////////////////////

export function TrackItem({ track }: { track: ITrack }) {
  const { id, title, artist, album, genres, audioFile, coverImage } = track;

  const { openTrackModal } = useStore();

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
        {
          audioFile &&
          <Box display='flex' gap='5px' alignItems='center' justifyContent='flex-start'>
            <Audio id={id} url={`${API_BASE_URL}${endpoints.files}/${audioFile}`} />
            <IconButton title='Delete audio file' onClick={() => openTrackModal({ track, type: DELETE_TRACK_FILE })}>
              <HighlightOff />
            </IconButton>
          </Box>
        }
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
