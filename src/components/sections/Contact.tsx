import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Particle network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.reveal-item'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#1E3A8A] px-6 py-24 text-white md:py-32"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        <h2 className="reveal-item text-3xl font-semibold leading-tight md:text-4xl lg:text-[52px]">
          {t('contact.title')}
        </h2>
        <p className="reveal-item mt-4 max-w-2xl text-base text-white/80 md:text-lg">
          {t('contact.subtitle')}
        </p>
        <p
          className="reveal-item mt-6 text-lg font-medium tracking-wider text-white/90 md:text-xl"
          style={{ letterSpacing: '0.05em' }}
        >
          {t('contact.slogan')}
        </p>

        <div className="reveal-item mt-12 flex w-full max-w-3xl flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
          {/* WeChat QR */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-44 w-44 overflow-hidden rounded-xl border-4 border-white bg-white">
              <img
                src="/wechat-qr.png"
                alt="WeChat QR"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="flex items-center gap-2 text-sm font-medium">
              <MessageCircle size={16} />
              {t('contact.wechatLabel')}
            </span>
          </div>

          {/* Official Account + Email */}
          <div className="flex flex-col items-center gap-5 md:items-start">
            <div className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-sm">
              <MessageCircle size={16} />
              <span>
                {t('contact.mpLabel')}: {t('contact.mpName')}
              </span>
            </div>

            <a
              href={`mailto:${t('contact.email')}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white px-6 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-[#1E3A8A]"
            >
              <Mail size={16} />
              {t('contact.emailCta')}
            </a>
            <span className="text-sm text-white/70">{t('contact.email')}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="reveal-item relative z-10 mx-auto w-full max-w-5xl border-t border-white/20 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-white/70">{t('contact.footer.copyright')}</p>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <span>{t('contact.footer.icp')}</span>
            <a href="#" className="transition-opacity hover:text-white">
              {t('contact.footer.privacy')}
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
