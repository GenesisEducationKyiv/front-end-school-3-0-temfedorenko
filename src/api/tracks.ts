import z from 'zod';

import { api } from '.';

import { endpoints } from './endpoints';
import { TRACKS_QUERY_KEY } from '../constants';
import { saveParseWithError } from '../helpers/zod';
import {
  trackSchema,
  genresSchema,
  tracksResponseSchema,
  uploadTrackFileSchema,
  deleteTrackFileSchema,
} from '../schemas';

import type { QueryFunctionContext } from '@tanstack/react-query';
import type {
  ITracksQuery,
  ICreateTrackPayload,
  IUpdateTrackPayload,
} from '../types/track.types';
///////////////////////////////////////////////////////

const getGenresRequest = async (): Promise<z.infer<typeof genresSchema>> => {
  const response = await api.get(endpoints.genres);

 return saveParseWithError(genresSchema, response.data, 'Genres validation error');
};

const getTracksRequest = async ({ queryKey }: QueryFunctionContext): Promise<z.infer<typeof tracksResponseSchema>> => {
  const [, params] = queryKey as [typeof TRACKS_QUERY_KEY, ITracksQuery];

  const response = await api.get(endpoints.tracks, { params });

  return saveParseWithError(tracksResponseSchema, response.data, 'Tracks validation error');
};

const createTrackRequest = async (trackData: ICreateTrackPayload): Promise<z.infer<typeof trackSchema>> => {
  const response = await api.post(endpoints.tracks, trackData);

  return saveParseWithError(trackSchema, response.data, 'Create Track validation error');
};

const updateTrackRequest = async ({ id, ...data }: IUpdateTrackPayload): Promise<z.infer<typeof trackSchema>> => {
  const response = await api.put(endpoints.getTracksEndpointById(id), data);

  return saveParseWithError(trackSchema, response.data, 'Update Track validation error');
};

const deleteTrackRequest = async (id: string) => {
  const response = await api.delete(endpoints.getTracksEndpointById(id));

  return response.data;
};

const uploadTrackFileRequest = async ({ id, data }: { id: string, data: FormData }): Promise<z.infer<typeof uploadTrackFileSchema>> => {
  const response = await api.post(
    endpoints.getTracksUploadEndpointById(id),
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return saveParseWithError(uploadTrackFileSchema, response.data, 'Upload Track File validation error');
};

const deleteTrackFileRequest = async (id: string): Promise<z.infer<typeof deleteTrackFileSchema>> => {
  const response = await api.delete(endpoints.getTracksFileEndpointById(id));

  return saveParseWithError(deleteTrackFileSchema, response.data, 'Delete Track File validation error');
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
