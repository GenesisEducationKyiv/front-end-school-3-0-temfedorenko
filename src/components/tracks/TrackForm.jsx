import React from 'react';
import * as yup from 'yup';
import { Add } from '@mui/icons-material';
import { getIn, useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Stack,
  Alert,
  Button,
  TextField,
  Autocomplete,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import { useStore } from '../../store';
import { useTrackGenresData } from '../../hooks/useTrackGenresData';
import { showToast, getErrorMessage } from '../../helpers/index.jsx';
import { createTrackRequest, updateTrackRequest } from '../../api/tracks';
import { FIELD_ALBUM, FIELD_GENRES, FIELD_TITLE, FIELD_ARTIST, FIELD_COVER_IMAGE } from '../../constants';
//////////////////////////////////////////////////

const validationSchema = yup.object().shape({
  [FIELD_ALBUM]: yup.string().max(50, 'Max length is 50'),
  [FIELD_GENRES]: yup.array().of(yup.string()).min(1, 'At least one genre is required'),
  [FIELD_TITLE]: yup.string().max(50, 'Max length is 50').required('Title is required'),
  [FIELD_ARTIST]: yup.string().max(50, 'Max length is 50').required('Artist is required'),
  [FIELD_COVER_IMAGE]: yup.string().url('Should be a valid URL').test(
    FIELD_COVER_IMAGE,
    'Should be a valid image URL (jpg/jpeg/png/svg)',
    (value) => {
      if (!value) return true;

      return /\.(jpg|jpeg|png|svg)$/i.test(value);
    }
  ),
});

const defaultValues = {
  [FIELD_TITLE]: '',
  [FIELD_ALBUM]: '',
  [FIELD_ARTIST]: '',
  [FIELD_GENRES]: [],
  [FIELD_COVER_IMAGE]: '',
};

const fields = [
  {
    required: true,
    label: 'Title',
    name: FIELD_TITLE,
    testId: 'input-title',
  },
  {
    required: true,
    label: 'Artist',
    name: FIELD_ARTIST,
    testId: 'input-artist',
  },
  {
    label: 'Album',
    name: FIELD_ALBUM,
    testId: 'input-album',
  },
  {
    name: FIELD_COVER_IMAGE,
    label: 'Cover Image URL',
    testId: 'input-cover-image',
  },
  {
    required: true,
    label: 'Genres',
    name: FIELD_GENRES,
    testId: 'genre-selector',
  },
];

const getFieldError = (name, errors, touched) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  return touch && error && errors[name];
};

const getTextInputStyles = (height) => ({
  height,
  '& .MuiOutlinedInput-root': { height },
});

export function TrackForm({ isCreate = false, handleClose }) {
  const queryClient = useQueryClient();

  const { selectedTrack } = useStore();

  const { genres, genresError, isGenresError, isGenresLoading } = useTrackGenresData();

  const { mutate: createNewTrack, isPending: isCreating, isError: isCreateError, error: createError } = useMutation({
    mutationFn: isCreate ? createTrackRequest : updateTrackRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });

      handleClose();
      showToast(isCreate ? 'Track created successfully' : 'Track updated successfully');
    },
  });

  const { handleBlur, handleSubmit, handleChange, values, errors, touched, setFieldValue } = useFormik({
    validationSchema,
    onSubmit: async (values) => await createNewTrack(values),
    initialValues: isCreate ? defaultValues : { ...defaultValues, ...selectedTrack },
  });

  if (isGenresLoading) return <CircularProgress color='inherit' />;

  if (isGenresError) return <Alert severity='error'>{getErrorMessage(genresError)}</Alert>;

  return (
    <Stack gap='30px' component='form' onSubmit={handleSubmit} data-testid='track-form' sx={{ width: { xs: '100%', sm: 500 } }}>
      {
        fields.map((field) => {
          const { name, label, testId, required } = field;

          const value = values[name];
          const error = getFieldError(name, errors, touched);

          const inputLabel = { style: { color: '#4D4D4D' } };

          if (name === FIELD_GENRES) {
            return (
              <Autocomplete
                id={name}
                key={name}
                name={name}
                value={value}
                multiple={true}
                options={genres}
                fullWidth={true}
                onBlur={handleBlur}
                popupIcon={<Add />}
                filterSelectedOptions={true}
                onChange={(e, newValue) => setFieldValue(name, newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={error}
                    label={label}
                    variant='standard'
                    helperText={error}
                    required={required}
                    sx={getTextInputStyles()}
                    slotProps={{ inputLabel }}
                    FormHelperTextProps={{ 'data-testid': 'error-genre' }}
                    inputProps={{
                      ...params.inputProps,
                      'data-testid': testId,
                    }}
                  />
                )}
              />
            );
          }

          const inputProps = {
            name,
            value,
            id: name,
            onBlur: handleBlur,
            onChange: handleChange,
          };

          return (
            <TextField
              key={name}
              label={label}
              error={error}
              fullWidth={true}
              helperText={error}
              required={required}
              sx={getTextInputStyles(56)}
              inputProps={{ 'data-testid': testId }}
              slotProps={{ inputLabel, input: inputProps }}
              FormHelperTextProps={{ 'data-testid': `error-${name}` }}
            />
          );
        })
      }
      {isCreateError && <Alert severity='error'>{getErrorMessage(createError)}</Alert>}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type='submit'
          disabled={isCreating}
          onClick={handleSubmit}
          data-loading={isCreating}
          data-disabled={isCreating}
          data-testid='submit-button'
        >
          {isCreating ? <CircularProgress size={18} /> : 'Save'}
        </Button>
      </DialogActions>
    </Stack>
  );
}