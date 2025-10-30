import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { FC } from 'react';

import { rightImg, watchImg } from '@utils/utilAssets';

import VideoCarousel from './VideoCarousel';

const Highlights: FC = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#highlights',
        start: 'top center',
        end: 'bottom center',
      },
    });

    tl.to(
      '#title',
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
      },
      '+=0.5',
    ).fromTo(
      '.link',
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        stagger: 0.1,
      },
    );
  });

  return (
    <section id='highlights' className='common-padding bg-zinc h-full w-screen overflow-hidden'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full items-end justify-between md:flex'>
          <h1 id='title' className='section-heading'>
            Get the highlights.
          </h1>

          <div className='flex flex-wrap items-end gap-5'>
            <p className='link'>
              Watch the film
              <img src={watchImg} alt='watch' className='ml-2' />
            </p>
            <p className='link'>
              Watch the event
              <img src={rightImg} alt='right' className='ml-2' />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
