import React from 'react';
import ReactDOM from 'react-dom/client';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

// Import Assets
import MetalMap from '../assets/MetalNormalMap.png';
import MetalNormalMap from '../assets/MetalNormalMap.png';

const Building = ({ position, size, landId, landInfo, setLandName, setLandOwner, setHasOwner, setLandId, account,setForSale}) => {
    const [surface, color] = useLoader(TextureLoader, [MetalNormalMap, MetalMap])
    console.log(landInfo,"Owner ",account)
    const clickHandler = () => {
        
        setLandName(landInfo.name)
        setLandId(landId)

        if (landInfo.owner === '0x0000000000000000000000000000000000000000') {
            setLandOwner('No Owner')
            setHasOwner(true)
            setForSale(true)
        } else if(landInfo.owner === account){
            setLandOwner(landInfo.owner)
            setHasOwner(true)
            setForSale(landInfo.isForSale)
        } else{
            
            setLandOwner(landInfo.owner)
            setHasOwner(true)
            setForSale(landInfo.isForSale)
        }
        
    }

    return (
        <mesh position={position} onClick={clickHandler}>
            <boxGeometry args={size} />
            <meshStandardMaterial map={color} normalMap={surface} metalness={0.20} />
        </mesh>
    );
}

export default Building;