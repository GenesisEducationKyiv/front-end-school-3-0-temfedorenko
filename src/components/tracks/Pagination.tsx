import { Box, Pagination, PaginationItem } from '@mui/material';

import { useStore } from '../../store';
import { PAGE_URL_PARAM } from '../../constants';
import { useTrackFiltersAndSorting } from '../../hooks/useTrackFiltersAndSorting';
//////////////////////////////////////////////////////

export function PaginationComponent() {
  const { totalPages } = useStore();

  const { setFilters, currentPage } = useTrackFiltersAndSorting();

  if (!totalPages) return null;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => setFilters(PAGE_URL_PARAM, String(value));

  return (
    <Box mt='30px' display='flex' justifyContent='center'>
      <Pagination
        shape='rounded'
        variant='outlined'
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        data-testid='pagination'
        renderItem={(item) => (
          <PaginationItem
            {...item}
            data-testid={
              item.type === 'previous'
                ? 'pagination-prev'
                : item.type === 'next'
                ? 'pagination-next'
                : undefined
            }
          />
        )}
      />
    </Box>
  );
}
