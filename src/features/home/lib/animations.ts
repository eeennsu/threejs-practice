import gsap from 'gsap';
import { RefObject } from 'react';
import * as THREE from 'three';

export const animateWithGsap = (
  target: gsap.TweenTarget,
  animationProps: gsap.TweenVars,
  scrollProps?: ScrollTrigger.Vars,
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      ...scrollProps,
    },
  });
};

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: RefObject<THREE.Group<THREE.Object3DEventMap>>,
  rotationState: number,
  firstTarget: gsap.TweenTarget,
  secondTarget: gsap.TweenTarget,
  animationProps: gsap.TweenVars,
) => {
  const xOrY = Math.random() > 0.5 ? 'x' : 'y';

  timeline
    .to(rotationRef.current!.rotation, {
      [xOrY]: rotationState,
      duration: 1,
      ease: 'power1.inOut',
    })
    .to(
      firstTarget,
      {
        ...animationProps,
        ease: 'power1.inOut',
      },
      '<',
    )
    .to(
      secondTarget,
      {
        ...animationProps,
        ease: 'power1.inOut',
      },
      '<',
    );
};
