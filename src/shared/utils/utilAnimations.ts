import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import { ScrollTriggerVars, TweenVars, RotationRef, Timeline, TweenTarget } from '@typings/gsap';

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (
  target: gsap.DOMTarget,
  animationProps: TweenVars,
  scrollProps?: ScrollTriggerVars,
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...(scrollProps ?? {}),
    },
  });
};

export const animateWithGsapTimeline = (
  timeline: Timeline,
  rotationRef: RotationRef,
  rotationState: number,
  firstTarget: TweenTarget,
  secondTarget: TweenTarget,
  animationProps: TweenVars,
) => {
  const rotation = rotationRef.current?.rotation;

  if (rotation) {
    timeline.to(rotation, {
      y: rotationState,
      duration: 1,
      ease: 'power2.inOut',
    });
  }

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    rotation ? '<' : undefined,
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<',
  );
};
