import { create } from 'zustand';
///////////////////////////////////////////////////////

export const useStore = create((set) => ({
  totalPages: 0,
  currentPage: 1,
  sortOption: null,
  trackModal: null,
  genreFilter: null,
  searchQuery: null,
  selectedTrack: {},
  playingTrackId: null,
  setTotalPages: (totalPages) => set({ totalPages }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setPlayingTrackId: (playingTrackId) => set({ playingTrackId }),
  closeTrackModal: () => set({ trackModal: null, selectedTrack: {} }),
  setGenreFilter: (genreFilter) => set({ genreFilter, currentPage: 1 }),
  setSortOption: (option) => set({ sortOption: option, currentPage: 1 }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  openTrackModal: ({ type, track = {} }) => set({ trackModal: type, selectedTrack: track }),
}));