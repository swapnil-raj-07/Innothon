/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

import { DataProvider } from './dataContext';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <DataProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </DataProvider>
  );
}
