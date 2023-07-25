import React from 'react'

import CustomButton from './CustomButton'

import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimation, slideAnimation } from '../config/motion'

import state from '../store'
import { useSnapshot } from 'valtio'

const PhotoPicker = ({file, setFile, readFile}) => {

  const snap = useSnapshot(state)
  return (
    <AnimatePresence>
      {snap.intro === 2 && (
      <motion.div 
        key="custom"
        className='filepicker-container'
        {...slideAnimation('left')}
      >
        <div className='flex-1 flex flex-col'>
          <input 
            id='file-upload'
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor='file-upload' className='filepicker-label'>
            Upload File
          </label>

          <p className='mt-2 text-black'>
            {file === '' ? 'No file selected' : file.name}
          </p>
        </div>

        <div className='mt-4 flex flex-wrap gap-3'>
          <CustomButton
            type='filled'
            title='Submit'
            handleClick={() => readFile('logo')}
            customStyles="text-xs"
          />
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PhotoPicker