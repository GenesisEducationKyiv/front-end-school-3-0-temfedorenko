import { api } from '.';

import type { QueryFunctionContext } from '@tanstack/react-query';
import type {
  ITrack,
  ITracksQuery,
  ITracksResponse,
  ICreateTrackPayload,
  IUpdateTrackPayload,
} from '../types/track.types';
///////////////////////////////////////////////////////

const getGenresRequest = async (): Promise<string[]> => {
  const response = await api.get('/genres');

  return response.data;
};

const getTracksRequest = async ({ queryKey }: QueryFunctionContext): Promise<ITracksResponse> => {
  const [, params] = queryKey as ['tracks', ITracksQuery];

  const response = await api.get('/tracks', { params });
  
  return response.data;
};

const createTrackRequest = async (trackData: ICreateTrackPayload): Promise<ITrack> => {
  const response = await api.post('/tracks', trackData);

  return response.data;
};

const updateTrackRequest = async ({ id, ...data }: IUpdateTrackPayload): Promise<ITrack> => {
  const response = await api.put(`/tracks/${id}`, data);

  return response.data;
};

const deleteTrackRequest = async (id: string) => {
  const response = await api.delete(`/tracks/${id}`);

  return response.data;
};

const uploadTrackFileRequest = async ({ id, data }: { id: string, data: FormData }) => {
  const response = await api.post(
    `/tracks/${id}/upload`,
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return response.data;
};

const deleteTrackFileRequest = async (id: string) => {
  const response = await api.delete(`/tracks/${id}/file`);

  return response.data;
};

export {
  getGenresRequest,
  getTracksRequest,
  createTrackRequest,
  updateTrackRequest,
  deleteTrackRequest,
  uploadTrackFileRequest,
  deleteTrackFileRequest,
};
