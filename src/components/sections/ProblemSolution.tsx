import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Building2, Plane, Bot, Workflow, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const challenges = [
  { icon: GraduationCap, titleKey: 'challenge1Title', descKey: 'challenge1Desc' },
  { icon: Building2, titleKey: 'challenge2Title', descKey: 'challenge2Desc' },
  { icon: Plane, titleKey: 'challenge3Title', descKey: 'challenge3Desc' },
];

const solutions = [
  { icon: Bot, titleKey: 'solution1Title', tagKey: 'solution1Tag', descKey: 'solution1Desc' },
  { icon: Workflow, titleKey: 'solution2Title', tagKey: 'solution2Tag', descKey: 'solution2Desc' },
  { icon: Headphones, titleKey: 'solution3Title', tagKey: 'solution3Tag', descKey: 'solution3Desc' },
];

export default function ProblemSolution() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const leftCardsRef = useRef<HTMLDivElement[]>([]);
  const rightCardsRef = useRef<HTMLDivElement[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Path draw animation
    if (pathRef.current && !prefersReducedMotion) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 1,
        onUpdate: (self) => {
          if (pathRef.current) {
            gsap.set(pathRef.current, { strokeDashoffset: length * (1 - self.progress) });
          }
        },
      });
      triggersRef.current.push(st);
    }

    // Left cards stagger
    if (leftCardsRef.current.length && !prefersReducedMotion) {
      gsap.fromTo(
        leftCardsRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Right cards stagger
    if (rightCardsRef.current.length && !prefersReducedMotion) {
      gsap.fromTo(
        rightCardsRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      triggersRef.current.forEach((st) => st.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem-solution"
      className="relative w-full px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
          {/* Central connecting curve - desktop only */}
          <svg
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-24 -translate-x-1/2 md:block lg:w-32"
            viewBox="0 0 100 600"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M 0 0 C 100 100, 0 200, 100 300 C 0 400, 100 500, 0 600"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#999999" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>

          {/* Left: Challenges */}
          <div className="flex flex-col gap-10">
            <h3 className="text-xl font-semibold text-[#999999]">{t('problemSolution.leftTitle')}</h3>
            {challenges.map((c, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) leftCardsRef.current[i] = el;
                }}
                className="rounded-2xl border border-[#E5E5E5] bg-white p-6 lg:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[#999999]">
                  <c.icon size={20} />
                </div>
                <h4 className="mb-2 text-lg font-semibold text-[#111111]">
                  {t(`problemSolution.${c.titleKey}`)}
                </h4>
                <p className="text-sm leading-relaxed text-[#666666] lg:text-base">
                  {t(`problemSolution.${c.descKey}`)}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Solutions */}
          <div className="flex flex-col gap-10 md:mt-16">
            <h3 className="text-xl font-semibold text-[#2563EB]">{t('problemSolution.rightTitle')}</h3>
            {solutions.map((s, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) rightCardsRef.current[i] = el;
                }}
                className="rounded-2xl border border-[#E5E5E5] bg-white p-6 lg:p-8"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                    <s.icon size={20} />
                  </div>
                  <span className="rounded-full bg-[#2563EB] px-3 py-1 text-xs font-medium text-white">
                    {t(`problemSolution.${s.tagKey}`)}
                  </span>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-[#111111]">
                  {t(`problemSolution.${s.titleKey}`)}
                </h4>
                <p className="text-sm leading-relaxed text-[#666666] lg:text-base">
                  {t(`problemSolution.${s.descKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-16 text-center md:mt-24">
          <p className="text-sm font-medium tracking-wide text-[#666666] md:text-base">
            {t('problemSolution.trust')}
          </p>
        </div>
      </div>
    </section>
  );
}
