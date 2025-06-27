import type { IStore } from '../store';
///////////////////////////////////////////////////////

const selectTotalPages = (s: IStore) => s.totalPages;
const selectTrackModal = (s: IStore) => s.trackModal;
const selectSetTotalPages = (s: IStore) => s.setTotalPages;
const selectSelectedTrack = (s: IStore) => s.selectedTrack;
const selectPlayingTrackId = (s: IStore) => s.playingTrackId;
const selectOpenTrackModal = (s: IStore) => s.openTrackModal;
const selectCloseTrackModal = (s: IStore) => s.closeTrackModal;
const selectSetPlayingTrackId = (s: IStore) => s.setPlayingTrackId;

export {
  selectTotalPages,
  selectTrackModal,
  selectSetTotalPages,
  selectSelectedTrack,
  selectPlayingTrackId,
  selectOpenTrackModal,
  selectCloseTrackModal,
  selectSetPlayingTrackId,
};
