'use client';

import React, { useEffect, useState } from 'react';

export default function WeddingParticles() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate random particles on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 8 + 4}px`, // 4px to 12px
      animationDuration: `${Math.random() * 10 + 10}s`, // 10s to 20s
      animationDelay: `${Math.random() * 15}s`,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.width,
            height: p.width, // keep it circular
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity,
          }}
        ></div>
      ))}
    </div>
  );
}
