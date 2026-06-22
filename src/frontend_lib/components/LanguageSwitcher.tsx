'use client';

import React from 'react';
import { useLanguage } from '@/frontend_lib/context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === 'EN' ? 'AR' : 'EN');
  };

  return (
    <div
      onClick={handleToggle}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        background: '#1e293b', // Dark slate background matching the image
        borderRadius: '9999px',
        padding: '4px',
        cursor: 'pointer',
        width: '100px',
        height: '42px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Sliding white background */}
      <div
        style={{
          position: 'absolute',
          top: '4px',
          left: language === 'EN' ? '4px' : '52px',
          width: '44px',
          height: '34px',
          background: 'white',
          borderRadius: '9999px',
          transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
        }}
      />
      
      <div 
        style={{ 
          flex: 1, 
          textAlign: 'center', 
          position: 'relative',
          zIndex: 10, 
          color: language === 'EN' ? '#1e293b' : 'white', 
          fontWeight: '600', 
          fontSize: '14px',
          transition: 'color 0.3s'
        }}
      >
        EN
      </div>
      <div 
        style={{ 
          flex: 1, 
          textAlign: 'center', 
          position: 'relative',
          zIndex: 10, 
          color: language === 'AR' ? '#1e293b' : 'white', 
          fontWeight: '600', 
          fontSize: '14px',
          transition: 'color 0.3s'
        }}
      >
        عربي
      </div>
    </div>
  );
}

