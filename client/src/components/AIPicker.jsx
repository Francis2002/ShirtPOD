import React from 'react'
import CustomButton from './CustomButton'

import {useSnapshot} from 'valtio'

import state from '../store'

import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimation, slideAnimation } from '../config/motion'


const AIPicker = ({prompt, setPrompt, generatingImg, handleSubmit}) => {

  const snap = useSnapshot(state)
  return (
    <AnimatePresence>
      {snap.intro === 1 && (
      <motion.div 
        className='aipicker-container'
        {...slideAnimation('left')}
      >
        <textarea 
          placeholder='Ask AI...'
          value={prompt}
          rows={5}
          onChange={(e) => setPrompt(e.target.value)}
          className='aipicker-textarea'
        />
        <div  className='flex flex-wrap gap-3'>
          {generatingImg ? (
            <CustomButton
              type='outline'
              title='Generating...'
              customStyles="text-xs"
            />
          ) : (
            <>
              <CustomButton
                type='filled'
                title='AI Logo'
                customStyles="text-xs"
                handleClick={() => handleSubmit('logo')}
              />

              <CustomButton
                type='filled'
                title='AI Full'
                customStyles="text-xs"
                handleClick={() => handleSubmit('full')}
              />
            </>
          )}
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AIPicker