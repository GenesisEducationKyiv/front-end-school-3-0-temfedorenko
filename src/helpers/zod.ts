import { ZodType } from 'zod';

export const saveParseWithError = <T>(
  schema: ZodType<T>,
  data: unknown,
  errorMsg = 'Zod validation error'
): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error(`${errorMsg}:`, result.error.issues);

    throw new Error(errorMsg);
  }

  return result.data;
};
