import { FC } from 'react';

import Features from '@features/home/ui/Features';
import Footer from '@features/home/ui/Footer';
import Hero from '@features/home/ui/Hero';
import Highlights from '@features/home/ui/Highlights';
import HowItWorks from '@features/home/ui/HowItWorks';
import Model from '@features/home/ui/Model';
import Navbar from '@features/home/ui/Navbar';

const HomePage: FC = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default HomePage;
