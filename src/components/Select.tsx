import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  type SelectChangeEvent,
} from '@mui/material';
///////////////////////////////////////////////////////

interface IProps {
  id: string;
  label: string;
  dataTestId: string;
  value: string;
  styles?: object | undefined;
  options: { label: string; value: string | undefined }[];
  handleChange: (event: SelectChangeEvent<string>) => void;
}

export function SelectComponent({ id, value, label, dataTestId, styles = {}, options = [], handleChange }: IProps) {
  const labelId = `${id}-label`;

  return (
    <Box>
      <FormControl fullWidth={true}>
        <InputLabel id={labelId} style={{ color: '#828282' }}>{label}</InputLabel>
        <Select
          id={id}
          sx={styles}
          label={label}
          labelId={labelId}
          variant='outlined'
          value={value || ''}
          onChange={handleChange}
          inputProps={{ 'data-testid': dataTestId }}
        >
          {
            options.map(({ label, value }) => (
              <MenuItem key={label} value={value}>
                {label}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}
