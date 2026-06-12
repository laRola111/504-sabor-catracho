'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // After 1.2s, start fading out
    const fadeTimer = setTimeout(() => setHiding(true), 1200);
    // After 1.9s, remove from DOM completely
    const hideTimer = setTimeout(() => setVisible(false), 1900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #A8CCEA 0%, #2563B0 50%, #1B4F8A 100%)',
        opacity: hiding ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: 'none',
      }}
    >
      <Image
        src="/logo-504-catracha.png"
        alt="504 Sabor Catracho"
        width={280}
        height={280}
        priority
        style={{
          width: 'min(260px, 65vw)',
          height: 'auto',
          opacity: hiding ? 0 : 1,
          transform: hiding ? 'scale(0.92)' : 'scale(1)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.25))',
        }}
      />
    </div>
  );
}
