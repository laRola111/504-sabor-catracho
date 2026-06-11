'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

/* ── Inline SVG Stars ────────────────────────────── */
function StarField() {
  const stars = [
    { x: '8%',  y: '15%', r: 5,  delay: '0s',   dur: '3.2s' },
    { x: '22%', y: '8%',  r: 3,  delay: '0.6s',  dur: '2.8s' },
    { x: '45%', y: '5%',  r: 6,  delay: '1.1s',  dur: '4s'   },
    { x: '68%', y: '12%', r: 4,  delay: '0.3s',  dur: '3.6s' },
    { x: '85%', y: '6%',  r: 7,  delay: '0.8s',  dur: '2.5s' },
    { x: '92%', y: '22%', r: 3,  delay: '1.5s',  dur: '3.8s' },
    { x: '5%',  y: '45%', r: 4,  delay: '2s',    dur: '3s'   },
    { x: '15%', y: '72%', r: 6,  delay: '0.4s',  dur: '4.2s' },
    { x: '78%', y: '55%', r: 5,  delay: '1.2s',  dur: '2.9s' },
    { x: '90%', y: '68%', r: 4,  delay: '0.7s',  dur: '3.4s' },
    { x: '30%', y: '88%', r: 3,  delay: '1.8s',  dur: '2.7s' },
    { x: '55%', y: '78%', r: 5,  delay: '0.2s',  dur: '3.9s' },
    { x: '72%', y: '90%', r: 4,  delay: '1.4s',  dur: '3.1s' },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <g key={i}>
          {/* 4-point star shape */}
          <path
            d={`M ${s.x} ${s.y} l 0 -${s.r * 0.6} l ${s.r * 0.25} ${s.r * 0.4} l ${s.r * 0.5} -${s.r * 0.15} l -${s.r * 0.35} ${s.r * 0.35} l ${s.r * 0.2} ${s.r * 0.55} l -${s.r * 0.4} -${s.r * 0.3} l -${s.r * 0.45} ${s.r * 0.3} l ${s.r * 0.2} -${s.r * 0.55} l -${s.r * 0.35} -${s.r * 0.35} l ${s.r * 0.5} ${s.r * 0.15} z`}
            fill="rgba(77,184,212,0.55)"
            style={{
              transformOrigin: `${s.x} ${s.y}`,
              animation: `twinkle ${s.dur} ${s.delay} ease-in-out infinite`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ── Golden Leaf SVG ─────────────────────────────── */
function GoldenLeaf({ className }: { className: string }) {
  return (
    <svg
      className={`hero__leaf ${className}`}
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      style={{ position: 'absolute', pointerEvents: 'none' }}
    >
      <path d="M10 150 Q30 80 80 60 Q60 110 30 140 Z" fill="#C8922A" opacity="0.5" />
      <path d="M20 155 Q50 90 100 70 Q75 125 40 150 Z" fill="#E8B84B" opacity="0.35" />
      <path d="M5 160 Q25 100 70 75 Q50 130 15 155 Z" fill="#C8922A" opacity="0.25" />
      <path d="M80 60 Q90 40 120 20 Q115 55 95 75 Z" fill="#E8B84B" opacity="0.4" />
      <path d="M85 65 Q105 45 135 25 Q128 60 105 78 Z" fill="#C8922A" opacity="0.3" />
    </svg>
  );
}

/* ── Hero Component ──────────────────────────────── */
export default function HeroSection() {
  const { lang } = useLanguage();

  const bienvenidos = lang === 'es' ? 'BIENVENIDOS' : 'WELCOME';
  const subtitulo   = lang === 'es'
    ? 'Auténtica Comida Hondureña'
    : 'Authentic Honduran Cuisine';
  const tagline     = lang === 'es'
    ? 'Tradición y Sabor desde Austin, TX'
    : 'Tradition & Flavor from Austin, TX';
  const scrollHint  = lang === 'es' ? 'Ver menú' : 'See menu';

  return (
    <section className="hero" aria-label={lang === 'es' ? 'Sección principal' : 'Hero section'}>
      {/* Star background */}
      <div className="hero__bg-stars" aria-hidden="true">
        <StarField />
      </div>

      {/* Golden leaves */}
      <GoldenLeaf className="hero__leaf--tl" />
      <GoldenLeaf className="hero__leaf--tr" />
      <GoldenLeaf className="hero__leaf--bl" />
      <GoldenLeaf className="hero__leaf--br" />

      {/* Content */}
      <div className="hero__content">
        <Image
          src="/logo-504-catracha.png"
          alt="504 Sabor Catracho"
          width={320}
          height={320}
          className="hero__logo"
          priority
          style={{ width: 'min(300px, 72vw)', height: 'auto' }}
        />

        <div className="hero__badges">
          <div className="hero__badge">
            <div className="hero__badge-main">{bienvenidos}</div>
            <div className="hero__badge-sub">{subtitulo}</div>
          </div>
        </div>

        <p className="hero__tagline">{tagline}</p>

        <div className="hero__address">
          <span aria-hidden="true">📍</span>
          <a
            href="https://maps.google.com/?q=907+Kramer+Ln+Austin+TX+78758"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >
            907 Kramer Ln, Austin, TX 78758
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span style={{ fontSize: 20 }}>↓</span>
        <span>{scrollHint}</span>
      </div>
    </section>
  );
}
