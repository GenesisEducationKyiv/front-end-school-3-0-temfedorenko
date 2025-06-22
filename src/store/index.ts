import { create } from 'zustand';

import { TRACK_MODAL_TYPES } from '../constants';

import type { ITrack } from '../types/track.types';
///////////////////////////////////////////////////////

type TTrackModalType = keyof typeof TRACK_MODAL_TYPES;

export interface IStore {
  totalPages: number;
  trackModal: TTrackModalType | null;
  selectedTrack: ITrack | Record<string, never>;
  playingTrackId: string | null;
  setTotalPages: (totalPages: number) => void;
  setPlayingTrackId: (playingTrackId: string | null) => void;
  closeTrackModal: () => void;
  openTrackModal: ({ type, track }: { type: TTrackModalType; track?: ITrack | undefined }) => void;
}

export const useTracksStore = create<IStore>((set) => ({
  totalPages: 0,
  trackModal: null,
  selectedTrack: {},
  playingTrackId: null,
  setTotalPages: (totalPages) => set({ totalPages }),
  setPlayingTrackId: (playingTrackId) => set({ playingTrackId }),
  closeTrackModal: () => set({ trackModal: null, selectedTrack: {} }),
  openTrackModal: ({ type, track }) => set({ trackModal: type, selectedTrack: track || {} }),
}));
