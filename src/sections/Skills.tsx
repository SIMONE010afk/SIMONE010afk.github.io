'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Brain,
  Code2,
  Database,
  Cloud,
  MessageSquare,
  Eye,
  Cpu,
  Layers,
  GitBranch,
  Terminal,
  BarChart3,
  Workflow,
  Cog,
  NotebookPen,
  Activity,
} from 'lucide-react';
import { useLanguage } from '../lib/language';

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  icon: ComponentType<{ className?: string }>;
  level: number;
  category: string;
};

const skills: Skill[] = [
  { name: 'Python', icon: Code2, level: 100, category: 'Languages' },
  { name: 'JavaScript', icon: Code2, level: 60, category: 'Languages' },
  { name: 'TypeScript', icon: Code2, level: 70, category: 'Languages' },
  { name: 'SQL', icon: Database, level: 90, category: 'Languages' },
  { name: 'C', icon: Code2, level: 70, category: 'Languages' },
  { name: 'Rust', icon: Cog, level: 40, category: 'Languages' },
  { name: 'R', icon: Code2, level: 55, category: 'Languages' },
  { name: 'TensorFlow / Keras', icon: Brain, level: 82, category: 'ML/AI' },
  { name: 'PyTorch', icon: Cpu, level: 72, category: 'ML/AI' },
  { name: 'Scikit-learn', icon: Brain, level: 90, category: 'ML/AI' },
  { name: 'XGBoost', icon: Activity, level: 83, category: 'ML/AI' },
  { name: 'NLP', icon: MessageSquare, level: 78, category: 'AI' },
  { name: 'Computer Vision', icon: Eye, level: 74, category: 'AI' },
  { name: 'RAG', icon: Eye, level: 80, category: 'AI' },
  { name: 'Power BI', icon: BarChart3, level: 76, category: 'Analytics' },
  { name: 'Tableau', icon: BarChart3, level: 60, category: 'Analytics' },
  { name: 'Feature Engineering', icon: Layers, level: 87, category: 'Data Engineering' },
  { name: 'Data Wrangling', icon: Database, level: 90, category: 'Data Engineering' },
  { name: 'Data Warehousing', icon: Database, level: 75, category: 'Data Engineering' },
  { name: 'Apache Airflow', icon: Workflow, level: 80, category: 'Orchestration' },
  { name: 'API Integration', icon: Layers, level: 70, category: 'Dev' },
  { name: 'Cloud Deployment', icon: Cloud, level: 80, category: 'DevOps' },
  { name: 'Docker', icon: Terminal, level: 58, category: 'DevOps' },
  { name: 'Cloud Basics', icon: Cloud, level: 55, category: 'DevOps' },
  { name: 'PostgreSQL', icon: Database, level: 70, category: 'Database' },
  { name: 'BigQuery', icon: Database, level: 90, category: 'Database' },
  { name: 'Google Cloud Storage', icon: Cloud, level: 84, category: 'Database' },
  { name: 'Git', icon: GitBranch, level: 100, category: 'Tools' },
  { name: 'Git / GitHub', icon: GitBranch, level: 86, category: 'Tools' },
  { name: 'Google Colab', icon: NotebookPen, level: 95, category: 'Tools' },
];

const categories = ['All', ...new Set(skills.map((s) => s.category))];

function translateCategory(category: string, language: 'it' | 'en') {
  if (language === 'en') return category;

  const labels: Record<string, string> = {
    All: 'Tutti',
    Languages: 'Linguaggi',
    'ML/AI': 'ML/AI',
    AI: 'AI',
    Analytics: 'Analytics',
    'Data Engineering': 'Data Engineering',
    Orchestration: 'Orchestration',
    Dev: 'Dev',
    DevOps: 'DevOps',
    Database: 'Database',
    Tools: 'Strumenti',
  };

  return labels[category] ?? category;
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const { language } = useLanguage();

  const filteredSkills =
    activeCategory === 'All' ? skills : skills.filter((s) => s.category === activeCategory);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Node = { x: number; y: number; vx: number; vy: number; size: number; phase: number };

    let nodes: Node[] = [];
    let frameId = 0;

    const buildNodes = () => {
      const area = Math.max(1, canvas.width * canvas.height);
      const nodeCount = Math.max(90, Math.min(240, Math.floor(area / 9500)));

      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        size: 2 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildNodes();
    };

    resize();

    const draw = () => {
      const t = performance.now() * 0.003;
      const connectionDistance = Math.max(
        95,
        Math.min(165, Math.sqrt((canvas.width * canvas.height) / Math.max(nodes.length, 1)) * 1.15)
      );
      const connectionDistanceSq = connectionDistance * connectionDistance;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const radius = node.size * (0.82 + 0.18 * Math.sin(t + node.phase));
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 96, 138, 0.38)';
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistanceSq) {
            const dist = Math.sqrt(distSq);
            const alpha = 0.18 * (1 - dist / connectionDistance);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 96, 138, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, [activeCategory]);

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

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(rafId);
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="skills" className="py-24 bg-white relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <div ref={titleRef} className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-[#e6f7ff] text-[#0070a0] text-sm font-medium mb-4">
              {language === 'it' ? 'Competenze' : 'Expertise'}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1f1f1f] mb-6">
              {language === 'it' ? 'Competenze Tecniche' : 'Technical Skills'}
            </h2>
            <p className="text-lg text-[#33383f] max-w-2xl mx-auto">
              {language === 'it'
                ? 'Competenze costruite su percorsi in data analysis, machine learning, deep learning e agenti AI.'
                : 'Skills built through data analysis, machine learning, deep learning and AI agent projects.'}
            </p>
          </div>

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
                {translateCategory(cat, language)}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredSkills.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.name} className="skill-card group relative">
                  <div className="relative bg-white rounded-xl p-6 border-2 border-[#dee5eb] h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#e6f7ff]">
                      <Icon className="w-6 h-6 text-[#0070a0]" />
                    </div>

                    <h3 className="font-semibold text-[#1f1f1f] mb-2">{s.name}</h3>

                    <div className="relative h-2 bg-[#dee5eb] rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0070a0] to-[#2c90c9] rounded-full transition-all duration-700"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                    <div className="text-xs text-[#33383f] mt-1">{s.level}%</div>
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
