/* 
  - Environment 
    - hdr 환경 조명 헬퍼
    - 기본적으로 빛이 반사되는 하늘 / 주변 환경을 만들어줌
    - 내부에 <Lightformer> 같은 조명 소스를 넣으면, 그 조명들이 가상 환경 맵에 반영돼서 전체 조명에 간접적으로 영향을 줌
    - resolution은 환경 맵의 해상도이며 값이 높을수록 반사 품질이 좋아지지만 성능은 떨어짐
  
  - Lightformer
    - 환경광 생성기
    - Environment안에 넣으면 마치 조명판처럼 작동함
    - form='rect' -> 직사각형 모양 조명판
    - intensity, scale, color, position, rotation-y 등으로 밝기와 위치를 제어함
    - 카메라에 직접 보이지 않아도 반사광, 금속 재질 등에는 영향을 크게 준다.
    
  - spotLight
    - three.js의 기본 스포트라이트 (fiber에서는 spotLight 바로 사용)
    - 원뿔 모양의 빛을 쏘는 광원
    - 주요 props
      - position : 빛의 위치
      - angle : 원뿔의 퍼짐 각도
      - penumbra : 가장자리 부드러움
      - decay : 거리 감쇠 정도
      - intensity : 밝기
      - color : 빛 색상
  
  - group 
    - three의 Group 객체
    - 조명들을 하나의 그룹으로 묶어서, 이동이나 관리하기 쉽게 한 것
*/
import { Environment, Lightformer } from '@react-three/drei';
import { FC } from 'react';

const Lights: FC = () => {
  return (
    <group name='lights'>
      <Environment resolution={256}>
        <group>
          <Lightformer
            form='rect'
            intensity={10}
            position={[-1, 0, -10]}
            scale={10}
            color={'#495057'}
          />
          <Lightformer
            form='rect'
            intensity={10}
            position={[-10, 2, 1]}
            scale={10}
            rotation-y={Math.PI / 2}
          />
          <Lightformer
            form='rect'
            intensity={10}
            position={[10, 0, 1]}
            scale={10}
            rotation-y={Math.PI / 2}
          />
        </group>
      </Environment>

      <spotLight
        position={[-2, 10, 5]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI * 0.2}
        color={'#f8f9fa'}
      />
      <spotLight
        position={[0, -25, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI * 0.2}
        color={'#f8f9fa'}
      />
      <spotLight
        position={[0, 15, 5]}
        angle={0.15}
        penumbra={1}
        decay={0.1}
        intensity={Math.PI * 3}
      />
    </group>
  );
};

export default Lights;
