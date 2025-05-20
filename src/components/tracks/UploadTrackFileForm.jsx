import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { MuiFileInput } from 'mui-file-input';
import { AttachFile } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Stack,
  Alert,
  Button,
  InputLabel,
  Typography,
  FormControl,
  DialogActions,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

import { useStore } from '../../store';
import { FIELD_AUDIO_FILE } from '../../constants';
import { uploadTrackFileRequest } from '../../api/tracks';
import { showToast, getErrorMessage } from '../../helpers/index.jsx';
///////////////////////////////////////////////////////

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3'];

const validationSchema = yup.object().shape({
  [FIELD_AUDIO_FILE]: yup.mixed()
    .required('Please select a file')
    .test(
      'fileType',
      'Should be .mp3, .ogg or .wav',
      (value) => {
        if (!value) return true;

        return ALLOWED_FILE_TYPES.includes(value.type);
      }
    )
    .test(
      'fileSize',
      `Max file size is ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB`,
      (value) => {
        if (!value) return true;

        return value.size <= MAX_FILE_SIZE_BYTES;
      }
    ),
});

const inputStyles = {
  '.MuiFileInput-ClearIconButton': {
    backgroundColor: '#4D4D4D',
    '&:hover': { backgroundColor: '#222' },
  },
};

export function UploadTrackFileForm({ handleClose }) {
  const { selectedTrack } = useStore();

  const queryClient = useQueryClient();

  const { mutate: uploadTrack, isPending, isError, error } = useMutation({
    mutationFn: uploadTrackFileRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });

      handleClose();
      showToast('Track file uploaded successfully');
    },
  });

  const { handleBlur, handleSubmit, setFieldValue, values, errors, touched } = useFormik({
    validationSchema: validationSchema,
    initialValues: { [FIELD_AUDIO_FILE]: null },
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append(FIELD_AUDIO_FILE, values[FIELD_AUDIO_FILE]);
      
      await uploadTrack({ data: formData, id: selectedTrack?.id });
    },
  });

  const handleFileChange = (value) => {
    setFieldValue(FIELD_AUDIO_FILE, value);
  };

  return (
    <Stack gap='30px' component='form' onSubmit={handleSubmit} sx={{ width: { xs: '100%', sm: 500 } }}>
      <FormControl error={touched.audioFile && !!errors.audioFile}>
        {
          !values.audioFile &&
          <InputLabel error={errors.audioFile} htmlFor={FIELD_AUDIO_FILE}>
            <Box display='flex' gap='10px' alignItems='center'>
              <AttachFile />
              <Typography>Attach an Audio File</Typography>
            </Box>
          </InputLabel>
        }
        <MuiFileInput
          value={values.audioFile}
          sx={inputStyles}
          inputProps={{
            id: FIELD_AUDIO_FILE,
            name: FIELD_AUDIO_FILE,
            onBlur: handleBlur,
            accept: ALLOWED_FILE_TYPES.join(','),
          }}
          onChange={handleFileChange}
        />
        {touched.audioFile && errors.audioFile && (
          <FormHelperText>{errors.audioFile}</FormHelperText>
        )}
      </FormControl>
      {isError && <Alert severity='error'>{getErrorMessage(error)}</Alert>}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type='submit'
          disabled={isPending}
          data-loading={isPending}
          data-disabled={isPending}
        >
          {isPending ? <CircularProgress size={18} /> : 'Upload'}
        </Button>
      </DialogActions>
    </Stack>
  );
}