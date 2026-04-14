import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Demo() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // Lazy load iframe
  useEffect(() => {
    if (!iframeContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIframeLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '500px' }
    );
    observer.observe(iframeContainerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

return (
  <section
    ref={sectionRef}
    id="demo"
    className="relative w-full overflow-hidden bg-[#FAFAFA] py-24 md:py-32"
  >
    {/* 标题区域 */}
    <div className="px-6">
      <div className="mx-auto max-w-7xl">
        <span className="mb-2 inline-block text-sm font-semibold tracking-widest text-[#2563EB]">
          {t('demo.sectionTitle')}
        </span>
        <h2 className="text-3xl font-semibold text-[#111111] md:text-4xl">
          {t('demo.sectionSubtitle')}
        </h2>
        <p className="mt-2 max-w-2xl text-[#666666]">
          {t('demo.sectionDesc')}
        </p>
      </div>
    </div>

    {/* 卡片区域 - 纵向堆叠 */}
    <div className="mx-auto mt-12 max-w-7xl px-6">
      <div className="flex flex-col gap-8">
        
        {/* Card 1: TOEFL Demo - 全宽展示 */}
        <div className="mx-auto w-full max-w-4xl rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-lg md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {t('demo.card1Status1')}
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-[#2563EB]">
                {t('demo.card1Status2')}
              </span>
            </div>
            <span className="text-xs text-[#999999]">{t('demo.card1Stack')}</span>
          </div>

          {/* 浏览器框 */}
          <div
            ref={iframeContainerRef}
            className="relative overflow-hidden rounded-xl border border-[#E5E5E5] bg-white"
            style={{ height: '400px' }}
          >
            <div className="flex h-11 items-center gap-2 border-b border-[#E5E5E5] bg-[#F9FAFB] px-4">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="mx-4 flex-1 rounded-md bg-white px-3 py-1 text-center text-xs text-[#999999]">
                toefl-demo.vercel.app
              </div>
            </div>
            <div className="h-[359px] w-full">
              {iframeLoaded ? (
                <iframe
                  src="https://你的-vercel-域名.vercel.app"  // ← 记得换成你的 Vercel 地址
                  title="TOEFL Demo"
                  className="h-full w-full"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#999999]">
                  Loading demo...
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-[#111111]">{t('demo.card1Title')}</h3>
            <p className="mt-2 text-[#666666]">{t('demo.card1Desc')}</p>
            <a
              href="https://你的-vercel-域名.vercel.app"  // ← 记得换成你的 Vercel 地址
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-full bg-[#2563EB] px-6 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              {t('demo.card1Cta')}
            </a>
          </div>
        </div>

        {/* Card 2 & 3 - 双列网格 */}
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Card 2: Coming Soon */}
          <div className="flex flex-col justify-center rounded-2xl border border-[#E5E5E5] bg-[#F3F4F6] p-8 text-center transition-all duration-500 hover:bg-[#E5E7EB] md:p-12">
            <h3 className="text-xl font-semibold text-[#666666]">{t('demo.card2Title')}</h3>
            <p className="mt-3 text-sm text-[#999999]">{t('demo.card2Hint')}</p>
          </div>

          {/* Card 3: CTA */}
          <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] p-8 text-white transition-transform duration-500 hover:scale-[1.02] md:p-12">
            <h3 className="text-2xl font-semibold">{t('demo.card3Title')}</h3>
            <p className="mt-3 text-white/90">{t('demo.card3Desc')}</p>
            <button
              onClick={scrollToContact}
              className="mt-6 self-start rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#2563EB] transition-transform hover:scale-105"
            >
              {t('demo.card3Cta')}
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
);
