import React, {useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import {reader} from '../config/helpers'
import {TryerTabs} from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import PhotoPicker from '../components/PhotoPicker'
import { Tab } from '../components'

import { CustomButton } from '../components'

const Tryer = () => {

    const snap = useSnapshot(state)

    const [activeTryerTab, setActiveTryerTab] = useState("");

    const [file, setFile] = useState('');

    const generateTabContent = () => {
        switch (activeTryerTab) {
            case 'photopicker':
            return <PhotoPicker 
                file={file}
                setFile={setFile}
                readFile={readFile}
                />;
            default:
            return null;
        }
    }

    const readFile = (type) => {
    reader(file)
        .then((data) => {
        handleDecals(type, result);
        setActiveTryerTab("");
        })
    }

    return (
        <AnimatePresence>
            {snap.intro === 2 && (
            <>
                <motion.div
                key="custom"
                className='absolute top-0 left-0 z-10'
                {...slideAnimation('left')}
                >
                <div className='flex items-center min-h-screen'>
                    <div className='editortabs-container tabs'>
                    {TryerTabs.map((tab) => (
                        <Tab
                        key={tab.name}
                        tab={tab}
                        handleClick={() => setActiveTryerTab(tab.name)}
                        />
                    ))}

                    {generateTabContent()}
                    </div>
                </div>
                </motion.div>

                <motion.div
                className=''
                {...fadeAnimation}
                >

                </motion.div>

                <motion.div 
                className='absolute z-10 top-5 right-5' 
                {...fadeAnimation}
                >

                <CustomButton 
                    type="filled"
                    title="Go Back"
                    handleClick={() => {
                    setActiveTryerTab("");
                    state.intro = 1;
                    }}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
                </motion.div>
            </>
            )}
        </AnimatePresence>
        )
}

export default Tryer