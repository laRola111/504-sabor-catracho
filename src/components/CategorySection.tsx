'use client';

import { MenuCategory } from '@/lib/menu-data';
import { useLanguage } from '@/lib/i18n';
import MenuCard from './MenuCard';

/* ── 5-point star polygon helper ─────────────────── */
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

/* ── Decorative inline stars for dark/teal sections ─ */
/* Matches physical menu: white/light-blue 5-point stars scattered asymmetrically */
const SECTION_STARS = [
  { cx: 5,  cy: 20, r: 14, delay: '0s',   dur: '3.2s', color: 'rgba(255,255,255,0.6)' },
  { cx: 92, cy: 15, r: 10, delay: '0.8s', dur: '2.8s', color: 'rgba(168,204,234,0.7)' },
  { cx: 15, cy: 75, r: 8,  delay: '1.5s', dur: '4.0s', color: 'rgba(255,255,255,0.5)' },
  { cx: 82, cy: 80, r: 12, delay: '0.4s', dur: '3.6s', color: 'rgba(168,204,234,0.65)' },
  { cx: 50, cy: 5,  r: 7,  delay: '1.1s', dur: '2.5s', color: 'rgba(255,255,255,0.45)' },
  { cx: 36, cy: 90, r: 9,  delay: '2.0s', dur: '3.8s', color: 'rgba(168,204,234,0.55)' },
  { cx: 70, cy: 50, r: 6,  delay: '0.6s', dur: '3.3s', color: 'rgba(255,255,255,0.4)' },
];

function DarkStars() {
  const viewW = 1200;
  const viewH = 300;

  return (
    <div className="section-stars" aria-hidden="true">
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {SECTION_STARS.map((s, i) => {
          const x = (s.cx / 100) * viewW;
          const y = (s.cy / 100) * viewH;
          return (
            <polygon
              key={i}
              points={starPoints(x, y, s.r * 3)}
              fill={s.color}
              style={{
                transformOrigin: `${x}px ${y}px`,
                animation: `twinkle ${s.dur} ${s.delay} ease-in-out infinite`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ── Sunday-Only Badge ──────────────────────────── */
function SundayBadge({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
      <div className="badge-tag" role="note" aria-label={text}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </svg>
        {text}
      </div>
    </div>
  );
}

/* ── Wave Dividers — smooth transitions between sections */
function WaveTop({ dark }: { dark: boolean }) {
  if (!dark) return null;
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,28 C480,56 960,0 1440,28 L1440,0 L0,0 Z" fill="#0D2040" />
      </svg>
    </div>
  );
}

function WaveBottom({ dark, teal }: { dark: boolean; teal: boolean }) {
  if (!dark && !teal) return null;
  const color = dark ? '#0D2040' : '#2563B0';
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,28 C480,0 960,56 1440,28 L1440,56 L0,56 Z" fill={color} />
      </svg>
    </div>
  );
}

export default function CategorySection({ category }: { category: MenuCategory }) {
  const { t, lang } = useLanguage();

  const isDark = category.theme === 'dark';
  const isTeal = category.theme === 'teal';

  const sectionClass = [
    'menu-section',
    isDark ? 'menu-section--dark' : '',
    isTeal ? 'menu-section--teal' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <WaveTop dark={isDark || isTeal} />

      <section
        id={category.id}
        className={sectionClass}
        aria-label={t(category.name)}
      >
        {(isDark || isTeal) && <DarkStars />}

        <div className="container">
          {/* Section Header */}
          <header className="section-header">
            <div
              className="section-label"
              aria-hidden="true"
            >
              {lang === 'es' ? '● Menú' : '● Menu'}
            </div>

            {/* Sunday Only badge (Sopas) */}
            {category.badge && (
              <SundayBadge text={t(category.badge)} />
            )}

            <h2 className={`section-title${isDark || isTeal ? ' section-title--white' : ''}`}>
              {t(category.name)}
            </h2>

            {category.subtitle && (
              <p className={`section-subtitle${isDark || isTeal ? ' section-subtitle--white' : ''}`}>
                {t(category.subtitle)}
              </p>
            )}
          </header>

          {/* Items Grid */}
          <div className="menu-grid" role="list">
            {category.items.map((item) => (
              <div key={item.id} role="listitem">
                <MenuCard
                  item={item}
                  categoryId={category.id}
                  dark={isDark || isTeal}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveBottom dark={isDark} teal={isTeal} />
    </>
  );
}
