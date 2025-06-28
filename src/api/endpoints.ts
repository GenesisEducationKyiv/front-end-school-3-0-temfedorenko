export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_BASE_URL = `${BASE_URL}/api`;

const FILES_ENDPOINT = '/files';
const GENRES_ENDPOINT = '/genres';
const TRACKS_ENDPOINT = '/tracks';

export const endpoints = {
  files: FILES_ENDPOINT,
  genres: GENRES_ENDPOINT,
  tracks: TRACKS_ENDPOINT,
  getTracksEndpointById: (id: string) => `${TRACKS_ENDPOINT}/${id}`,
  getTracksFileEndpointById: (id: string) => `${TRACKS_ENDPOINT}/${id}/file`,
  getTracksUploadEndpointById: (id: string) => `${TRACKS_ENDPOINT}/${id}/upload`,
} as const;
