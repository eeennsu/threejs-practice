import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useRef, type FC } from 'react';
import { useMediaQuery } from 'react-responsive';

import { heroVideo, smallHeroVideo } from '@utils/utilAssets';

const Hero: FC = () => {
  const reflectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const titleSplit = SplitText.create('#hero', { type: 'chars, words' });
    const tl = gsap.timeline();

    tl.fromTo(
      '#hero-video',
      {
        filter: 'brightness(0.4) blur(4px)',
      },
      {
        filter: 'brightness(1) blur(0px)',
        duration: 1.4,
        ease: 'power2.out',
      },
      '<',
    )
      .from(titleSplit.words, {
        opacity: 0,
        y: 10,
        duration: 1,
        delay: 1.3,
        transformOrigin: 'center bottom', // 애니메이션이 회전하거나 scale 될 때 기준점을 결정
        scale: 0.95,
        ease: 'power2.out',
        stagger: 0.1,
      })
      .from(
        '#cta',
        {
          y: 40,
          opacity: 0,
          ease: 'power2.out',
          duration: 1,
        },
        '-=0.15',
      );
  });

  useGSAP(() => {
    const overlay = reflectionRef.current;
    if (!overlay) return;

    const updateX = gsap.quickTo(overlay, 'xPercent', { duration: 0.3, ease: 'power2.out' });
    const updateY = gsap.quickTo(overlay, 'yPercent', { duration: 0.3, ease: 'power2.out' });

    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth) * 100 - 50;
      const y = (e.clientY / window.innerHeight) * 100 - 50;
      updateX(x);
      updateY(y);
    });
  });

  return (
    <section className='nav-height relative w-full bg-black'>
      <div className='flex-center h-5/6 w-full flex-col'>
        <p id='hero' className='hero-title'>
          iPhone 15 Pro
        </p>
        <div className='w-9/12 md:w-10/12'>
          <video id='hero-video' className='pointer-events-none' autoPlay muted playsInline={true}>
            <source src={isMobile ? smallHeroVideo : heroVideo} type='video/mp4' />
          </video>
          <div
            ref={reflectionRef}
            id='reflection-overlay'
            className='pointer-events-none absolute inset-0'
          />
        </div>
      </div>

      <div id='cta' className='flex flex-col items-center'>
        <a href='#highlights' className='btn'>
          Buy
        </a>
        <p className='text-xl font-normal'>From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
