import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setVisible(y > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: visible ? 0 : -100,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [visible]);

  const toggleLang = () => {
    const next = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(next);
    document.documentElement.lang = next;
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const logoSrc = i18n.language === 'zh' ? '/logo-cn.png' : '/logo-en.png';

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
      style={{ transform: 'translateY(-100%)' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={toggleLang}
          className="text-sm font-medium tracking-wide text-[#111111] transition-opacity hover:opacity-70"
          aria-label="Toggle language"
        >
          {i18n.language === 'zh' ? t('lang.en') : t('lang.zh')}
        </button>

        <a href="/" className="flex items-center justify-center">
          <img
            src={logoSrc}
            alt="Roy Rao AI"
            className="h-10 object-contain transition-opacity duration-300"
            style={{ willChange: 'transform' }}
            loading="eager"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/logo-en.png';
            }}
          />
        </a>

        <button
          onClick={scrollToContact}
          className="rounded-full bg-[#2563EB] px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
        >
          {t('nav.cta')}
        </button>
      </div>
    </nav>
  );
}
