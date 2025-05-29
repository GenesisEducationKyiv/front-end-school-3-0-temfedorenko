import React from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
///////////////////////////////////////////////////////

const DEFAULT_ERROR_MESSAGE = 'Some error happened. Please, try again.';

const getErrorMessage = (errorObject) => {
  return errorObject ? errorObject?.response?.data?.error : DEFAULT_ERROR_MESSAGE;
};

const setDebounce = (callback, wait) => {
  let timeout;

  return function(...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => callback(...args), wait);
  };
};

const showToast = (message, type = 'success') => toast(
  <Box data-testid={`toast-${type}`}>{message}</Box>,
  { type },
);

export {
  showToast,
  setDebounce,
  getErrorMessage
};