import { useMemo, useState } from 'react';

import { setDebounce } from '../../helpers/index';
import { TextFieldComponent } from '../TextInput';
import { SEARCH_URL_PARAM } from '../../constants';
import { useTrackFiltersAndSorting } from '../../hooks/useTrackFiltersAndSorting';
// //////////////////////////////////////////////////

export function SearchInput() {
  const { setFilters, searchQuery } = useTrackFiltersAndSorting();

  const [inputValue, setInputValue] = useState(searchQuery);

  const debouncedSetSearchQuery = useMemo(
    () => setDebounce((value: string) => setFilters(SEARCH_URL_PARAM, value), 800),
    [setFilters],
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
