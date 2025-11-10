/*
  - three
    - three.js의 확장 유틸 라이브러리
    - 비공식 보조 기능들을 묶은 패키지임
    - GLT

  - useGLTF
    - scene.glb 파일을 로드하고, 내부의 mesh geometry들과 materials를 객체 형태로 가져옴
    - nodes : 모델 안의 각 파츠 (geometry)
    - materials : 각 파츠의 재질 (빛 반응, 색상 등)

  - useTexture
    - item.img 경로에서 이미지를 불러와서 텍스처 객체로 만듬
    - 이는 나중에 일부 mesh의 표면 맵으로 붙음
*/
import { useGLTF, useTexture } from '@react-three/drei';
import { ComponentProps, FC, useEffect } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { IModel, Size } from '@entities/home/types';

interface MyGLTF extends GLTF {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
}

interface IProps extends ComponentProps<'group'> {
  item: IModel;
  size: Size;
}

const IPhoneModel: FC<IProps> = ({ item, ...groupProps }) => {
  // 모델과 텍스쳐 불러오기
  const { nodes, materials } = useGLTF('/models/scene.glb') as MyGLTF;
  const texture = useTexture(item?.img);

  /* 재질 색상 동적 변경
    - 모델 안의 모든 재질(material)을 순회하며 색을 바꾸는 로직
    - 단, 특정 이름의 재질 (위 조건문에 있는 5개)은 예외 처리로 색을 바꾸지 않음. 원본 재질을 유지해야 하는 부분임)
    - 나머지는 item.color값으로 색상을 바꿈
    -> 즉, item에 따라 모델의 색상 / 텍스처가 즉시 바뀌는 구조
  */
  useEffect(() => {
    Object.entries(materials).map(([name, mat]) => {
      const material = mat as THREE.MeshStandardMaterial;

      // 변하면 안되는 메테리얼들임
      if (
        name !== 'zFdeDaGNRwzccye' &&
        name !== 'ujsvqBWRMnqdwPx' &&
        name !== 'hUlRcbieVuIiOXG' &&
        name !== 'jlzuBkUzuJqgiAK' &&
        name !== 'xNrofRCqOXXHVZt'
      ) {
        material.color = new THREE.Color(item?.color?.[0]);
      }

      material.needsUpdate = true;
    });
  }, [materials, item]);

  /* 실제 메쉬 렌더링
    - group : 모델 전체 묶음
      - 이 안에 여러 mesh 들이 있다. 각각 glb 안의 파츠 하나 
    
    - 각 mesh
      - geometry : 형태 (바디, 힐, 창문 등)
      - material : 표면 질감
      - scale : 모델의 크기
  */
  return (
    <group {...groupProps} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ttmRoLdJipiIOmf.geometry}
        material={materials.hUlRcbieVuIiOXG}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DjsDkGiopeiEJZK.geometry}
        material={materials.PaletteMaterial001}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.buRWvyqhBBgcJFo.geometry}
        material={materials.PaletteMaterial002}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MrMmlCAsAxJpYqQ_0.geometry}
        material={materials.dxCVrUCvYhjVxqy}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wqbHSzWaUxBCwxY_0.geometry}
        material={materials.MHFGNLrDQbTNima}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.QvGDcbDApaGssma.geometry}
        material={materials.kUhjpatHUvkBwfM}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.vFwJFNASGvEHWhs.geometry}
        material={materials.RJoymvEsaIItifI}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.evAxFwhaQUwXuua.geometry}
        material={materials.KSIxMqttXxxmOYl}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.USxQiqZgxHbRvqB.geometry}
        material={materials.mcPrzcBUcdqUybC}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TvgBVmqNmSrFVfW.geometry}
        material={materials.pIhYLPqiSQOZTjn}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GuYJryuYunhpphO.geometry}
        material={materials.eShKpuMNVJTRrgg}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pvdHknDTGDzVpwc.geometry}
        material={materials.xdyiJLYTYRfJffH}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CfghdUoyzvwzIum.geometry}
        material={materials.jpGaQNgTtEGkTfo}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DjdhycfQYjKMDyn.geometry}
        material={materials.ujsvqBWRMnqdwPx}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.usFLmqcyrnltBUr.geometry}
        material={materials.sxNzrmuTqVeaXdg}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.xXDHkMplTIDAXLN.geometry}
        material={materials.pIJKfZsazmcpEiU}
        scale={0.01}
      >
        <meshStandardMaterial roughness={1} map={texture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.vELORlCJixqPHsZ.geometry}
        material={materials.zFdeDaGNRwzccye}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EbQGKrWAqhBHiMv.geometry}
        material={materials.TBLSREBUyLMVtJa}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EddVrWkqZTlvmci.geometry}
        material={materials.xNrofRCqOXXHVZt}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.KSWlaxBcnPDpFCs.geometry}
        material={materials.yQQySPTfbEJufve}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TakBsdEjEytCAMK.geometry}
        material={materials.PaletteMaterial003}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.IykfmVvLplTsTEW.geometry}
        material={materials.PaletteMaterial004}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wLfSXtbwRlBrwof.geometry}
        material={materials.oZRkkORNzkufnGD}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.WJwwVjsahIXbJpU.geometry}
        material={materials.yhcAXNGcJWCqtIS}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.YfrJNXgMvGOAfzz.geometry}
        material={materials.bCgzXjHOanGdTFV}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DCLCbjzqejuvsqH.geometry}
        material={materials.vhaEJjZoqGtyLdo}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CdalkzDVnwgdEhS.geometry}
        material={materials.jlzuBkUzuJqgiAK}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NtjcIgolNGgYlCg.geometry}
        material={materials.PpwUTnTFZJXxCoE}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pXBNoLiaMwsDHRF.geometry}
        material={materials.yiDkEwDSyEhavuP}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.IkoiNqATMVoZFKD.geometry}
        material={materials.hiVunnLeAHkwGEo}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rqgRAGHOwnuBypi.geometry}
        material={materials.HGhEhpqSBZRnjHC}
        scale={0.01}
      />
    </group>
  );
};

export default IPhoneModel;

// 해당 glb를 미리 로드해둠. 나중에 렌더링 시점에 로딩 지연이 줄어듬
// useGLTF.preload('/models/scene.glb');
