'use client';

import React, { useState } from 'react';

interface SplashScreenProps {
  onOpen: () => void;
}

export default function SplashScreen({ onOpen }: SplashScreenProps) {
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Call the parent onOpen, maybe the parent wants to trigger an event,
    // but the component itself will stay mounted and animate.
    onOpen();
  };

  return (
    <div className={`splash-container ${isOpening ? 'is-opening' : ''}`}>
      {/* Left Curtain */}
      <div className="curtain left-curtain">
        <div className="curtain-bg"></div>
      </div>

      {/* Right Curtain */}
      <div className="curtain right-curtain">
        <div className="curtain-bg"></div>
      </div>

      {/* Center Interactive Button & Language */}
      <div className={`splash-ui ${isOpening ? 'fade-out' : ''}`}>
        <div className="splash-lang-toggle">
          <button
            className={`lang-btn ${language === 'EN' ? 'active' : ''}`}
            onClick={() => setLanguage('EN')}
          >
            EN
          </button>
          <button
            className={`lang-btn ${language === 'AR' ? 'active' : ''}`}
            onClick={() => setLanguage('AR')}
          >
            عربي
          </button>
        </div>

        <div className="splash-center-action">
          <button className="tap-open-btn" onClick={handleOpen}>
            <div className="tap-open-circle">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
              </svg>
            </div>
            <span className="tap-open-text">TAP TO OPEN</span>
          </button>
        </div>
      </div>
    </div>
  );
}
