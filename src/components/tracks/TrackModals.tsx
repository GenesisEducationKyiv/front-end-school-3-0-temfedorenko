import { DialogContentText } from '@mui/material';

import { TrackForm } from './TrackForm';
import { ModalComponent } from '../Modal';
import { useStore } from '../../store/index';
import { UploadTrackFileForm } from './UploadTrackFileForm';
import { useDeleteActions } from '../../hooks/useDeleteActions';
import { EDIT_TRACK, DELETE_TRACK, UPLOAD_TRACK_FILE, DELETE_TRACK_FILE } from '../../constants/index';
///////////////////////////////////////////////////////

export function TrackModals() {
  const { trackModal, selectedTrack, closeTrackModal } = useStore();

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
      content: <TrackForm handleClose={closeTrackModal} />,
    },
    [UPLOAD_TRACK_FILE]: {
      title: 'Upload Track File',
      content: <UploadTrackFileForm handleClose={closeTrackModal} />,
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
