'use client';

import React, { useState, useEffect, useRef } from 'react';

interface BackgroundMusicProps {
  shouldPlay: boolean;
}

export default function BackgroundMusic({ shouldPlay }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      // Browsers require a play promise handling
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Audio autoplay prevented by browser:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (!shouldPlay) return null; // Don't show the button if they haven't passed the splash screen

  return (
    <>
      <audio ref={audioRef} src="/die-with-a-smile.mp3" loop />
      <button 
        onClick={togglePlay} 
        className={`music-toggle-btn ${isPlaying ? 'playing' : ''}`}
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>
    </>
  );
}
