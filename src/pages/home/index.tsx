import { FC } from 'react';

import Hero from '@features/home/ui/Hero';
import Highlights from '@features/home/ui/Highlights';
import Model from '@features/home/ui/Model';
import Navbar from '@features/home/ui/Navbar';

const HomePage: FC = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
    </main>
  );
};

export default HomePage;
