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

import { useStore } from '../../store/index';
import { uploadTrackFileRequest } from '../../api/tracks';
import { showToast, getErrorMessage } from '../../helpers/index';
import { FIELD_AUDIO_FILE, TRACKS_QUERY_KEY } from '../../constants/index';
///////////////////////////////////////////////////////

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3'];

const isFile = (value: unknown): value is File => value instanceof File;

const validationSchema = yup.object().shape({
  [FIELD_AUDIO_FILE]: yup.mixed<File>()
    .required('Please select a file')
    .test(
      'fileType',
      'Should be .mp3, .ogg or .wav',
      (value) => {
        if (isFile(value)) return ALLOWED_FILE_TYPES.includes(value.type);

        return true;
      }
    )
    .test(
      'fileSize',
      `Max file size is ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB`,
      (value) => {
        if (isFile(value)) return value.size <= MAX_FILE_SIZE_BYTES;

        return true;
      }
    ),
});

const inputStyles = {
  '.MuiFileInput-ClearIconButton': {
    backgroundColor: '#4D4D4D',
    '&:hover': { backgroundColor: '#222' },
  },
};

export function UploadTrackFileForm({ handleClose }: { handleClose: () => void }) {
  const { selectedTrack } = useStore();

  const queryClient = useQueryClient();

  const { mutate: uploadTrack, isPending, isError, error } = useMutation({
    mutationFn: uploadTrackFileRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRACKS_QUERY_KEY] });

      handleClose();
      showToast('Track file uploaded successfully');
    },
  });

  const { handleBlur, handleSubmit, setFieldValue, values, errors, touched } = useFormik({
    validationSchema: validationSchema,
    initialValues: { [FIELD_AUDIO_FILE]: null },
    onSubmit: ({ audioFile }: { [FIELD_AUDIO_FILE]: File | null }) => {
      const formData = new FormData();

      if (audioFile) {
        formData.append(FIELD_AUDIO_FILE, audioFile);
      }

      uploadTrack({ data: formData, id: selectedTrack?.id });
    },
  });

  const handleFileChange = (value: File | null) => {
    setFieldValue(FIELD_AUDIO_FILE, value);
  };

  return (
    <Stack gap='30px' component='form' onSubmit={handleSubmit} sx={{ width: { xs: '100%', sm: 500 } }}>
      <FormControl error={touched.audioFile && !!errors.audioFile}>
        {
          !values.audioFile &&
          <InputLabel error={!!errors.audioFile} htmlFor={FIELD_AUDIO_FILE}>
            <Box display='flex' gap='10px' alignItems='center'>
              <AttachFile />
              <Typography>Attach an Audio File</Typography>
            </Box>
          </InputLabel>
        }
        <MuiFileInput
          sx={inputStyles}
          value={values.audioFile}
          onChange={handleFileChange}
          inputProps={{
            onBlur: handleBlur,
            id: FIELD_AUDIO_FILE,
            name: FIELD_AUDIO_FILE,
            accept: ALLOWED_FILE_TYPES.join(','),
          }}
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
