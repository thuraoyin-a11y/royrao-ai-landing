import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<SVGSVGElement>(null);
  const lineRefs = useRef<SVGPathElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const sub1Ref = useRef<HTMLHeadingElement>(null);
  const sub2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Grid line drawing animation
    if (!prefersReducedMotion && lineRefs.current.length) {
      lineRefs.current.forEach((line) => {
        const length = line.getTotalLength?.() || 1000;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.2,
        });
      });
    }

    // Text reveals
    const reveal = (el: HTMLElement | null, delay = 0) => {
      if (!el) return;
      const split = new SplitType(el, { types: 'words' });
      const words = split.words || [];
      gsap.set(words, { opacity: 0, filter: 'blur(10px)', y: 10 });
      gsap.to(words, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power2.out',
        delay,
      });
    };

    reveal(title1Ref.current, 0.3);
    reveal(title2Ref.current, 0.5);
    if (i18n.language === 'zh') {
      reveal(sub1Ref.current, 0.7);
      reveal(sub2Ref.current, 0.9);
    }
    reveal(descRef.current, 1.1);

    // Scroll progress + scroll text fade
    if (progressRef.current && scrollTextRef.current) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
          if (scrollTextRef.current) {
            const opacity = Math.max(0, 0.6 - self.progress * 2);
            scrollTextRef.current.style.opacity = `${opacity}`;
          }
        },
      });
      triggersRef.current.push(st);
    }

    // Parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current || prefersReducedMotion) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      gsap.to(gridRef.current, { x: x * 0.5, y: y * 0.5, duration: 0.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      triggersRef.current.forEach((st) => st.kill());
      triggersRef.current = [];
    };
  }, [i18n.language]);

  const isZh = i18n.language === 'zh';

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
    >
      {/* Parallax Grid Background */}
      <svg
        ref={gridRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ willChange: 'transform' }}
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#E5E5E5"
              strokeWidth="1"
              ref={(el) => {
                if (el) {
                  const lines = lineRefs.current;
                  if (!lines.includes(el)) {
                    lines.push(el);
                  }
                }
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 max-w-5xl text-center">
        <h1
          ref={title1Ref}
          className="text-4xl font-semibold leading-tight tracking-tight text-[#111111] md:text-5xl lg:text-6xl xl:text-[64px]"
          style={{ lineHeight: 1.1 }}
        >
          {t('hero.title1')}
        </h1>
        <h1
          ref={title2Ref}
          className="mt-2 text-4xl font-semibold leading-tight tracking-tight text-[#111111] md:text-5xl lg:text-6xl xl:text-[64px]"
          style={{ lineHeight: 1.1 }}
        >
          {t('hero.title2')}
        </h1>

        {isZh && (
          <>
            <h2
              ref={sub1Ref}
              className="mt-6 text-3xl font-medium leading-tight text-[#111111] md:text-4xl lg:text-[48px]"
              style={{ lineHeight: 1.15 }}
            >
              {t('hero.subtitle1')}
            </h2>
            <h2
              ref={sub2Ref}
              className="mt-2 text-3xl font-medium leading-tight text-[#111111] md:text-4xl lg:text-[48px]"
              style={{ lineHeight: 1.15 }}
            >
              {t('hero.subtitle2')}
            </h2>
          </>
        )}

        <p
          ref={descRef}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[#666666] md:text-lg"
          style={{ lineHeight: isZh ? 1.6 : 1.5 }}
        >
          {t('hero.description')}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-3">
        <div
          ref={scrollTextRef}
          className="text-xs tracking-widest text-[#666666]"
          style={{ opacity: 0.6 }}
        >
          {t('hero.scroll')}
        </div>
        <div className="h-0.5 w-32 overflow-hidden rounded-full bg-[#E5E5E5]">
          <div ref={progressRef} className="h-full w-0 bg-[#2563EB]" />
        </div>
      </div>
    </section>
  );
}
