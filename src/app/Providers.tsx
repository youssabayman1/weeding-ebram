'use client';

import React from 'react';
import { LanguageProvider } from '@/frontend_lib/context/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
