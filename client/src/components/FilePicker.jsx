import React from 'react'

import CustomButton from './CustomButton'

import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimation, slideAnimation } from '../config/motion'

import state from '../store'
import { useSnapshot } from 'valtio'

const FilePicker = ({file, setFile, readFile}) => {
  
  const snap = useSnapshot(state)
  return (
    <AnimatePresence>
      {snap.intro === 1 && (
    <motion.div 
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
          title='Logo'
          handleClick={() => readFile('logo')}
          customStyles="text-xs"
        />
        <CustomButton
          type='filled'
          title='Full'
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        />
      </div>
    </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FilePicker