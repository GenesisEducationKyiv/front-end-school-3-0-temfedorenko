import { screen, render, fireEvent } from '@testing-library/react';

import { SORT_URL_PARAM } from '../../../constants';
import { SortSelect, sortOptions } from '../SortSelect';
import { useTrackFiltersAndSorting } from '../../../hooks/useTrackFiltersAndSorting';
///////////////////////////////////////////////////////

vi.mock('../../../hooks/useTrackFiltersAndSorting');

describe('SortSelect component', () => {
  const mockSetFilters = vi.fn();

  const testId = 'sort-select';

  const defaultHookPartialReturnValue = {
    currentPage: 1,
    genreFilter: '',
    searchQuery: '',
    resetCurrentPage: () => {},
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useTrackFiltersAndSorting).mockReturnValue({
      ...defaultHookPartialReturnValue,
      sortOption: '',
      setFilters: mockSetFilters,
    });
  });

  test('should render with default value', () => {
    const { getByTestId } = render(<SortSelect />);

    const sortSelect = getByTestId(testId);

    expect(sortSelect).toHaveValue('');
    expect(sortSelect).toBeInTheDocument();
    expect(screen.getByLabelText('Sort by')).toBeInTheDocument();
  });

  test('should display current sort option', () => {
    vi.mocked(useTrackFiltersAndSorting).mockReturnValue({
      ...defaultHookPartialReturnValue,
      sortOption: 'title-asc',
      setFilters: mockSetFilters,
    });

    const { getByTestId } = render(<SortSelect />);

    const sortSelect = getByTestId(testId);

    expect(sortSelect).toBeInTheDocument();
    expect(sortSelect).toHaveValue('title-asc');
  });

  test('should open the dropdown and render all sorting options', async () => {
    render(<SortSelect />);

    fireEvent.mouseDown(screen.getByRole('combobox'));

    const allOptions = await screen.findAllByRole('option');

    expect(allOptions).toHaveLength(sortOptions.length);
    expect(screen.getByText(sortOptions[0].label)).toBeInTheDocument();
    expect(screen.getByText(sortOptions[1].label)).toBeInTheDocument();
  });

  test('should call setFilters with the correct value when a new option is selected', async () => {
    render(<SortSelect />);

    fireEvent.mouseDown(screen.getByRole('combobox'));

    const option = await screen.findByText(sortOptions[1].label);

    fireEvent.click(option);

    expect(mockSetFilters).toHaveBeenCalledTimes(1);
    expect(mockSetFilters).toHaveBeenCalledWith(SORT_URL_PARAM, sortOptions[1].value);
  });
});
