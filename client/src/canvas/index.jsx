import {Canvas} from '@react-three/fiber';
import { Environment, Center} from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import { AnimatePresence } from 'framer-motion';

import store from '../store';
import { useSnapshot } from 'valtio';

const CanvasModel = () => {

  const snap = useSnapshot(store);

  return (
    <AnimatePresence>
      {snap.intro !== 2 && (
      <Canvas
        shadows
        camera={{position: [0, 0, 0], fov: 25}}
        gl={{preserveDrawingBuffer: true}}
        className='w-full max-w-full h-full transition-all ease-in-out'
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />

        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>
      )}
    </AnimatePresence>
  )
}

export default CanvasModel