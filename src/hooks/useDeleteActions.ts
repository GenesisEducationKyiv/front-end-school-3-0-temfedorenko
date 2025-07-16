import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showToast } from '@/helpers';
import { useTracksStore } from '@/store';
import { TRACKS_QUERY_KEY } from '@/constants';
import { selectCloseTrackModal } from '@/selectors';
import { useTrackFiltersAndSorting } from '@/hooks/useTrackFiltersAndSorting';
import { deleteTrackRequest, deleteTrackFileRequest } from '@/api/tracks';
///////////////////////////////////////////////////////

export const useDeleteActions = () => {
  const closeTrackModal = useTracksStore(selectCloseTrackModal);

  const { currentPage, resetCurrentPage } = useTrackFiltersAndSorting();

  const queryClient = useQueryClient();

  const { mutate: deleteTrack, isPending: isDeleting, isError: isDeleteError, error: deleteError } = useMutation({
    mutationFn: deleteTrackRequest,
    onSuccess: () => {
      closeTrackModal();

      if (currentPage === 1) {
        queryClient.invalidateQueries({ queryKey: [TRACKS_QUERY_KEY] });
      } else {
        resetCurrentPage();
      }

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
