import React, {useEffect, useRef, useState} from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import {useSnapshot} from 'valtio'

import state from '../store'


const Backdrop = () => {
  const shadows = useRef()

  const snap = useSnapshot(state)

  const [isRotated, setIsRotated] = useState(snap.isRotated);

  useEffect(() => {
    setIsRotated(snap.isRotated);
    console.log('isRotated: ', isRotated);
  }, [snap.isRotated]);

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={30}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI /2 , 0, snap.isRotated ? (Math.PI) : (0)]}
      position={!isRotated ? ([0, 0, -0.14]) : ([0, 0, 0.14])}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={!isRotated ? ([5, 5, -10]) : ([5, 5, 10])}
      />
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.25}
        ambient={0.55}
        position={!isRotated ? ([-5, 5, -10]) : ([-5, 5, 10])}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop