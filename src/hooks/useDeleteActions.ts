import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useStore } from '../store/index';
import { showToast } from '../helpers/index';
import { TRACKS_QUERY_KEY } from '../constants';
import { deleteTrackRequest, deleteTrackFileRequest } from '../api/tracks';
///////////////////////////////////////////////////////

export const useDeleteActions = () => {
  const { closeTrackModal } = useStore();

  const queryClient = useQueryClient();

  const { mutate: deleteTrack, isPending: isDeleting, isError: isDeleteError, error: deleteError } = useMutation({
    mutationFn: deleteTrackRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRACKS_QUERY_KEY] });

      closeTrackModal();
      showToast('Track deleted successfully');
    },
  });

  const { mutate: deleteTrackFile, isPending: isDeletingFile, isError: isDeleteFileError, error: deleteFileError } = useMutation({
    mutationFn: deleteTrackFileRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRACKS_QUERY_KEY] });

      closeTrackModal();
      showToast('Track file deleted successfully');
    },
  });

  return {
    isDeleting,
    deleteError,
    deleteTrack,
    isDeleteError,
    isDeletingFile,
    deleteTrackFile,
    deleteFileError,
    isDeleteFileError,
  };
};
