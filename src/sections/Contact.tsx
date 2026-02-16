import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../lib/language';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'simone.torrengo1@gmail.com',
      href: 'mailto:simone.torrengo1@gmail.com',
    },
    {
      icon: MapPin,
      label: language === 'it' ? 'Posizione' : 'Location',
      value: language === 'it' ? 'Torino, Italia' : 'Turin, Italy',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/simone-torrengo' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/SIMONE010afk' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-[#f7f9fa] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0070a0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2c90c9]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <div ref={titleRef} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-[#e6f7ff] text-[#0070a0] text-sm font-medium mb-4">
              {language === 'it' ? 'Contatti' : 'Contact'}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1f1f1f] mb-6">
              {language === 'it' ? (
                <>
                  Restiamo in <span className="gradient-text">contatto</span>
                </>
              ) : (
                <>
                  Let&apos;s stay in <span className="gradient-text">touch</span>
                </>
              )}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-[#1f1f1f] mb-6">
                {language === 'it' ? 'Informazioni di contatto' : 'Contact information'}
              </h3>
              <p className="text-[#33383f] mb-8">
                {language === 'it'
                  ? 'Se vuoi collaborare su progetti data, analytics o machine learning, scrivimi pure.'
                  : 'If you want to collaborate on data, analytics or machine learning projects, write to me.'}
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#dee5eb] hover:border-[#0070a0] hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#e6f7ff] flex items-center justify-center group-hover:bg-[#0070a0] transition-colors">
                      <Icon className="w-5 h-5 text-[#0070a0] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm text-[#33383f]">{item.label}</div>
                      <div className="font-medium text-[#1f1f1f]">{item.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div>
              <h4 className="font-semibold text-[#1f1f1f] mb-4">
                {language === 'it' ? 'Seguimi su' : 'Follow me on'}
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 rounded-xl bg-white border border-[#dee5eb] flex items-center justify-center hover:border-[#0070a0] hover:bg-[#0070a0] group transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-[#33383f] group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
