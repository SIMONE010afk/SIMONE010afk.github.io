import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Bot, Brain, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Facebook Hateful Memes - Multimodal Hate Speech Detection',
    description: 'Sistema di rilevamento di hate speech multimodale basato su deep learning e visione artificiale.',
    image: '/project-1.jpg',
    tags: ['Notebook', 'Google Colab', 'NLP', 'TensorFlow'],
    icon: Bot,
    link: '#',
    github: 'https://github.com/SIMONE010afk/Facebook-Hateful-Memes'
  },
  {
    id: 2,
    title: 'Sistema di Raccomandazione',
    description: 'Motore di raccomandazione basato su machine learning che analizza il comportamento degli utenti per suggerire prodotti e contenuti personalizzati in tempo reale.',
    image: '/project-2.jpg',
    tags: ['TensorFlow', 'PyTorch', 'Redis', 'AWS'],
    icon: Brain,
    link: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Chatbot Multilingue',
    description: 'Chatbot intelligente con supporto per 20+ lingue, capace di comprendere il contesto culturale e fornire risposte naturali e pertinenti.',
    image: '/project-3.jpg',
    tags: ['NLP', 'Transformers', 'Docker', 'Kubernetes'],
    icon: MessageSquare,
    link: '#',
    github: '#'
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
    setHoveredCard(null);
  };

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="py-24 bg-[#f7f9fa]"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-[#e6f7ff] text-[#0070a0] text-sm font-medium mb-4">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1f1f1f] mb-6">
              Progetti <span className="gradient-text">AI</span>
            </h2>
            <p className="text-lg text-[#33383f] max-w-2xl mx-auto">
              Alcuni dei miei progetti più significativi nel campo dell'intelligenza artificiale 
              e dello sviluppo di agenti.
            </p>
          </div>

          {/* Projects Grid */}
          <div 
            ref={cardsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: '1000px' }}
          >
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="project-card group relative"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-[#0070a0]/20 h-full">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f]/60 to-transparent" />
                      
                      {/* Icon badge */}
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-[#0070a0]" />
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#0070a0]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#1f1f1f] mb-3 group-hover:text-[#0070a0] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[#33383f] text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-[#e6f7ff] text-[#0070a0]"
                            style={{
                              animation: hoveredCard === project.id 
                                ? `popIn 0.3s ease-out ${index * 0.1}s both` 
                                : 'none'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-3">
                        <a 
                          href={project.link}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#0070a0] text-white text-sm font-medium hover:bg-[#004968] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                        <a 
                          href={project.github}
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#c2cdd8] text-[#33383f] text-sm font-medium hover:border-[#0070a0] hover:text-[#0070a0] transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
