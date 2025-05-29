import { Box } from '@mui/material';
import React, { useMemo, useState } from 'react';

import { useStore } from '../../store';
import { setDebounce } from '../../helpers/index.jsx';
import { TextFieldComponent } from '../TextInput';
// //////////////////////////////////////////////////

export function SearchInput() {
  const { searchQuery, setSearchQuery } = useStore();

  const [inputValue, setInputValue] = useState(searchQuery || '');

  const debouncedSetSearchQuery = useMemo(
    () => setDebounce((value) => setSearchQuery(value), 800),
    [setSearchQuery],
  );

  const handleChange = (event) => {
    const newValue = event.target.value;

    setInputValue(newValue);

    debouncedSetSearchQuery(newValue);
  };

  return (
    <TextFieldComponent
      id='searching'
      value={inputValue}
      testId='search-input'
      styles={{ width: 250 }}
      handleChange={handleChange}
      label='Search by title/artist/album'
    />
  );
}