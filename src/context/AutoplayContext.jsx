import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

// Scene durations in milliseconds
const SCENE_DURATIONS = [
  7000,     // 0: WelcomeScreen
  8000,     // 1: ParentsMessage
  11000,    // 2: PhotoCinematic
  10000,    // 3: Timeline
  5500,     // 4: Countdown
  Infinity, // 5: Footer/Closing
];

export const TOTAL_SCENES = SCENE_DURATIONS.length;

const AutoplayContext = createContext(null);

export const AutoplayProvider = ({ children }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef(null);
  const sceneRefs = useRef({}); // { sceneIndex: DOMElement }

  const registerScene = useCallback((index, el) => {
    if (el) sceneRefs.current[index] = el;
  }, []);

  const scrollToScene = useCallback((index) => {
    const el = sceneRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const advance = useCallback(() => {
    setCurrentScene(prev => {
      const next = prev + 1;
      if (next < TOTAL_SCENES) {
        scrollToScene(next);
        return next;
      }
      return prev;
    });
  }, [scrollToScene]);

  // Schedule the next advance
  useEffect(() => {
    if (!isPlaying) return;
    if (!hasStarted) return;
    const duration = SCENE_DURATIONS[currentScene];
    if (!isFinite(duration)) return;
    timerRef.current = setTimeout(advance, duration);
    return () => clearTimeout(timerRef.current);
  }, [currentScene, isPlaying, hasStarted, advance]);

  const start = useCallback(() => {
    setHasStarted(true);
    setIsPlaying(true);
    setCurrentScene(0);
    scrollToScene(0);
  }, [scrollToScene]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
  }, []);

  const resume = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const goToScene = useCallback((index) => {
    clearTimeout(timerRef.current);
    setCurrentScene(index);
    scrollToScene(index);
  }, [scrollToScene]);

  const progressPercent = ((currentScene) / (TOTAL_SCENES - 1)) * 100;

  return (
    <AutoplayContext.Provider value={{
      currentScene,
      isPlaying,
      hasStarted,
      progressPercent,
      registerScene,
      start,
      pause,
      resume,
      goToScene,
      advance,
      TOTAL_SCENES,
    }}>
      {children}
    </AutoplayContext.Provider>
  );
};

export const useAutoplay = () => {
  const ctx = useContext(AutoplayContext);
  if (!ctx) throw new Error('useAutoplay must be used inside AutoplayProvider');
  return ctx;
};
