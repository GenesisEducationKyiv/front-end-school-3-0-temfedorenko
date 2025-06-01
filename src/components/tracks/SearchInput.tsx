import { useMemo, useState } from 'react';

import { useStore } from '../../store/index';
import { setDebounce } from '../../helpers/index';
import { TextFieldComponent } from '../TextInput';
// //////////////////////////////////////////////////

export function SearchInput() {
  const { searchQuery, setSearchQuery } = useStore();

  const [inputValue, setInputValue] = useState(searchQuery || '');

  const debouncedSetSearchQuery = useMemo(
    () => setDebounce((value: string) => setSearchQuery(value), 800),
    [setSearchQuery],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
