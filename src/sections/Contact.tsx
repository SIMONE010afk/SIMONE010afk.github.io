import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Linkedin, Github, Twitter, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'simone.torrengo@gmail.com', href: 'mailto:simone.torrengo@gmail.com' },
    { icon: Phone, label: 'Telefono', value: '+39 123 456 7890', href: 'tel:+391234567890' },
    { icon: MapPin, label: 'Location', value: 'Torino, Italia', href: '#' },
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/simone-torrengo' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/SIMONE010afk' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="py-24 bg-[#f7f9fa] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0070a0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2c90c9]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-[#e6f7ff] text-[#0070a0] text-sm font-medium mb-4">
              Contatti
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1f1f1f] mb-6">
              Sei interessato? <span className="gradient-text">Scrivimi</span>
            </h2>

          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side - Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-[#1f1f1f] mb-6">
                  Informazioni di contatto
                </h3>
                <p className="text-[#33383f] mb-8">
                  Scegli il modo più comodo per contattarmi. Rispondo sempre 
                  entro 24 ore durante i giorni lavorativi.
                </p>
              </div>

              {/* Contact details */}
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

              {/* Social links */}
              <div>
                <h4 className="font-semibold text-[#1f1f1f] mb-4">Seguimi su</h4>
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

            {/* Right side - Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-[#0070a0]/5 border border-[#dee5eb]">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1f1f1f] mb-2">
                    Messaggio inviato!
                  </h3>
                  <p className="text-[#33383f]">
                    Ti risponderò al più presto.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Il tuo nome"
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-[#f7f9fa] transition-all duration-300 outline-none ${
                          focusedField === 'name'
                            ? 'border-[#0070a0] bg-white shadow-lg shadow-[#0070a0]/10'
                            : 'border-[#dee5eb] hover:border-[#c2cdd8]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1f1f1f] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tua@email.com"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-[#f7f9fa] transition-all duration-300 outline-none ${
                          focusedField === 'email'
                            ? 'border-[#0070a0] bg-white shadow-lg shadow-[#0070a0]/10'
                            : 'border-[#dee5eb] hover:border-[#c2cdd8]'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f1f1f] mb-2">
                      Oggetto
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Di cosa hai bisogno?"
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-[#f7f9fa] transition-all duration-300 outline-none ${
                        focusedField === 'subject'
                          ? 'border-[#0070a0] bg-white shadow-lg shadow-[#0070a0]/10'
                          : 'border-[#dee5eb] hover:border-[#c2cdd8]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f1f1f] mb-2">
                      Messaggio
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Descrivi il tuo progetto..."
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-[#f7f9fa] transition-all duration-300 outline-none resize-none ${
                        focusedField === 'message'
                          ? 'border-[#0070a0] bg-white shadow-lg shadow-[#0070a0]/10'
                          : 'border-[#dee5eb] hover:border-[#c2cdd8]'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn-primary flex items-center justify-center gap-2 text-lg py-4 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Invia messaggio
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
