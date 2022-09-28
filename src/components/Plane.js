import React from 'react';
import ReactDOM from 'react-dom/client';

const Plane = () => {
    return (
        <mesh position={[0, 0, 0]}>
            <planeGeometry attach="geometry" args={[50, 50]} />
            <meshStandardMaterial color={"green"} />
        </mesh>
    );
}

export default Plane;