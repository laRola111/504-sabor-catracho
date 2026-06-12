'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';

/* ── 5-Point Star Field ──────────────────────────── */
/* Matches physical menu: white/blue 5-pointed stars, various sizes, asymmetric */
const STAR_DATA = [
  { cx: 8,  cy: 14, r: 6,  op: 0.9,  delay: '0s',    dur: '3.2s', color: 'rgba(255,255,255,0.95)' },
  { cx: 22, cy: 7,  r: 3.5,op: 0.7,  delay: '0.6s',  dur: '2.8s', color: 'rgba(91,155,213,0.8)' },
  { cx: 46, cy: 4,  r: 7,  op: 1,    delay: '1.1s',  dur: '4s',   color: 'rgba(255,255,255,0.9)' },
  { cx: 68, cy: 10, r: 4.5,op: 0.8,  delay: '0.3s',  dur: '3.6s', color: 'rgba(91,155,213,0.85)' },
  { cx: 85, cy: 5,  r: 8,  op: 0.95, delay: '0.8s',  dur: '2.5s', color: 'rgba(255,255,255,0.9)' },
  { cx: 93, cy: 20, r: 4,  op: 0.6,  delay: '1.5s',  dur: '3.8s', color: 'rgba(168,204,234,0.9)' },
  { cx: 4,  cy: 44, r: 5,  op: 0.75, delay: '2s',    dur: '3s',   color: 'rgba(255,255,255,0.8)' },
  { cx: 14, cy: 70, r: 7,  op: 0.6,  delay: '0.4s',  dur: '4.2s', color: 'rgba(91,155,213,0.7)' },
  { cx: 80, cy: 52, r: 5.5,op: 0.85, delay: '1.2s',  dur: '2.9s', color: 'rgba(255,255,255,0.9)' },
  { cx: 91, cy: 66, r: 4,  op: 0.65, delay: '0.7s',  dur: '3.4s', color: 'rgba(168,204,234,0.8)' },
  { cx: 32, cy: 88, r: 3.5,op: 0.7,  delay: '1.8s',  dur: '2.7s', color: 'rgba(255,255,255,0.7)' },
  { cx: 56, cy: 76, r: 6,  op: 0.8,  delay: '0.2s',  dur: '3.9s', color: 'rgba(91,155,213,0.8)' },
  { cx: 73, cy: 89, r: 4.5,op: 0.75, delay: '1.4s',  dur: '3.1s', color: 'rgba(255,255,255,0.85)' },
  { cx: 50, cy: 92, r: 3,  op: 0.5,  delay: '2.2s',  dur: '2.6s', color: 'rgba(168,204,234,0.7)' },
];

/* Draw a proper 5-point star shape via polygon */
function starPoints(cx: number, cy: number, outerR: number): string {
  const inner = outerR * 0.4;
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : inner;
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return points.join(' ');
}

function StarField() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {STAR_DATA.map((s, i) => (
        <polygon
          key={i}
          points={starPoints(s.cx, s.cy, s.r)}
          fill={s.color}
          opacity={s.op}
          style={{
            transformOrigin: `${s.cx}% ${s.cy}%`,
            animation: `twinkle ${s.dur} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </svg>
  );
}

/* ── Botanical Leaf (gold, like physical menu corners) */
function GoldenLeaf({ className }: { className: string }) {
  return (
    <svg
      className={`hero__leaf ${className}`}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      {/* Main stem */}
      <path d="M30 180 Q60 130 100 100 Q80 140 50 170 Z" fill="#C8921A" opacity="0.55" />
      <path d="M40 185 Q75 135 115 105 Q90 150 55 180 Z" fill="#E0A830" opacity="0.4" />
      {/* Branch leaves */}
      <path d="M100 100 Q130 75 160 50 Q148 85 120 100 Z" fill="#D4A020" opacity="0.5" />
      <path d="M105 108 Q140 80 170 55 Q158 92 128 108 Z" fill="#C8921A" opacity="0.38" />
      <path d="M95 95  Q120 65 150 40 Q138 75 110 93 Z"  fill="#E8B840" opacity="0.45" />
      {/* Small branch */}
      <path d="M85 115 Q75 85  55  60 Q72 90  80 118 Z"  fill="#D4A020" opacity="0.35" />
      {/* Berries */}
      <circle cx="160" cy="48" r="6" fill="#C8921A" opacity="0.65" />
      <circle cx="168" cy="42" r="4" fill="#E0A830" opacity="0.55" />
      <circle cx="153" cy="44" r="3.5" fill="#C8921A" opacity="0.5" />
    </svg>
  );
}

/* ── Hero Component ──────────────────────────────── */
export default function HeroSection() {
  const { lang } = useLanguage();
  const logoWrapRef = useRef<HTMLDivElement>(null);

  /* Switch from entrance animation → idle float once entrance finishes */
  useEffect(() => {
    const el = logoWrapRef.current;
    if (!el) return;
    // entrance duration = 1.35s delay 0.15s = 1.5s total + small buffer
    const timer = setTimeout(() => {
      el.classList.add('entrance-done');
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  const bienvenidos = lang === 'es' ? 'BIENVENIDOS' : 'WELCOME';
  const subtitulo   = lang === 'es'
    ? 'Auténtica Comida Hondureña'
    : 'Authentic Honduran Cuisine';
  const tagline     = lang === 'es'
    ? 'Tradición y Sabor • Austin, TX'
    : 'Tradition & Flavor • Austin, TX';
  const scrollHint  = lang === 'es' ? 'Ver menú' : 'See menu';

  /* 8 particles evenly distributed in a radial burst */
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 2 * Math.PI;
    const dist  = 90 + Math.random() * 50;
    return {
      tx: `${Math.cos(angle) * dist}px`,
      ty: `${Math.sin(angle) * dist}px`,
      delay: `${0.55 + i * 0.055}s`,
      color: i % 2 === 0 ? 'rgba(91,155,213,0.9)' : 'rgba(255,255,255,0.9)',
    };
  });

  return (
    <section className="hero" aria-label={lang === 'es' ? 'Sección principal' : 'Hero section'}>
      {/* Star background */}
      <div className="hero__bg-stars" aria-hidden="true">
        <StarField />
      </div>

      {/* Gold botanical leaves at corners */}
      <GoldenLeaf className="hero__leaf--tl" />
      <GoldenLeaf className="hero__leaf--tr" />
      <GoldenLeaf className="hero__leaf--bl" />
      <GoldenLeaf className="hero__leaf--br" />

      {/* Content */}
      <div className="hero__content">

        {/* ── Logo with entrance animation ── */}
        <div className="hero__logo-wrap" ref={logoWrapRef} aria-hidden="false">
          {/* Radial glow ring */}
          <div className="hero__logo-ring" aria-hidden="true" />

          {/* Particle burst */}
          {particles.map((p, i) => (
            <div
              key={i}
              className="hero__logo-particle"
              aria-hidden="true"
              style={{
                ['--tx' as string]: p.tx,
                ['--ty' as string]: p.ty,
                background: p.color,
                animationDelay: p.delay,
                boxShadow: `0 0 6px 2px ${p.color}`,
              }}
            />
          ))}

          <Image
            src="/logo-504-catracha.png"
            alt="504 Sabor Catracho — Auténtica Comida Hondureña"
            width={320}
            height={320}
            className="hero__logo"
            priority
            style={{ width: 'min(300px, 72vw)', height: 'auto' }}
          />
        </div>

        {/* BIENVENIDOS / WELCOME pill — matches physical menu */}
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
          <span aria-hidden="true" style={{ opacity: 0.6 }}>·</span>
          <a href="tel:+15127830737" style={{ color: 'inherit' }}>
            (512) 783-0737
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span style={{ fontSize: 22 }}>↓</span>
        <span>{scrollHint}</span>
      </div>
    </section>
  );
}
