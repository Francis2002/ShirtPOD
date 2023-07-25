import { proxy } from "valtio";

const store = proxy({
    intro: 0,
    color: '#EFBD48',
    isLogoTexture:true,
    isFullTexture:false,
    isRotated:false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png'
});

export default store;