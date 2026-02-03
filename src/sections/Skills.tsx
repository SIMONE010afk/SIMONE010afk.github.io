'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Brain, Code2, Database, Cloud, MessageSquare, Eye, Cpu, Layers,
  GitBranch, Terminal, BarChart3, Workflow, Cog, NotebookPen,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ---------- SKILLS & CATEGORIES ---------- */
const skills = [
  { name: 'Python', icon: Code2, level: 100, category: 'Linguaggi' },
  { name: 'JavaScript', icon: Code2, level: 60, category: 'Linguaggi' },
  { name: 'TypeScript', icon: Code2, level: 70, category: 'Linguaggi' },
  { name: 'SQL', icon: Database, level: 90, category: 'Linguaggi' },
  { name: 'C', icon: Code2, level: 70, category: 'Linguaggi' },
  { name: 'Rust', icon: Cog, level: 40, category: 'Linguaggi' },
  { name: 'TensorFlow', icon: Brain, level: 90, category: 'ML/AI' },
  { name: 'PyTorch', icon: Cpu, level: 90, category: 'ML/AI' },
  { name: 'NLP', icon: MessageSquare, level: 90, category: 'AI' },
  { name: 'Computer Vision', icon: Eye, level: 80, category: 'AI' },
  { name: 'Power BI', icon: BarChart3, level: 90, category: 'Analytics' },
  { name: 'Apache Airflow', icon: Workflow, level: 80, category: 'Orchestration' },
  { name: 'API Integration', icon: Layers, level: 70, category: 'Dev' },
  { name: 'Cloud Deployment', icon: Cloud, level: 80, category: 'DevOps' },
  { name: 'PostgreSQL', icon: Database, level: 70, category: 'Database' },
  { name: 'Git', icon: GitBranch, level: 100, category: 'Tools' },
  { name: 'Docker', icon: Terminal, level: 90, category: 'DevOps' },
  { name: 'Scikit-learn', icon: Brain, level: 90, category: 'ML/AI' },
  { name: 'RAG', icon: Eye, level: 80, category: 'AI' },
  { name: 'BigQuery', icon: Database, level: 90, category: 'Database' },
  { name: 'Google Colab', icon: NotebookPen, level: 100, category: 'Tools' },
  { name: 'Google Cloud Storage', icon: Cloud, level: 84, category: 'DevOps' },
];

const categories = ['Tutti', ...new Set(skills.map((s) => s.category))];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    activeCategory === 'Tutti'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  /* ---------- CANVAS BG ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes: { x: number; y: number; vx: number; vy: number; size: number; phase: number }[] = [];
    for (let i = 1000; i < 1500; i++)
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        size: 3 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
      });

    let id: number;
    const draw = () => {
      const t = performance.now() * 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const radius = node.size * (0.8 + 0.2 * Math.sin(t + node.phase));
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 96, 138, 0.45)';
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 170) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 96, 138, ${0.22 * (1 - d / 170)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(id);
    };
  }, []);

  /* ---------- GSAP ANIMATIONS ---------- */
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
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      const cards = gridRef.current?.querySelectorAll('.skill-card');
      if (cards)
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Recalculate all section trigger positions after grid height changes.
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(rafId);
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="skills" className="py-24 bg-white relative overflow-hidden">
      {/* Neural background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={titleRef} className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-[#e6f7ff] text-[#0070a0] text-sm font-medium mb-4">
              Expertise
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1f1f1f] mb-6">
              Competenze <span className="gradient-text">Tecniche</span>
            </h2>
            <p className="text-lg text-[#33383f] max-w-2xl mx-auto">
              Un insieme di competenze tecniche sviluppate durante il mio percorso di istruzione e lavorativo.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#0070a0] text-white shadow-lg shadow-[#0070a0]/30'
                    : 'bg-[#f7f9fa] text-[#33383f] hover:bg-[#e6f7ff] hover:text-[#0070a0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredSkills.map((s) => {
              const Icon = s.icon;
              const hov = hoveredSkill === s.name;
              return (
                <div
                  key={s.name}
                  className="skill-card group relative"
                  onMouseEnter={() => setHoveredSkill(s.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div
                    className={`relative bg-white rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer h-full flex flex-col ${
                      hov ? 'border-[#0070a0] shadow-xl shadow-[#0070a0]/20 scale-105' : 'border-[#dee5eb] hover:border-[#2c90c9]'
                    }`}
                  >
                    {/* Icona + pill arrotondata */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                        hov ? 'bg-gradient-to-br from-[#0070a0] to-[#2c90c9]' : 'bg-[#e6f7ff]'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${hov ? 'text-white' : 'text-[#0070a0]'}`} />
                    </div>

                    <h3 className="font-semibold text-[#1f1f1f] mb-2">{s.name}</h3>

                    {/* Barra livello ORIGINALE (solo larghezza + %) */}
                    <div className="relative h-2 bg-[#dee5eb] rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0070a0] to-[#2c90c9] rounded-full transition-all duration-700"
                        style={{ width: hov ? `${s.level}%` : '0%', transitionDelay: '0.1s' }}
                      />
                    </div>
                    <div
                      className={`text-xs text-[#33383f] mt-1 transition-opacity duration-300 ${
                        hov ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {s.level}%
                    </div>

                    {/* Glow */}
                    {hov && <div className="absolute inset-0 rounded-xl bg-[#0070a0]/5 -z-10 animate-pulse" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
