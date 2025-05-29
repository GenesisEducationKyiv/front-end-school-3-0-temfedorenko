import React from 'react';
import { Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
///////////////////////////////////////////////////////

export function SelectComponent({ id, value, label, dataTestId, styles = {}, options = [], handleChange }) {
  const labelId = `${id}-label`;

  return (
    <Box>
      <FormControl fullWidth={true}>
        <InputLabel color='#C8C8C8' id={labelId}>{label}</InputLabel>
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