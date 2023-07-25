import React from 'react'
import {easing} from 'maath'
import {useFrame} from '@react-three/fiber'
import {useSnapshot} from 'valtio'
import { Decal, useGLTF, useTexture } from '@react-three/drei'

import state from '../store'

import * as THREE from 'three';

import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

const Shirt = () => {

  const snap = useSnapshot(state)
  const {nodes, materials} = useGLTF('/shirt_baked.glb')

  console.log(nodes);
  console.log(materials);

  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  const geometries = [];

  // Push the buffer geometries of each mesh into the geometries array
  for (const key in nodes) {
    if (nodes.hasOwnProperty(key)) {
      const mesh = nodes[key];
      if (mesh.isMesh) {
        geometries.push(mesh.geometry);
      }
    }
  }

  // Merge all buffer geometries into a single buffer geometry
  const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
    geometries,
    false
  );

  return (
    <group
      key={stateString}
    >
      <mesh
        castShadow
        geometry={mergedGeometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, snap.isRotated ? (-0.15) : (0.15)]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt
