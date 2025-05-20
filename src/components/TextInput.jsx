import React from 'react';
import { Box, TextField } from '@mui/material';
///////////////////////////////////////////////////////

export function TextFieldComponent({ id, value, label, testId, styles = {}, handleChange, wrapperStyles }) {
  return (
    <Box sx={wrapperStyles}>
      <TextField
        id={id}
        sx={styles}
        label={label}
        value={value || ''}
        onChange={handleChange}
        inputProps={{ 'data-testid': testId }}
        slotProps={{ inputLabel: { style: { color: '#828282' } } }}
      />
    </Box>
  );
}