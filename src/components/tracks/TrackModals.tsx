import { lazy } from 'react';
import DialogContentText from '@mui/material/DialogContentText';

import { useTracksStore } from '@/store';
import { Fallback } from '@/components/Fallback';
import { useDeleteActions } from '@/hooks/useDeleteActions';
import { selectTrackModal, selectSelectedTrack, selectCloseTrackModal } from '@/selectors';
import { EDIT_TRACK, DELETE_TRACK, UPLOAD_TRACK_FILE, DELETE_TRACK_FILE } from '@/constants';
///////////////////////////////////////////////////////

const ModalComponent = lazy(() => import('@/components/Modal').then(m => ({ default: m.ModalComponent })));
const TrackForm = lazy(() => import('@/components/tracks/TrackForm').then(m => ({ default: m.TrackForm })));
const UploadTrackFileForm = lazy(() => import('@/components/tracks/UploadTrackFileForm').then(m => ({ default: m.UploadTrackFileForm })));

export function TrackModals() {
  const trackModal = useTracksStore(selectTrackModal);
  const selectedTrack = useTracksStore(selectSelectedTrack);
  const closeTrackModal = useTracksStore(selectCloseTrackModal);

  const {
    isDeleting,
    deleteError,
    deleteTrack,
    isDeleteError,
    isDeletingFile,
    deleteTrackFile,
    deleteFileError,
    isDeleteFileError,
  } = useDeleteActions();

  const modalConfig = {
    [EDIT_TRACK]: {
      title: 'Edit Track',
      content: <Fallback><TrackForm handleClose={closeTrackModal} /></Fallback>,
    },
    [UPLOAD_TRACK_FILE]: {
      title: 'Upload Track File',
      content: <Fallback><UploadTrackFileForm handleClose={closeTrackModal} /></Fallback>,
    },
    [DELETE_TRACK]: {
      isConfirm: true,
      error: deleteError,
      title: 'Delete Track',
      isLoading: isDeleting,
      isError: isDeleteError,
      handleConfirm: () => deleteTrack(selectedTrack?.id),
      content: (
        <DialogContentText>
          Are you sure you want to delete "{selectedTrack?.title}"?
        </DialogContentText>
      ),
    },
    [DELETE_TRACK_FILE]: {
      isConfirm: true,
      error: deleteFileError,
      isLoading: isDeletingFile,
      title: 'Delete Audio File',
      isError: isDeleteFileError,
      handleConfirm: () => deleteTrackFile(selectedTrack?.id),
      content: (
        <DialogContentText>
          Are you sure you want to delete "{selectedTrack?.title}" audio file?
        </DialogContentText>
      ),
    },
  };

  if (!trackModal || !(trackModal in modalConfig)) return null;

  const currentModalConfig = modalConfig[trackModal as keyof typeof modalConfig];

  if (!currentModalConfig) return null;

  const { title, content, ...modalProps } = currentModalConfig;

  return (
    <ModalComponent title={title} handleClose={closeTrackModal} {...modalProps}>
      {content}
    </ModalComponent>
  );
}
