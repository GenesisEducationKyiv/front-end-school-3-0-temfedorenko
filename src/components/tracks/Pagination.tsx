import { Box, Pagination, PaginationItem } from '@mui/material';

import { useStore } from '../../store';
//////////////////////////////////////////////////////

export function PaginationComponent() {
  const { totalPages, currentPage, setCurrentPage } = useStore();

  if (!totalPages) return null;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value);

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
