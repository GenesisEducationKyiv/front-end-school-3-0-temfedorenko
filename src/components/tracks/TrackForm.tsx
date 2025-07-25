import * as yup from 'yup';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getIn, useFormik, type FormikErrors, type FormikTouched } from 'formik';

import { useTracksStore } from '@/store';
import { selectSelectedTrack } from '@/selectors';
import { showToast, getErrorMessage } from '@/helpers';
import { useTrackGenresData } from '@/hooks/useTrackGenresData';
import { createTrackRequest, updateTrackRequest } from '@/api/tracks';
import { useTrackFiltersAndSorting } from '@/hooks/useTrackFiltersAndSorting';
import {
  FIELD_ALBUM,
  FIELD_TITLE,
  FIELD_GENRES,
  FIELD_ARTIST,
  TRACKS_QUERY_KEY,
  FIELD_COVER_IMAGE,
} from '@/constants';
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

interface IFormValues {
  album?: string;
  artist: string;
  audioFile?: string;
  coverImage?: string;
  genres: string[];
  title: string;
}

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

const getFieldError = (name: string, errors: FormikErrors<IFormValues>, touched: FormikTouched<IFormValues>) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  return touch && typeof error === 'string' ? error : undefined;
};

const getTextInputStyles = (height?: number) => ({
  height,
  '& .MuiOutlinedInput-root': { height },
});

export function TrackForm({ isCreate = false, handleClose }: { isCreate?: boolean; handleClose: () => void }) {
  const queryClient = useQueryClient();

  const selectedTrack = useTracksStore(selectSelectedTrack);

  const { currentPage, resetCurrentPage } = useTrackFiltersAndSorting();

  const { genres = [], genresError, isGenresError, isGenresLoading } = useTrackGenresData();

  const { mutate: createOrUpdateTrack, isPending: isCreating, isError: isCreateError, error: createError } = useMutation({
    mutationFn: isCreate ? createTrackRequest : updateTrackRequest,
    onSuccess: () => {
      handleClose();

      if (isCreate && currentPage !== 1) {
        resetCurrentPage();
      } else {
        queryClient.invalidateQueries({ queryKey: [TRACKS_QUERY_KEY] });
      }

      showToast(isCreate ? 'Track created successfully' : 'Track updated successfully');
    },
  });

  const { handleBlur, handleSubmit, handleChange, values, errors, touched, setFieldValue } = useFormik({
    validationSchema,
    initialValues: isCreate ? defaultValues : { ...defaultValues, ...selectedTrack },
    onSubmit: ({ title, artist, album, genres, coverImage }: IFormValues) =>
      createOrUpdateTrack({ title, artist, album, genres, coverImage, id: selectedTrack.id }),
  });

  const handleClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    handleSubmit();
  };

  if (isGenresLoading) return <CircularProgress color='inherit' />;

  if (isGenresError) return <Alert severity='error'>{getErrorMessage(genresError)}</Alert>;

  return (
    <Stack gap='30px' component='form' onSubmit={handleSubmit} data-testid='track-form' sx={{ width: { xs: '100%', sm: 500 } }}>
      {
        fields.map((field) => {
          const { name, label, testId, required } = field;

          const value = getIn(values, name);
          const error = getFieldError(name, errors, touched);

          const inputLabel = { style: { color: '#4D4D4D' } };

          if (name === FIELD_GENRES) {
            return (
              <Autocomplete
                id={name}
                key={name}
                value={value}
                multiple={true}
                options={genres}
                fullWidth={true}
                onBlur={handleBlur}
                popupIcon={<Add />}
                filterSelectedOptions={true}
                onChange={(_, newValue) => setFieldValue(name, newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={name}
                    label={label}
                    error={!!error}
                    variant='standard'
                    helperText={error}
                    required={required}
                    sx={getTextInputStyles()}
                    InputLabelProps={inputLabel}
                    FormHelperTextProps={{ 'data-testid': 'error-genre' } as React.HTMLAttributes<HTMLDivElement>}
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
              error={!!error}
              fullWidth={true}
              helperText={error}
              required={required}
              InputProps={inputProps}
              sx={getTextInputStyles(56)}
              InputLabelProps={inputLabel}
              inputProps={{ 'data-testid': testId }}
              FormHelperTextProps={{ 'data-testid': `error-${name}` } as React.HTMLAttributes<HTMLDivElement>}
            />
          );
        })
      }
      {isCreateError && <Alert severity='error'>{getErrorMessage(createError)}</Alert>}
      <DialogActions>
        <Button onClick={handleClose} data-testid='cancel-button'>Cancel</Button>
        <Button
          type='submit'
          disabled={isCreating}
          data-loading={isCreating}
          data-disabled={isCreating}
          data-testid='submit-button'
          onClick={handleClickSubmit}
        >
          {isCreating ? <CircularProgress size={18} /> : 'Save'}
        </Button>
      </DialogActions>
    </Stack>
  );
}
