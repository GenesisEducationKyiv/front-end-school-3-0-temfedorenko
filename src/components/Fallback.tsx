import { Suspense, type ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
///////////////////////////////////////////////////////

export function Fallback({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<CircularProgress size={18} color='inherit' />}>
      {children}
    </Suspense>
  );
}
