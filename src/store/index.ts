import { create } from 'zustand';

import { TRACK_MODAL_TYPES } from '../constants';

import type { ITrack, TSortOption } from '../types/track.types';
///////////////////////////////////////////////////////

type TTrackModalType = keyof typeof TRACK_MODAL_TYPES;

interface IStore {
  totalPages: number;
  currentPage: number;
  sortOption: TSortOption | null;
  trackModal: TTrackModalType | null;
  genreFilter: string | null;
  searchQuery: string | null;
  selectedTrack: ITrack | Record<string, never>;
  playingTrackId: string | null;
  setTotalPages: (totalPages: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setPlayingTrackId: (playingTrackId: string | null) => void;
  closeTrackModal: () => void;
  setGenreFilter: (genreFilter: string) => void;
  setSortOption: (option: TSortOption | null) => void;
  setSearchQuery: (query: string) => void;
  openTrackModal: ({ type, track }: { type: TTrackModalType; track?: ITrack | undefined }) => void;
}

export const useStore = create<IStore>((set) => ({
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
  openTrackModal: ({ type, track }) => set({ trackModal: type, selectedTrack: track || {} }),
}));
