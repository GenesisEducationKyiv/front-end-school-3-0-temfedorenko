import { Box, Button } from '@mui/material';

import { useStore } from '../../store';
import { TrackForm } from './TrackForm';
import { ModalComponent } from '../Modal';
import { CREATE_TRACK } from '../../constants';
//////////////////////////////////////////////////

export function CreateTrackButton() {
  const { trackModal, openTrackModal, closeTrackModal } = useStore();

  return (
    <Box>
      <Button
        data-testid='create-track-button'
        sx={{ height: 50, fontSize: 18, minWidth: 160 }}
        onClick={() => openTrackModal({ type: CREATE_TRACK })}
      >
        Create Track
      </Button>
      {
        trackModal === CREATE_TRACK &&
        <ModalComponent title='Create Track' handleClose={closeTrackModal}>
          <TrackForm isCreate={true} handleClose={closeTrackModal} />
        </ModalComponent>
      }
    </Box>
  );
}
