'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';
import { menuCategories } from '@/lib/menu-data';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    menuCategories.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo">
          <Image
            src="/logo-504-catracha.png"
            alt="504 Sabor Catracho"
            width={120}
            height={44}
            style={{ height: 44, width: 'auto' }}
            priority
          />
        </div>

        {/* Category Pills */}
        <div className="navbar__categories" role="tablist" aria-label="Menu categories">
          {menuCategories.map(({ id, name }) => (
            <button
              key={id}
              id={`nav-${id}`}
              role="tab"
              aria-selected={activeSection === id}
              className={`nav-pill${activeSection === id ? ' active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {t(name)}
            </button>
          ))}
        </div>

        {/* Language Toggle */}
        <div className="lang-toggle" role="group" aria-label="Language selector">
          <button
            id="lang-es"
            className={`lang-btn${lang === 'es' ? ' active' : ''}`}
            onClick={() => setLang('es')}
            aria-pressed={lang === 'es'}
          >
            ES
          </button>
          <button
            id="lang-en"
            className={`lang-btn${lang === 'en' ? ' active' : ''}`}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}
