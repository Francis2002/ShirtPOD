import React, {useState, useEffect} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import config from '../config/config'
import {download, stylishShirt} from '../assets'
import {downloadCanvasToImage, reader} from '../config/helpers'
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import {AIPicker, ColorPicker, CustomButton, FilePicker, Tab} from '../components'


const Customizer = () => {
  const snap = useSnapshot(state)

  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');

  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    "logoShirt": true,
    "stylishShirt": false,
  });
  const [activeRotate, setActiveRotate] = useState(false);


  //show tab content depending on active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker 
          file={file}
          setFile={setFile}
          readFile={readFile}
          />;
      case 'aipicker':
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}   
        />;
      default:
        return null;
    }
  }

  //handle submit
  const handleSubmit = async (type) => {
    if(!prompt) return alert('Please enter a prompt');

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt
        })
      });
      
      const data = await response.json();

      handleDecals(type,`data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  //handle decals
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  //handle active filter tab
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      case "rotate":
        state.isRotated = !activeRotate;
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }

    if(tabName === "rotate") {
      setActiveRotate((activeRotate) => !activeRotate)
    } else {
      //after setting state => update active filter tab
      setActiveFilterTab((prevState) => ({
        ...prevState,
        [tabName]: !prevState[tabName],
      }))
    }
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  return (
    <AnimatePresence>
      {snap.intro === 1 && (
        <>
          <motion.div
            key="custom"
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className='absolute z-10 top-5 right-5' 
            {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="Try It On You"
              handleClick={() => {
                setActiveEditorTab("");
                state.intro = 2;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-6"
            />

            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => {
                setActiveEditorTab("");
                state.intro = 0;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    isRotated={activeRotate && tab.name === "rotate"}
                    handleClick={() => handleActiveFilterTab(tab.name)}
                  />
                ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer