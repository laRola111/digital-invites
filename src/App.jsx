import React from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import AudioPlayer from './components/AudioPlayer';
import ParentsMessage from './components/ParentsMessage';
import PhotoGallery from './components/PhotoGallery';
import Timeline from './components/Timeline';
import Countdown from './components/Countdown';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  return (
    <div className="App" style={{ backgroundColor: 'var(--color-bg-light)', position: 'relative' }}>
      <ParticlesBackground />
      <AudioPlayer />
      
      <WelcomeScreen />
      <ParentsMessage />
      <PhotoGallery />
      <Timeline />
      <Countdown />
      <Footer />
    </div>
  );
}

export default App;
