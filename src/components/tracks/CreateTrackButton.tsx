import { lazy, Suspense } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useTracksStore } from '../../store';
import { CREATE_TRACK } from '../../constants';
import { selectTrackModal, selectOpenTrackModal, selectCloseTrackModal } from '../../selectors';
//////////////////////////////////////////////////

const TrackForm = lazy(() => import('./TrackForm'));
const ModalComponent = lazy(() => import('../Modal'));

export function CreateTrackButton() {
  const trackModal = useTracksStore(selectTrackModal);
  const openTrackModal = useTracksStore(selectOpenTrackModal);
  const closeTrackModal = useTracksStore(selectCloseTrackModal);

  return (
    <Box>
      <Button
        data-testid='create-track-button'
        sx={{ height: 50, fontSize: 18, minWidth: 160 }}
        onClick={() => openTrackModal({ type: CREATE_TRACK })}
      >
        Create Track
      </Button>
      <Suspense fallback={null}>
        {
          trackModal === CREATE_TRACK &&
          <ModalComponent title='Create Track' handleClose={closeTrackModal}>
            <TrackForm isCreate={true} handleClose={closeTrackModal} />
          </ModalComponent>
        }
      </Suspense>
    </Box>
  );
}
