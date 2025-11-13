import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FC, useEffect, useRef } from 'react';

import { explore1Img, explore2Img, exploreVideo } from '@utils/utilAssets';

const Features: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.to('#features_title', {
      scrollTrigger: {
        trigger: '#features_title',
        start: 'top center',
        end: 'bottom center',
      },
      y: 0,
      opacity: 1,
      delay: 0.3,
      ease: 'power2.out',
    });

    gsap.to('.g_grow', {
      scrollTrigger: {
        scrub: 5.5,
      },
      scale: 1,
      opacity: 1,
      ease: 'power1',
    });

    gsap.to('.g_text', {
      scrollTrigger: {
        trigger: '.g_text',
        start: 'top top',
        end: 'center bottom',
      },
      y: 0,
      opacity: 1,
      ease: 'power2.inOut',
      duration: 1,
    });
  }, []);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleEnded = () => {
      gsap.fromTo(
        '.feature-video',
        {
          scale: 1.2,
          duration: 2,
          ease: 'power2.out',
          repeat: -1,
          yoyo: true,
        },
        {
          scale: 1,
          duration: 2,
          ease: 'power2.out',
          repeat: -1,
          yoyo: true,
        },
      );
    };

    video?.addEventListener('ended', handleEnded);

    return () => {
      video?.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section className='common-padding bg-zinc relative h-full overflow-hidden'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full'>
          <h1 id='features_title' className='section-heading'>
            Explore the full story.
          </h1>
        </div>

        <div className='flex flex-col items-center justify-center overflow-hidden'>
          <div className='mt-32 mb-24 pl-24'>
            <h2 className='text-5xl font-semibold lg:text-7xl'>iPhone.</h2>
            <h2 className='text-5xl font-semibold lg:text-7xl'>Forged in titanium.</h2>
          </div>

          <div className='flex-center flex-col sm:px-10'>
            <div className='relative flex h-[50vh] w-full items-center'>
              <video
                playsInline
                id='exploreVideo'
                className='h-full w-full object-cover object-center'
                preload='none'
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={exploreVideo} type='video/mp4' />
              </video>
            </div>

            <div className='relative flex w-full flex-col'>
              <div className='feature-video-container'>
                <div className='h-[50vh] flex-1 overflow-hidden'>
                  <img src={explore1Img} alt='titanium' className='feature-video g_grow' />
                </div>
                <div className='h-[50vh] flex-1 overflow-hidden'>
                  <img src={explore2Img} alt='titanium 2' className='feature-video g_grow' />
                </div>
              </div>

              <div className='feature-text-container'>
                <div className='flex-center flex-1'>
                  <p className='feature-text g_text'>
                    iPhone 15 Pro is{' '}
                    <span className='text-white'>
                      the first iPhone to feature an aerospace-grade titanium design
                    </span>
                    , using the same alloy that spacecrafts use for missions to Mars.
                  </p>
                </div>

                <div className='flex-center flex-1'>
                  <p className='feature-text g_text'>
                    Titanium has one of the best strength-to-weight ratios of any metal, making
                    these our <span className='text-white'>lightest Pro models ever.</span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
