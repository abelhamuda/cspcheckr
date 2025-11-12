import React from 'react';
import HeaderChecker from './components/HeaderChecker';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <div className="relative">
      <AnimatedBackground />
      <HeaderChecker />
    </div>
  );
}

export default App;