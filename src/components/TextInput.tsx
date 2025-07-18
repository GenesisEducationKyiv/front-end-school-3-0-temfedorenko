import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
///////////////////////////////////////////////////////

interface IProps {
  id: string;
  value: string;
  label: string;
  testId: string;
  styles?: object | undefined;
  wrapperStyles?: object | undefined;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextFieldComponent({ id, value, label, testId, styles = {}, handleChange, wrapperStyles }: IProps) {
  return (
    <Box sx={wrapperStyles}>
      <TextField
        id={id}
        sx={styles}
        label={label}
        value={value || ''}
        onChange={handleChange}
        inputProps={{ 'data-testid': testId }}
        InputLabelProps={{ style: { color: '#828282' } }}
      />
    </Box>
  );
}
