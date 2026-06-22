'use client';

import React, { useState, useEffect } from 'react';
import SplashScreen from '@/frontend_lib/components/SplashScreen';
import CountdownSection from '@/frontend_lib/components/CountdownSection';
import LocationSection from '@/frontend_lib/components/LocationSection';
import RSVPForm from '@/frontend_lib/components/RSVPForm';
import WeddingParticles from '@/frontend_lib/components/WeddingParticles';
import BackgroundMusic from '@/frontend_lib/components/BackgroundMusic';
import LanguageSwitcher from '@/frontend_lib/components/LanguageSwitcher';
import { useLanguage } from '@/frontend_lib/context/LanguageContext';

type ScreenState = 'splash' | 'intro' | 'main';

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>('splash');
  const [isFadingOutIntro, setIsFadingOutIntro] = useState(false);
  const { t } = useLanguage();

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
      <LanguageSwitcher />
      <BackgroundMusic shouldPlay={screen !== 'splash'} />

      {screen === 'splash' && <SplashScreen onOpen={handleOpenSplash} />}

      {screen === 'intro' && (
        <main className="wedding-container intro-screen fade-in">
          <div className={`wedding-content ${isFadingOutIntro ? 'fade-out' : ''}`}>
            <div className="invite-text reveal-anim delay-1">{t('togetherWith')}</div>
            <h1 className="names reveal-anim delay-2">
              {t('ebram')}
              <br />
              <span className="ampersand">&</span>
              <br />
              {t('marina')}
            </h1>
            <div className="date-section reveal-anim delay-3">
              <span className="date">{t('date')}</span>
            </div>
            <div className="location-text reveal-anim delay-4">
              {t('celebrating')}
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
              <div className="main-header">{t('wereGettingMarried')}</div>
              <h1 className="main-names">
                {t('ebram')}
                <br />
                <span className="gold-ampersand">&</span>
                <br />
                {t('marina')}
              </h1>

              <div className="decorative-line">
                <span className="star">✦</span>
              </div>

              <div className="main-date">{t('date')}</div>

              <div className="bottom-action">
                <div className="confirm-text">{t('confirmAttendance')}</div>
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
