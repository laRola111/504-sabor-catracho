'use client';

import Image from 'next/image';
import { MenuItem } from '@/lib/menu-data';
import { useLanguage } from '@/lib/i18n';

/* Emoji fallback per category */
const CATEGORY_EMOJI: Record<string, string> = {
  desayunos:       '🍳',
  baleadas:        '🫓',
  tajadas:         '🍗',
  'mariscos-carnes': '🐟',
  sopas:           '🍲',
  bebidas:         '🥤',
};

interface MenuCardProps {
  item: MenuItem;
  categoryId: string;
  dark?: boolean;
}

export default function MenuCard({ item, categoryId, dark = false }: MenuCardProps) {
  const { t, lang } = useLanguage();
  const emoji = CATEGORY_EMOJI[categoryId] ?? '🍽️';

  /* Show real image when available */
  const hasImage = !!item.image;

  return (
    <article
      className={`menu-card${item.featured ? ' menu-card--featured' : ''}`}
      aria-label={t(item.name)}
    >
      {/* ── Image / Emoji Placeholder ── */}
      <div className="menu-card__image-wrap">
        {hasImage && item.image ? (
          <Image
            src={item.image}
            alt={t(item.name)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="menu-card__image"
            loading="lazy"
          />
        ) : (
          <div className="menu-card__placeholder" role="img" aria-label={t(item.name)}>
            {emoji}
          </div>
        )}

        {/* Featured badge — gold like physical menu highlighted items */}
        {item.featured && (
          <span
            className="menu-card__featured-badge"
            aria-label={lang === 'es' ? 'Destacado' : 'Featured'}
          >
            ⭐ {lang === 'es' ? 'Destacado' : 'Featured'}
          </span>
        )}
      </div>

      {/* ── Card Body ── */}
      <div className="menu-card__body">
        <h3 className="menu-card__name">{t(item.name)}</h3>

        {item.description && (
          <p className="menu-card__desc">{t(item.description)}</p>
        )}

        {/* Footer: price — matches physical menu dotted price pattern */}
        <div className="menu-card__footer">
          {item.price !== null && item.price !== undefined ? (
            <div>
              <span className="menu-card__price">${item.price.toFixed(0)}</span>
              {item.priceNote && (
                <div className="menu-card__price-note">{t(item.priceNote)}</div>
              )}
            </div>
          ) : (
            <span className="menu-card__price-ask">
              {item.priceNote
                ? t(item.priceNote)
                : lang === 'es' ? 'Consultar precio' : 'Ask for price'}
            </span>
          )}

          {/* Category icon chip */}
          <span
            style={{
              fontSize: 22,
              opacity: 0.6,
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            {emoji}
          </span>
        </div>
      </div>
    </article>
  );
}
