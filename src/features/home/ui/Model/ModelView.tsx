import { PerspectiveCamera, View } from '@react-three/drei';
import { Suspense, type Dispatch, type FC, type MutableRefObject, type SetStateAction } from 'react';
import * as THREE from 'three';

import { cn } from '@shadcn-ui/utils';

import Lights from './Lights';

export interface IModel {
  title: string;
  color: string[];
  img: string;
}

export type Size = 'small' | 'large';

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
      className={cn('size-full border-2 border-red-500', index === 2 && 'right-[-100%]')}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <Suspense fallback={<div>Loading...</div>}>
        
      </Suspense>
    </View>
  );
};

export default ModelView;
