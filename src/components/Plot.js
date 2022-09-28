import React from 'react';
import ReactDOM from 'react-dom/client';
const Plot = ({ position, size, landId, landInfo, setLandName, setLandOwner, setHasOwner, setLandId }) => {
    
    const clickHandler = () => {
        setLandName(landInfo.name)
        setLandId(landId)

        if (landInfo.owner === '0x0000000000000000000000000000000000000000') {
            setLandOwner(landInfo.owner)
            setHasOwner(false)
        } else {
            setLandOwner(landInfo.owner)
            
            setHasOwner(true)
        }
    }
    const textOptions = {
        
        size: 3,
        height: 1
      };

    return (
        <mesh position={position} onClick={clickHandler}>
            <planeGeometry attach="geometry" args={size} />
            <meshStandardMaterial color={"#76451c"} metalness={0.5} roughness={0} />
        </mesh>
    );
}
export default Plot;
