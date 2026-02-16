import { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../lib/language';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: 0.6, ease: 'power2.out' }
      );

      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)', scale: 1.2 },
        { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.8, ease: 'back.out(1.7)' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const title = language === 'it' ? 'Data Analyst e         AI Specialist' : 'Data Analyst and   AI Specialist';
  const titleChars = title.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen w-full flex items-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f9fbfc 0%, #eefbff 50%, #d8ecf8 100%)',
      }}
    >
      {/* decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0070a0]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#2c90c9]/5 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#1b9cca]/5 rounded-full blur-3xl animate-float animation-delay-400" />
      </div>

      <div className="w-full section-padding py-20 lg:py-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* LEFT - CONTENT */}
            <div className="relative z-10 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#c2cdd8] mb-6 animate-fade-in">
                <Sparkles className="w-4 h-4 text-[#0070a0]" />
                <span className="text-sm font-medium text-[#33383f]">
                  {language === 'it' ? 'Disponibile per collaborazioni' : 'Available for collaborations'}
                </span>
              </div>

              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#1f1f1f] leading-tight mb-6 overflow-hidden"
              >
                {titleChars}
              </h1>

              <p
                ref={subtitleRef}
                className="text-lg sm:text-xl text-[#33383f] mb-8 max-w-xl leading-relaxed"
              >
                {language === 'it'
                  ? 'Unisco formazione scientifica, matematica e machine learning per costruire modelli utili su problemi reali.'
                  : 'I combine scientific training, mathematics and machine learning to build useful models for real-world problems.'}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  ref={buttonRef}
                  onClick={scrollToProjects}
                  className="btn-primary flex items-center gap-2 text-lg"
                >
                  {language === 'it' ? 'Scopri i miei progetti' : 'See my projects'}
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* RIGHT - IMAGE */}
            <div className="relative order-1 lg:order-2">
              <div
                ref={imageRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ clipPath: 'inset(0 100% 0 0)' }}
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-[#0070a0] to-[#2c90c9] rounded-3xl -z-10 opacity-20" />
                <img
                  src="/Cropped.jpg"
                  alt="Simone Torrengo"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0070a0] to-[#2c90c9] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1f1f1f]">
                      {language === 'it' ? 'Data Analyst e AI Specialist' : 'Data Analyst and AI Specialist'}
                    </div>
                    <div className="text-sm text-[#33383f]">
                      {language === 'it' ? 'Certificato' : 'Certified'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
