import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

import { getErrorMessage } from '../helpers';

import type { JSX } from '@emotion/react/jsx-runtime';
///////////////////////////////////////////////////////

interface IProps {
  title: string;
  error?: Error | null;
  isError?: boolean;
  children: JSX.Element;
  handleClose: () => void;
  isConfirm?: boolean;
  handleConfirm?: () => void;
  isLoading?: boolean;
  disablePortal?: boolean;
}

export default function ModalComponent({ title, error, isError, children, handleClose, isConfirm, handleConfirm, isLoading, disablePortal }: IProps) {
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      disablePortal={disablePortal}
      PaperProps={{ 'data-testid': isConfirm ? 'confirm-dialog' : 'dialog-container' } as React.HTMLAttributes<HTMLDivElement>}
    >
      <Box pr='10px' display='flex' alignItems='center' justifyContent='space-between'>
        <DialogTitle maxWidth={300} data-testid='modal-title'>{title}</DialogTitle>
        <IconButton onClick={handleClose} data-testid='close-modal'><Close /></IconButton>
      </Box>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </DialogContent>
      {isError && <Alert severity='error' data-testid='modal-error-message'>{getErrorMessage(error)}</Alert>}
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
