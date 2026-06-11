'use client';

import { MenuCategory } from '@/lib/menu-data';
import { useLanguage } from '@/lib/i18n';
import MenuCard from './MenuCard';

interface CategorySectionProps {
  category: MenuCategory;
}

/* ── Decorative inline stars for dark sections ─── */
function DarkStars() {
  return (
    <div className="section-stars" aria-hidden="true">
      {[
        { x: '5%',  y: '20%', s: 14 },
        { x: '92%', y: '15%', s: 10 },
        { x: '15%', y: '75%', s: 8  },
        { x: '80%', y: '80%', s: 12 },
        { x: '50%', y: '5%',  s: 7  },
        { x: '35%', y: '90%', s: 9  },
      ].map((star, i) => (
        <svg
          key={i}
          width={star.s}
          height={star.s}
          viewBox="0 0 24 24"
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            fill: 'rgba(77,184,212,0.6)',
            animation: `twinkle ${2.5 + i * 0.4}s ${i * 0.3}s ease-in-out infinite`,
          }}
        >
          <path d="M12 2l2.09 6.26L20 10l-5.91 4.28L15.18 22 12 18.27 8.82 22l1.09-7.72L4 10l5.91-1.74z" />
        </svg>
      ))}
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

/* ── Wave Dividers ───────────────────────────────── */
function WaveTop({ dark }: { dark: boolean }) {
  if (!dark) return null;
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#082535" />
      </svg>
    </div>
  );
}

function WaveBottom({ dark, teal }: { dark: boolean; teal: boolean }) {
  if (!dark && !teal) return null;
  const color = dark ? '#082535' : '#0E5470';
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  );
}

export default function CategorySection({ category }: CategorySectionProps) {
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
