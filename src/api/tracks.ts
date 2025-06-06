import { api } from '.';

import { endpoints } from './endpoints';
import { TRACKS_QUERY_KEY } from '../constants';

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
  const response = await api.get(endpoints.genres);

  return response.data;
};

const getTracksRequest = async ({ queryKey }: QueryFunctionContext): Promise<ITracksResponse> => {
  const [, params] = queryKey as [typeof TRACKS_QUERY_KEY, ITracksQuery];

  const response = await api.get(endpoints.tracks, { params });
  
  return response.data;
};

const createTrackRequest = async (trackData: ICreateTrackPayload): Promise<ITrack> => {
  const response = await api.post(endpoints.tracks, trackData);

  return response.data;
};

const updateTrackRequest = async ({ id, ...data }: IUpdateTrackPayload): Promise<ITrack> => {
  const response = await api.put(endpoints.getTracksEndpointById(id), data);

  return response.data;
};

const deleteTrackRequest = async (id: string) => {
  const response = await api.delete(endpoints.getTracksEndpointById(id));

  return response.data;
};

const uploadTrackFileRequest = async ({ id, data }: { id: string, data: FormData }) => {
  const response = await api.post(
    endpoints.getTracksUploadEndpointById(id),
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return response.data;
};

const deleteTrackFileRequest = async (id: string) => {
  const response = await api.delete(endpoints.getTracksFileEndpointById(id));

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
