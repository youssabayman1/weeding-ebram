'use client';

import React, { useState, useEffect } from 'react';
import SplashScreen from '@/frontend_lib/components/SplashScreen';
import CountdownSection from '@/frontend_lib/components/CountdownSection';
import LocationSection from '@/frontend_lib/components/LocationSection';
import RSVPForm from '@/frontend_lib/components/RSVPForm';
import WeddingParticles from '@/frontend_lib/components/WeddingParticles';
import BackgroundMusic from '@/frontend_lib/components/BackgroundMusic';

type ScreenState = 'splash' | 'intro' | 'main';

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>('splash');
  const [isFadingOutIntro, setIsFadingOutIntro] = useState(false);

  useEffect(() => {
    if (screen === 'intro') {
      // Start fade out animation sooner
      const fadeOutTimer = setTimeout(() => {
        setIsFadingOutIntro(true);
      }, 4500);

      // After fade out finishes, switch to main screen
      const switchTimer = setTimeout(() => {
        setScreen('main');
      }, 5300);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(switchTimer);
      };
    }
  }, [screen]);

  const handleOpenSplash = () => {
    setTimeout(() => {
      setScreen('intro');
    }, 2500);
  };

  return (
    <>
      <BackgroundMusic shouldPlay={screen !== 'splash'} />

      {screen === 'splash' && <SplashScreen onOpen={handleOpenSplash} />}

      {screen === 'intro' && (
        <main className="wedding-container intro-screen fade-in">
          <div className={`wedding-content ${isFadingOutIntro ? 'fade-out' : ''}`}>
            <div className="invite-text reveal-anim delay-1">Together with their families</div>
            <h1 className="names reveal-anim delay-2">
              Ebram
              <br />
              <span className="ampersand">&</span>
              <br />
              Marina
            </h1>
            <div className="date-section reveal-anim delay-3">
              <span className="date">SEPTEMBER 3, 2026</span>
            </div>
            <div className="location-text reveal-anim delay-4">
              Celebrating our special day
            </div>
          </div>
        </main>
      )}

      {screen === 'main' && (
        <div className="scrollable-page fade-in-slow">
          <section className="hero-section">
            <div className="hero-bg-anim"></div>
            <WeddingParticles />
            <div className="main-content">
              <div className="main-header">WE'RE GETTING MARRIED</div>
              <h1 className="main-names">
                Ebram
                <br />
                <span className="gold-ampersand">&</span>
                <br />
                Marina
              </h1>

              <div className="decorative-line">
                <span className="star">✦</span>
              </div>

              <div className="main-date">September 3, 2026</div>

              <div className="bottom-action">
                <div className="confirm-text">CONFIRM YOUR ATTENDANCE</div>
                <div className="chevron-down">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <section className="countdown-section">
            <CountdownSection />
          </section>

          <section className="location-section">
            <LocationSection />
          </section>

          <section id="rsvp-section" className="rsvp-section">
            <RSVPForm />
          </section>
        </div>
      )}
    </>
  );
}
