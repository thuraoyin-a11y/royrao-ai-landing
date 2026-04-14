import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  once?: boolean;
}

export default function RevealText({
  children,
  className = '',
  delay = 0,
  as: Tag = 'p',
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const split = new SplitType(el, { types: 'words' });

    const words = split.words;
    if (!words || words.length === 0) return;

    gsap.set(words, {
      opacity: 0,
      filter: 'blur(10px)',
      y: 10,
    });

    const tween = gsap.to(words, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power2.out',
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        onEnter: () => {},
      },
    });

    if (tween.scrollTrigger) {
      triggersRef.current.push(tween.scrollTrigger);
    }

    return () => {
      triggersRef.current.forEach((st) => st.kill());
      triggersRef.current = [];
      split.revert();
    };
  }, [children, delay, once]);

  return <Tag ref={ref as any} className={className}>{children}</Tag>;
}
