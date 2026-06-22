'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/frontend_lib/context/LanguageContext';

export default function RSVPForm() {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestsCount, setGuestsCount] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check local storage to prevent multiple submissions
    if (typeof window !== 'undefined') {
      const hasRsvpd = localStorage.getItem('ebram_marina_rsvp_submitted');
      if (hasRsvpd === 'true') {
        const savedSignature = localStorage.getItem('ebram_marina_rsvp_signature');
        if (savedSignature) setSignature(savedSignature);
        setStatus('success');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null) {
      setErrorMessage(t('letUsKnow'));
      return;
    }
    if (!fullName.trim() || !signature.trim()) {
      setErrorMessage(t('fillRequired'));
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          attending,
          guestsCount,
          message,
          signature,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        if (typeof window !== 'undefined') {
          localStorage.setItem('ebram_marina_rsvp_submitted', 'true');
          localStorage.setItem('ebram_marina_rsvp_signature', signature);
        }
      } else {
        throw new Error(result.error || 'Failed to submit RSVP');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rsvp-success-message">
        <h3>{t('successMessage')}</h3>
        <p>{t('successDesc')}</p>
        <p className="rsvp-success-signature">{signature}</p>
      </div>
    );
  }

  return (
    <div className="rsvp-form-container">
      <div className="rsvp-header">
        <h2>{t('rsvpTitle')}</h2>
        <p>{t('rsvpSubtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="rsvp-form">
        <div className="form-group">
          <label htmlFor="fullName">{t('nameLabel')}</label>
          <input
            type="text"
            id="fullName"
            className="rsvp-input"
            placeholder={t('namePlaceholder')}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group attending-group">
          <label>{t('attendanceLabel')}</label>
          <div className="attending-options">
            <button
              type="button"
              className={`attending-btn ${attending === true ? 'selected yes' : ''}`}
              onClick={() => setAttending(true)}
            >
              {t('yes')}
            </button>
            <button
              type="button"
              className={`attending-btn ${attending === false ? 'selected no' : ''}`}
              onClick={() => setAttending(false)}
            >
              {t('no')}
            </button>
          </div>
        </div>

        {attending && (
          <div className="form-group">
            <label htmlFor="guestsCount">{t('guestsLabel')}</label>
            <select
              id="guestsCount"
              className="rsvp-input"
              value={guestsCount}
              onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
              required
            >
              <option value={0}>{t('guests0')}</option>
              <option value={1}>{t('guests1')}</option>
              <option value={2}>{t('guests2')}</option>
              <option value={3}>{t('guests3')}</option>
              <option value={4}>{t('guests4')}</option>
              <option value={5}>{t('guests5')}</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="message">{t('messageLabel')}</label>
          <textarea
            id="message"
            className="rsvp-textarea"
            placeholder={t('messagePlaceholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="signature">{t('signatureLabel')}</label>
          <input
            type="text"
            id="signature"
            className="rsvp-input signature-input"
            placeholder={t('signaturePlaceholder')}
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            required
          />
          <small className="signature-hint">{t('signatureHint')}</small>
        </div>

        {errorMessage && <div className="rsvp-error">{errorMessage}</div>}

        <button
          type="submit"
          className={`rsvp-submit-btn ${status === 'loading' ? 'loading' : ''}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? t('sending') : t('submit')}
        </button>
      </form>
    </div>
  );
}
