import { FC } from 'react';

import { IGenericError } from '@typings/commons';

interface IProps {
  error: IGenericError<string | number | any>;
}

const ErrorPage: FC<IProps> = ({ error }) => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-100'>
      <section className='rounded-lg bg-white p-6 text-center shadow-md'>
        <h1 className='mb-4 text-4xl font-bold text-red-500'>Error</h1>
        <p className='mb-6 text-lg text-gray-700'>
          {error.stack
            ? error.stack
                ?.replaceAll('node_modules/', '')
                ?.replaceAll('.vite/deps', '')
                ?.replace(/\bat\b/gi, '\rat')
                ?.replaceAll('(', '\r\n       ↪ (')
            : error.message}
        </p>
      </section>
    </main>
  );
};

export default ErrorPage;
