/*
  - View
    - 하나의 Canvas 안에서 여러 개의 3D 뷰포트를 나누는 역할
    - 그러나 deri 에서는 좀 다름. View는 Canvas 밖에서 등록되고 안에서 렌더링 됨 (포털 개념을 씀)
    - 각각의 View는 독립된 카메라, 조명, 모델을 가질 수 있음

  - ambientLight 
    - 전체적으로 고르게 비추는 기본광.
    - 그림자는 만들지 않지만, 모델이 완전히 어둡게 보이지 않게 해줌
    - 햇빛이나 반사광 같은 부드러운 조명 느낌
  
  - PerspectiveCamera
    - 사람 눈 처럼 원근감이 있는 카메라
    - position={[0, 0, 4]} 이면 z축 뒤쪽에서 모델을 바라보는 위치
    - makeDefault로 해당 뷰의 기본 카메라로 설정
  
  - OrbitControls
    - 마우스로 3D 모델을 회전시키는 컨트롤러
    - enablePan : 좌우 이동 여부
    - target : 회전 중심점을 모델의 원점으로 설정

  - Html
    - 3D 공간 안에 실제 html 요소를 렌더링하게 해주는 컴포넌트

*/
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import {
  Suspense,
  type Dispatch,
  type FC,
  type MutableRefObject,
  type SetStateAction,
} from 'react';
import * as THREE from 'three';

import { cn } from '@shadcn-ui/utils';

import { IModel, Size } from '@entities/home/types';

import IPhoneModel from './IPhoneModel';
import Lights from './Lights';
import Loader from './Loader';

interface IProps {
  index: number;
  groupRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  gsapType: string;
  controlRef: MutableRefObject<any>;
  setRotationState: Dispatch<SetStateAction<number>>;
  item: IModel;
  size: Size;
}

const ModelView: FC<IProps> = ({
  controlRef,
  groupRef,
  gsapType,
  item,
  index,
  setRotationState,
  size,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={cn('absolute size-full', index === 2 && 'right-[-100%]')}
    >
      <ambientLight intensity={0.6} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <IPhoneModel item={item} scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} size={size} />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
