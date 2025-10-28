import ConfigProviders from '@configs/providers';
import RouterProvider from '@configs/providers/RouterProvider';
import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorPage from '@pages/error';

import './globals.css';

const App: FC = () => {
  return (
    <ConfigProviders>
      <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} />}>
        <RouterProvider />
      </ErrorBoundary>
    </ConfigProviders>
  );
};

export default App;
