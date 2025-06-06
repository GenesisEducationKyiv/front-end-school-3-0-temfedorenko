import { z } from 'zod';
///////////////////////////////////////////////////////

export const genresSchema = z.array(z.string());

const trackSchemaObject = {
  album: z.string().optional(),
  artist: z.string(),
  coverImage: z.string().optional(),
  createdAt: z.string(),
  genres: genresSchema,
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  updatedAt: z.string(),
};

export const trackSchema = z.object({ ...trackSchemaObject, audioFile: z.string().optional() });

export const uploadTrackFileSchema = z.object({ ...trackSchemaObject, audioFile: z.string() })

export const deleteTrackFileSchema = z.object(trackSchemaObject).strict()

export const tracksResponseSchema = z.object({
  data: z.array(trackSchema),
  meta: z.object({
    limit: z.number(),
    page: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});
