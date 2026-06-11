'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

function FooterStars() {
  // 5-point star polygon helper
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

  const stars = [
    { cx: 8,  cy: 25, r: 10, delay: '0s',   color: 'rgba(91,155,213,0.6)' },
    { cx: 85, cy: 20, r: 8,  delay: '0.8s', color: 'rgba(255,255,255,0.45)' },
    { cx: 20, cy: 70, r: 6,  delay: '1.5s', color: 'rgba(91,155,213,0.5)' },
    { cx: 90, cy: 65, r: 12, delay: '0.4s', color: 'rgba(255,255,255,0.4)' },
    { cx: 45, cy: 15, r: 7,  delay: '1.1s', color: 'rgba(168,204,234,0.55)' },
    { cx: 60, cy: 80, r: 9,  delay: '2.0s', color: 'rgba(255,255,255,0.35)' },
  ];

  return (
    <div className="footer__stars" aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {stars.map((s, i) => (
          <polygon
            key={i}
            points={starPoints(s.cx, s.cy, s.r)}
            fill={s.color}
            style={{
              transformOrigin: `${s.cx}% ${s.cy}%`,
              animation: `twinkle ${2.5 + i * 0.5}s ${s.delay} ease-in-out infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="footer" role="contentinfo">
      <FooterStars />

      <div className="container">
        <div className="footer__content">
          {/* Brand */}
          <div className="footer__logo">
            <Image
              src="/logo-504-catracha.png"
              alt="504 Sabor Catracho"
              width={160}
              height={70}
              style={{ height: 70, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
            />
            <p className="footer__tagline">
              {lang === 'es'
                ? 'Auténtica Comida Hondureña\nTradición y Sabor'
                : 'Authentic Honduran Cuisine\nTradition & Flavor'}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer__section-title">
              {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
            </h3>
            <div className="footer__info">
              {/* Address */}
              <div className="footer__info-item footer__info-item--center">
                <span className="footer__info-icon" aria-hidden="true">📍</span>
                <a
                  href="https://maps.google.com/?q=907+Kramer+Ln+Austin+TX+78758"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link"
                  aria-label="Open in Google Maps"
                >
                  907 Kramer Ln<br />Austin, TX 78758
                </a>
              </div>

              {/* Phone */}
              <div className="footer__info-item footer__info-item--center">
                <span className="footer__info-icon" aria-hidden="true">📞</span>
                <a
                  id="footer-phone-btn"
                  href="tel:+15127830737"
                  className="footer__cta-btn"
                  aria-label="Call 504 Sabor Catracho"
                >
                  <span aria-hidden="true">📱</span>
                  (512) 783-0737
                </a>
              </div>
            </div>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="footer__section-title">
              {lang === 'es' ? 'Síguenos' : 'Follow Us'}
            </h3>

            <div className="footer__info" style={{ marginBottom: 20 }}>
              <div className="footer__info-item footer__info-item--center">
                <span className="footer__info-icon" aria-hidden="true">🕐</span>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>
                  {lang === 'es'
                    ? 'Sopas: Solo Domingos\nMenú completo todos los días'
                    : 'Soups: Sundays Only\nFull menu available daily'}
                </span>
              </div>
            </div>

            <div className="footer__social" role="list" aria-label={lang === 'es' ? 'Redes sociales' : 'Social media'}>
              {/* Facebook */}
              <a
                id="footer-facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Facebook"
                role="listitem"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                id="footer-instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
                role="listitem"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Maps */}
              <a
                id="footer-maps"
                href="https://maps.google.com/?q=907+Kramer+Ln+Austin+TX+78758"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Google Maps"
                role="listitem"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} 504 Sabor Catracho.{' '}
            {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}{' '}
            <span aria-hidden="true">🇭🇳</span>{' '}
            {lang === 'es' ? 'Hecho con amor en Austin, TX' : 'Made with love in Austin, TX'}
          </p>
        </div>
      </div>
    </footer>
  );
}
