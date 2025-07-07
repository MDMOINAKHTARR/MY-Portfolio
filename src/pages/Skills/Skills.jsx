// Skills.jsx
import React from 'react';
import Dock from '../../components/Dock/Dock';
import Particles from './Particles';

const Skills = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000' }}>
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <Dock />
    </div>
  );
};

export default Skills;