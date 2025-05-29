import React from 'react';
import { Close } from '@mui/icons-material';
import {
  Box,
  Alert,
  Dialog,
  Button,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import { getErrorMessage } from '../helpers/index.jsx';
///////////////////////////////////////////////////////

 export function ModalComponent({ title, error, isError, children, handleClose, isConfirm, handleConfirm, isLoading }) {
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      slotProps={{ paper: { 'data-testid': isConfirm ? 'confirm-dialog' : 'dialog-container' }}}
    >
      <Box pr='10px' display='flex' alignItems='center' justifyContent='space-between'>
        <DialogTitle maxWidth={300}>{title}</DialogTitle>
        <IconButton onClick={handleClose}><Close /></IconButton>
      </Box>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </DialogContent>
      {isError && <Alert severity='error'>{getErrorMessage(error)}</Alert>}
      {
        isConfirm &&
        <DialogActions sx={{ p: '24px' }}>
          <Button onClick={handleClose} data-testid='cancel-delete'>Close</Button>
          <Button
            disabled={isLoading}
            onClick={handleConfirm}
            data-loading={isLoading}
            data-disabled={isLoading}
            data-testid='confirm-delete'
          >
            {isLoading ? <CircularProgress size={18} /> : 'Confirm'}
          </Button>
        </DialogActions>
      }
    </Dialog>
  );
}