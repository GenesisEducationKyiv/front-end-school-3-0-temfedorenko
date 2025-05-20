import { api } from './';
///////////////////////////////////////////////////////

const getGenresRequest = async () => {
  const response = await api.get('/genres');

  return response.data;
};

const getTracksRequest = async ({ queryKey }) => {
  const [_key, params] = queryKey;

  const response = await api.get('/tracks', { params });
  
  return response.data;
};

const createTrackRequest = async (trackData) => {
  const response = await api.post('/tracks', trackData);

  return response.data;
};

const updateTrackRequest = async ({ id, ...data }) => {
  const response = await api.put(`/tracks/${id}`, data);

  return response.data;
};

const deleteTrackRequest = async (id) => {
  const response = await api.delete(`/tracks/${id}`);

  return response.data;
};

const uploadTrackFileRequest = async ({ id, data }) => {
  const response = await api.post(
    `/tracks/${id}/upload`,
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return response.data;
};

const deleteTrackFileRequest = async (id) => {
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