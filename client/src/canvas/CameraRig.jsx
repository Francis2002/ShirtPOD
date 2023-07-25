import React, { useEffect, useRef, useState } from 'react'
import { ReactDOM } from 'react'
import {useFrame} from '@react-three/fiber'
import {useSnapshot} from 'valtio'
import {easing} from 'maath'

import store from '../store'

const CameraRig = ({children}) => {

  const group = useRef()
  const snap = useSnapshot(store)

  const isRotatedRef = useRef(false);

  useFrame((state, delta) => {

    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    const rotationTargetX = state.pointer.x
    const rotationTargetY = state.pointer.y / 2

    console.log(snap.intro, isBreakpoint, isMobile)

    //set initial position
    let targetPosition = [-0.4, 0, 2]
    if (snap.intro === 0) {
      if (isBreakpoint) targetPosition = [0, 0, 2]
      if (isMobile) targetPosition = [2, 0.2, 2.5]
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2]
    }

    console.log(targetPosition)

    const handleRotation = () => {
      if (store.isRotated && !isRotatedRef.current) {
        easing.dampE(
          group.current.rotation,
          [0, Math.PI, 0],
          0.25,
          delta
        )
        console.log('rotated');
        isRotatedRef.current = true; // Mark the rotation as applied
      }
      
      if (!store.isRotated && isRotatedRef.current) {
        easing.dampE(
          group.current.rotation,
          [0, 0, 0],
          0.25,
          delta
        )
        console.log('unRotated');
        isRotatedRef.current = false; // Mark the rotation as unapplied
      }
    }

    handleRotation();

    // set the model position
    easing.damp3(
      state.camera.position,
      targetPosition,
      0.25,
      delta
    )

    // set the model rotation
    easing.dampE(
      group.current.rotation,
      [rotationTargetY, !isRotatedRef.current ? (rotationTargetX) : (rotationTargetX + Math.PI) , 0],
      0.25,
      delta
    )
  })

  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig