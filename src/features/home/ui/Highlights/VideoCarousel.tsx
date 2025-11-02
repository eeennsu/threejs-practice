import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SyntheticEvent, useEffect, useRef, useState, type FC } from 'react';

import { hightlightsSlides } from '@entities/home/consts';

import { pauseImg, playImg, replayImg } from '@utils/utilAssets';

type Video = {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
};

const VideoCarousel: FC = () => {
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLDivElement | null)[]>([]);

  const [video, setVideo] = useState<Video>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState<any[]>([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    if (!span[videoId]) return;

    const anim = gsap.to(span[videoId], {
      onUpdate: () => {
        if (!videoRef.current[videoId] || !span[videoId]) return;

        const progress = Math.ceil(anim.progress() * 100);

        if (progress !== currentProgress) {
          currentProgress = progress;

          gsap.to(videoDivRef.current[videoId], {
            width: window.innerWidth < 1200 ? '10vw' : '4vw',
          });

          gsap.to(span[videoId], {
            width: `${currentProgress}%`,
            backgroundColor: 'white',
          });
        }
      },
      onComplete: () => {
        if (!videoRef.current[videoId] || !span[videoId]) return;

        if (isPlaying) {
          gsap.to(videoDivRef.current[videoId], {
            width: '12px',
            ease: 'power2.out',
          });
          gsap.to(span[videoId], {
            backgroundColor: '#afafaf',
          });
        }
      },
    });

    if (videoId === 0) {
      anim.restart();
    }

    const animUpdate = () => {
      if (!videoRef.current[videoId] || !span[videoId]) return;
      anim.progress(
        videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration,
      );
    };

    if (isPlaying) {
      gsap.ticker.add(animUpdate);
    } else {
      gsap.ticker.remove(animUpdate);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, startPlay]);

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'expo.inOut',
    });

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',

        // 스크롤로 트리거 할 때 어떤 동작을 할지를 제어
        // onEnter / onLeave / onEnterBack / onLeaveBack
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo(prev => ({ ...prev, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);

  const handleLoadedMetaData = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    setLoadedData(prev => [...prev, e]);
  };

  const handleProcess = (type: string, i?: number) => {
    switch (type) {
      case 'video-end':
        setVideo(prev => ({ ...prev, isEnd: true, videoId: i! + 1 }));
        break;

      case 'video-last':
        setVideo(prev => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;

      case 'play':
        setVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      case 'pause':
        setVideo(prev => ({ ...prev, isPlaying: false }));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className='flex items-center'>
        {hightlightsSlides.map((item, i) => (
          <div key={item.id} id='slider' className='pr-10 sm:pr-20'>
            <div className='video-carousel_container'>
              <div className='flex-center h-full w-full overflow-hidden rounded-3xl bg-black'>
                <video
                  id='video'
                  playsInline={true}
                  className='pointer-events-none'
                  preload='auto'
                  muted
                  ref={el => videoRef.current[i] = el}
                  onEnded={() =>
                    i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')
                  }
                  onPlay={() => setVideo(pre => ({ ...pre, isPlaying: true }))}
                  onLoadedMetadata={e => handleLoadedMetaData(e)}
                >
                  <source src={item.video} type='video/mp4' />
                </video>
              </div>

              <div className='absolute top-12 left-[5%] z-10'>
                {item.textLists.map((text, i) => (
                  <p key={i} className='text-xl font-medium md:text-2xl'>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex-center relative mt-10'>
        <div className='flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur'>
          {videoRef.current.map((_, i) => (
            <div
              key={i}
              className='relative mx-2 inline h-3 w-3 cursor-pointer rounded-full bg-gray-200'
              ref={el => (videoDivRef.current[i] = el)}
            >
              <span
                className='absolute h-full w-full rounded-full'
                ref={el => (videoSpanRef.current[i] = el)}
              />
            </div>
          ))}
        </div>

        <button className='control-btn'>
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset')
                : !isPlaying
                  ? () => handleProcess('play')
                  : () => handleProcess('pause')
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
