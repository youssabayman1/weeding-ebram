'use client';

import React, { useState, useEffect } from 'react';

export default function RSVPForm() {
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
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
      setErrorMessage('Please let us know if you will attend.');
      return;
    }
    if (!fullName.trim() || !signature.trim()) {
      setErrorMessage('Please fill out all required fields.');
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
        <h3>Thank you!</h3>
        <p>Your RSVP has been successfully received.</p>
        <p className="rsvp-success-signature">{signature}</p>
      </div>
    );
  }

  return (
    <div className="rsvp-form-container">
      <div className="rsvp-header">
        <h2>Confirm your attendance</h2>
        <p>We hope to count on you</p>
      </div>

      <form onSubmit={handleSubmit} className="rsvp-form">
        <div className="form-group">
          <label htmlFor="fullName">Full name *</label>
          <input
            type="text"
            id="fullName"
            className="rsvp-input"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group attending-group">
          <label>Will you attend?</label>
          <div className="attending-options">
            <button
              type="button"
              className={`attending-btn ${attending === true ? 'selected yes' : ''}`}
              onClick={() => setAttending(true)}
            >
              Yes, I'll be there! 🎉
            </button>
            <button
              type="button"
              className={`attending-btn ${attending === false ? 'selected no' : ''}`}
              onClick={() => setAttending(false)}
            >
              Sorry, I can't make it 😢
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message for the couple</label>
          <textarea
            id="message"
            className="rsvp-textarea"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="signature">Signature *</label>
          <input
            type="text"
            id="signature"
            className="rsvp-input signature-input"
            placeholder="Sign your name"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            required
          />
          <small className="signature-hint">Type your name to sign the guestbook</small>
        </div>

        {errorMessage && <div className="rsvp-error">{errorMessage}</div>}

        <button
          type="submit"
          className={`rsvp-submit-btn ${status === 'loading' ? 'loading' : ''}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Send confirmation'}
        </button>
      </form>
    </div>
  );
}
