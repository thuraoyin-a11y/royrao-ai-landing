import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !cardsRef.current.length) return;

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    gsap.to(card, {
      rotateX,
      rotateY,
      translateY: -12,
      boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.25)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      translateY: 0,
      boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const cards = [
    {
      title: t('services.card1Title'),
      tag: t('services.card1Tag'),
      target: t('services.card1Target'),
      items: [
        t('services.card1Item1'),
        t('services.card1Item2'),
        t('services.card1Item3'),
        t('services.card1Item4'),
      ],
      deliverable: t('services.card1Deliverable'),
      offset: 0,
    },
    {
      title: t('services.card2Title'),
      tag: t('services.card2Tag'),
      target: t('services.card2Target'),
      items: [
        t('services.card2Item1'),
        t('services.card2Item2'),
        t('services.card2Item3'),
        t('services.card2Item4'),
      ],
      deliverable: t('services.card2Deliverable'),
      offset: 40,
    },
    {
      title: t('services.card3Title'),
      tag: t('services.card3Tag'),
      target: t('services.card3Target'),
      items: [
        t('services.card3Item1'),
        t('services.card3Item2'),
        t('services.card3Item3'),
        t('services.card3Item4'),
      ],
      deliverable: t('services.card3Deliverable'),
      offset: 0,
    },
  ];

  return (
    <section ref={sectionRef} id="services" className="w-full px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-3 inline-block text-sm font-semibold tracking-widest text-[#2563EB]">
            {t('services.sectionTag')}
          </span>
        </div>

        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: '1000px' }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className={`relative rounded-2xl border border-[#E5E5E5] bg-white p-6 lg:p-10 ${i === 1 ? 'lg:mt-10' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <span className="absolute right-4 top-4 rounded-full bg-[#2563EB] px-3 py-1 text-xs font-medium text-white">
                {card.tag}
              </span>
              <h3 className="mb-2 pr-20 text-xl font-semibold text-[#111111]">{card.title}</h3>
              <p className="mb-6 text-sm text-[#666666]">{card.target}</p>
              <ul className="mb-6 flex flex-col gap-3">
                {card.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#111111]">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-[#FAFAFA] p-4 text-sm font-medium text-[#2563EB]">
                {card.deliverable}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
