import React from 'react';
import { DialogContentText } from '@mui/material';

import { TrackForm } from './TrackForm.jsx';
import { ModalComponent } from '../Modal.jsx';
import { useStore } from '../../store/index.js';
import { UploadTrackFileForm } from './UploadTrackFileForm.jsx';
import { useDeleteActions } from '../../hooks/useDeleteActions.js';
import { EDIT_TRACK, DELETE_TRACK, UPLOAD_TRACK_FILE, DELETE_TRACK_FILE } from '../../constants/index.js';
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

  const currentModalConfig = modalConfig[trackModal];

  if (!currentModalConfig) return null;

  const { title, content, ...modalProps } = currentModalConfig;

  return (
    <ModalComponent title={title} handleClose={closeTrackModal} {...modalProps}>
      {content}
    </ModalComponent>
  );
}