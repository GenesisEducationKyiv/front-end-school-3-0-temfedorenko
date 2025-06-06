export const API_BASE_URL = 'http://localhost:8000/api';

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
