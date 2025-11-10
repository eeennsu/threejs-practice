/*  @react-three/fiber : three.js 를 React 렌더러로 감싼 것 (JSX로 씬을 선언적으로 구성)
      - <mesh>, <ambientLight>처럼 intrinsic elements로 three 객체를 바로 배치.
      - React의 props, Suspense 등과 자연스럽게 결합
    @react-three/drei : fiber 위에서 자주 쓰는 편의 컴포넌트 / 훅 모음 (카메라, 컨트롤, 로더 등).
      - 유틸 컴포넌트 모음집
      - View : 씬 전체에 고르게 비치는 기본 조명. 그림자는 만들어지지 않지만, 대상이 완전한 암흑에 빠지지 않게 해줌
      - PerspectiveCamera : 원근감있는 카메라 (사실상 일반적인 3D 카메라)  

  Canvas - 영화관 스크린 (실제 그림이 그려지는 공간)
  View - 영화 장면 (각자 조명, 카메라, 모델을 가진 독립된 씬)
  View.Port - 스크린에 각 장면을 배치하는 매니저
*/
import { useGSAP } from '@gsap/react';
import { View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef, useState, type FC } from 'react';
import * as THREE from 'three';

import { animateWithGsapTimeline } from '@features/home/lib/animations';

import { models, sizes } from '@entities/home/consts';
import { IModel, Size } from '@entities/home/types';

import ModelView from './ModelView';

const Model: FC = () => {
  const [size, setSize] = useState<Size>('small');
  const [model, setModel] = useState<IModel>(models[0]);

  // camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef<THREE.Group<THREE.Object3DEventMap>>(new THREE.Group());
  const large = useRef<THREE.Group<THREE.Object3DEventMap>>(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState<number>(0);
  const [largeRotation, setLargeRotation] = useState<number>(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (!small.current || !large.current) return;

    if (size === 'large') {
      animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 1.7,
      });
    } else {
      animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 1.7,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useGSAP(() => {
    gsap.to('#heading', {
      y: 0,
      opacity: 1,
    });
  }, []);

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <h1 id='heading' className='section-heading'>
          Take a closer look.
        </h1>

        <div className='mt-5 flex flex-col items-center'>
          <div className='relative h-[75vh] w-full overflow-hidden md:h-[90vh]'>
            <ModelView
              index={1}
              groupRef={small}
              gsapType='view1'
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType='view2'
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className='size-full'
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root') as HTMLElement}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className='mx-auto w-full'>
            <p className='mb-5 text-center text-sm font-light'>{model.title}</p>

            <div className='flex-center'>
              <div className='color-container'>
                {models.map((item, i) => (
                  <button
                    key={i}
                    className='mx-2 size-6 cursor-pointer rounded-full'
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </div>

              <button className='size-btn-container cursor-pointer'>
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className='size-btn'
                    style={{
                      backgroundColor: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white',
                    }}
                    onClick={() => setSize(value as Size)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
