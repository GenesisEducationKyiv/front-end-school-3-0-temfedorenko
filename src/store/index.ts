import { create } from 'zustand';

import { TRACK_MODAL_TYPES } from '../constants';

import type { ITrack } from '../types/track.types';
///////////////////////////////////////////////////////

type TTrackModalType = keyof typeof TRACK_MODAL_TYPES;

interface IStore {
  totalPages: number;
  currentPage: number;
  trackModal: TTrackModalType | null;
  selectedTrack: ITrack | Record<string, never>;
  playingTrackId: string | null;
  setTotalPages: (totalPages: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setPlayingTrackId: (playingTrackId: string | null) => void;
  closeTrackModal: () => void;
  openTrackModal: ({ type, track }: { type: TTrackModalType; track?: ITrack | undefined }) => void;
}

export const useStore = create<IStore>((set) => ({
  totalPages: 0,
  currentPage: 1,
  trackModal: null,
  selectedTrack: {},
  playingTrackId: null,
  setTotalPages: (totalPages) => set({ totalPages }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setPlayingTrackId: (playingTrackId) => set({ playingTrackId }),
  closeTrackModal: () => set({ trackModal: null, selectedTrack: {} }),
  openTrackModal: ({ type, track }) => set({ trackModal: type, selectedTrack: track || {} }),
}));
