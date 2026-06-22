'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/frontend_lib/context/LanguageContext';

export default function CountdownSection() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: September 3, 2026, 00:00:00
    const targetDate = new Date('2026-09-03T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown(); // initial call
    const timerId = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="countdown-wrapper">
      <div className="countdown-header-group">
        <h2 className="countdown-title">{t('countdownTitle')}</h2>
        <p className="countdown-subtitle">{t('countdownSubtitle')}</p>
      </div>

      <div className="countdown-timer">
        <div className="time-block">
          <span className="time-value">{formatNumber(timeLeft.days)}</span>
          <span className="time-label">{t('days')}</span>
        </div>
        <span className="time-separator">✦</span>
        <div className="time-block">
          <span className="time-value">{formatNumber(timeLeft.hours)}</span>
          <span className="time-label">{t('hours')}</span>
        </div>
        <span className="time-separator">✦</span>
        <div className="time-block">
          <span className="time-value">{formatNumber(timeLeft.minutes)}</span>
          <span className="time-label">{t('minutes')}</span>
        </div>
        <span className="time-separator">✦</span>
        <div className="time-block">
          <span className="time-value">{formatNumber(timeLeft.seconds)}</span>
          <span className="time-label">{t('seconds')}</span>
        </div>
      </div>


    </div>
  );
}
