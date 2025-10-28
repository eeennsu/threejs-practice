import type { MutableRefObject } from 'react';

export type Timeline = gsap.core.Timeline;
export type TweenTarget = gsap.TweenTarget;
export type TweenVars = gsap.TweenVars;
export type ScrollTriggerVars = ScrollTrigger.Vars;
export type RotationRef = MutableRefObject<{ rotation: { y: number } } | null>;
