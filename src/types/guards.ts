export const isValidPageValue = (page: string, totalPages: number): page is string => {
  const pageValue = Number(page);

  return Number.isInteger(pageValue) && pageValue > 0 && pageValue <= totalPages;
};

export const isValidString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
