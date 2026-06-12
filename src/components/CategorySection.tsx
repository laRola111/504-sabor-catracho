'use client';

import Image from 'next/image';
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

/* ── Wave Dividers ─────────────────────────────── */
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

/* ── Baleadas: text-only list (no images) ────────── */
function BaleadasList({ category }: { category: MenuCategory }) {
  const { t, lang } = useLanguage();
  return (
    <ul className="baleadas-list" role="list" aria-label={t(category.name)}>
      {category.items.map((item) => (
        <li key={item.id} className="baleadas-list__item" role="listitem">
          <div className="baleadas-list__info">
            <span className="baleadas-list__name">{t(item.name)}</span>
            {item.description && (
              <span className="baleadas-list__desc">{t(item.description)}</span>
            )}
          </div>
          <span className="baleadas-list__price">
            {item.price != null
              ? `$${item.price.toFixed(0)}`
              : (item.priceNote ? t(item.priceNote) : (lang === 'es' ? 'Consultar' : 'Ask'))}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── Bebidas: one image + list alongside ─────────── */
function BebidasLayout({ category }: { category: MenuCategory }) {
  const { t, lang } = useLanguage();

  // First item with an image is used as the hero image
  const heroImage = category.items.find((i) => i.image);
  // Separate refrescos (sodas) from jugos
  const jugos   = category.items.filter((i) => i.id !== 'sodas');
  const refrescos = category.items.filter((i) => i.id === 'sodas');

  return (
    <div className="bebidas-layout">
      {/* Jugos: image left, list right */}
      <div className="bebidas-jugos">
        {heroImage?.image && (
          <div className="bebidas-jugos__image-wrap">
            <Image
              src={heroImage.image}
              alt={lang === 'es' ? 'Jugos naturales' : 'Natural juices'}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="bebidas-jugos__image"
              loading="lazy"
            />
          </div>
        )}
        <ul className="bebidas-jugos__list" role="list">
          {jugos.map((item) => (
            <li key={item.id} className="bebidas-list__item" role="listitem">
              <div className="bebidas-list__info">
                <span className="bebidas-list__name">{t(item.name)}</span>
                {item.description && (
                  <span className="bebidas-list__desc">{t(item.description)}</span>
                )}
              </div>
              <span className="bebidas-list__price">
                {item.price != null ? `$${item.price.toFixed(0)}` : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Refrescos/Sodas row below */}
      {refrescos.map((item) => (
        <div key={item.id} className="bebidas-refrescos">
          <div className="bebidas-refrescos__image-wrap">
            {item.image && (
              <Image
                src={item.image}
                alt={t(item.name)}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="bebidas-jugos__image"
                loading="lazy"
              />
            )}
          </div>
          <div className="bebidas-refrescos__info">
            <span className="bebidas-list__name">{t(item.name)}</span>
            {item.description && (
              <span className="bebidas-list__desc">{t(item.description)}</span>
            )}
            <span className="bebidas-list__price" style={{ marginTop: 8 }}>
              {item.priceNote ? t(item.priceNote) : (lang === 'es' ? 'Consultar precio' : 'Ask for price')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Category Section ──────────────────────── */
export default function CategorySection({ category }: { category: MenuCategory }) {
  const { t } = useLanguage();

  const isDark = category.theme === 'dark';
  const isTeal = category.theme === 'teal';

  const sectionClass = [
    'menu-section',
    isDark ? 'menu-section--dark' : '',
    isTeal ? 'menu-section--teal' : '',
  ].filter(Boolean).join(' ');

  const isBaleadas = category.id === 'baleadas';
  const isBebidas  = category.id === 'bebidas';

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
            <div className="section-label" aria-hidden="true">
              {isDark || isTeal ? '● Menú' : '● Menú'}
            </div>

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

          {/* Items — different layout per category */}
          {isBaleadas ? (
            <BaleadasList category={category} />
          ) : isBebidas ? (
            <BebidasLayout category={category} />
          ) : (
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
          )}
        </div>
      </section>

      <WaveBottom dark={isDark} teal={isTeal} />
    </>
  );
}
