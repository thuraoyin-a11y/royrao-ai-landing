import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (avatarRef.current) {
      gsap.fromTo(
        avatarRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.2,
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const isZh = i18n.language === 'zh';

  return (
    <section ref={sectionRef} id="about" className="w-full px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16 lg:gap-24">
          {/* Avatar placeholder */}
          <div className="flex flex-shrink-0 flex-col items-center">
            <div
              ref={avatarRef}
              className="flex h-56 w-56 items-center justify-center rounded-full text-6xl font-semibold text-white md:h-72 md:w-72 lg:h-[280px] lg:w-[280px]"
              style={{
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                border: '4px solid white',
                boxShadow: '0 20px 40px rgba(37,99,235,0.2)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {isZh ? '罗' : 'R'}
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex-1">
            <span className="mb-2 inline-block text-sm font-semibold tracking-widest text-[#2563EB]">
              {t('about.sectionTag')}
            </span>
            <h2 className="text-2xl font-semibold leading-tight text-[#111111] md:text-3xl lg:text-4xl">
              {t('about.title')}
            </h2>
            <p className="mt-3 text-base font-medium text-[#666666]">{t('about.role')}</p>

            <div className="mt-8 flex flex-col gap-5 text-[#666666]" style={{ lineHeight: 1.7 }}>
              <p>{t('about.para1')}</p>
              <p>{t('about.para2')}</p>
              <p>{t('about.para3')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
