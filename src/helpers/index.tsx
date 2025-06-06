import { Box } from '@mui/material';
import { toast, type TypeOptions } from 'react-toastify';

import { isAxiosError } from 'axios';
///////////////////////////////////////////////////////

interface IErrorResponseData {
  code?: number;
  error?: string;
  message?: string;
}

const DEFAULT_ERROR_MESSAGE = 'Some error happened. Please, try again.';

const getErrorMessage = (errorObject: unknown): string => {
  if (isAxiosError<IErrorResponseData>(errorObject)) {
    return errorObject.response?.data?.error ?? DEFAULT_ERROR_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setDebounce = <T extends (...args: any[]) => void>(callback: T, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function(...args: Parameters<T>) {
    clearTimeout(timeout);

    timeout = setTimeout(() => callback(...args), wait);
  };
};

const showToast = (message: string, type: TypeOptions = 'success') => toast(
  <Box data-testid={`toast-${type}`}>{message}</Box>,
  { type },
);

export {
  showToast,
  setDebounce,
  getErrorMessage
};
