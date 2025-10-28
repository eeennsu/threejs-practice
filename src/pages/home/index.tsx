import { FC } from 'react';

import Hero from '@features/home/ui/Hero';
import Highlights from '@features/home/ui/Highlights';
import Navbar from '@features/home/ui/Navbar';

const HomePage: FC = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
    </main>
  );
};

export default HomePage;
