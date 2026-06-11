import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download, ArrowRight, Play, Cpu, Code2, Globe } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Hero() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = [
    'Full-Stack Developer',
    'Hackathon Winner',
    'AI Builder',
    'Computer Engineer'
  ];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  useEffect(() => {
    let timer;
    const currentFullText = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentFullText.substring(0, text.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentFullText.substring(0, text.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  // CSS floating particles
  const particles = Array.from({ length: 15 });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-hero-glow">
      
      {/* Background Floating Grid Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((_, i) => {
          const size = Math.random() * 6 + 2;
          const left = Math.random() * 100;
          const duration = Math.random() * 15 + 10;
          const delay = Math.random() * 10;
          return (
            <div
              key={i}
              className="absolute bg-cyan/20 rounded-full animate-float-up"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                bottom: `-20px`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            
            {/* Status tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-cyan/10 border border-cyan/30 text-cyan rounded-full px-4 py-1.5 w-fit"
            >
              <Cpu className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest font-semibold">System Boot Complete</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary font-sans"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green-neon">{resumeData.personal.name}</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-10 text-xl sm:text-2xl font-mono text-cyan-dim flex items-center"
            >
              <span className="text-text-muted mr-2">&gt; </span>
              <span className="cursor-blink">{text}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-text-secondary text-base sm:text-lg max-w-xl font-sans leading-relaxed"
            >
              {resumeData.personal.tagline}. Result-oriented engineer building scalable full-stack applications and deploying machine learning solutions.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan to-cyan-dim text-bg font-bold font-mono px-6 py-3 rounded-lg hover:shadow-cyan-glow transition-all group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="/resume.pdf"
                download="Rahul_Bramhankar_Resume.pdf"
                className="inline-flex items-center space-x-2 bg-transparent border border-border hover:border-cyan text-text-primary font-mono px-6 py-3 rounded-lg transition-colors group"
              >
                <Download className="w-4 h-4 group-hover:text-cyan group-hover:scale-105 transition-all" />
                <span>Resume</span>
              </a>
            </motion.div>
          </div>

          {/* Right IDE/Terminal Card Column */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="w-full glass rounded-xl overflow-hidden shadow-card border border-border/80"
            >
              {/* OS / File Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border/80">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-text-secondary font-mono flex items-center space-x-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan/70" />
                  <span>developer_info.json</span>
                </div>
                <div className="w-12" /> {/* spacing */}
              </div>

              {/* Code IDE Content */}
              <div className="p-5 font-mono text-xs sm:text-sm text-left overflow-x-auto leading-relaxed bg-[#0a0f18]/90">
                <pre className="text-text-secondary">
                  <span className="text-purple-400">const</span> developer = &#123;
                </pre>
                <pre className="pl-4 text-text-primary">
                  name: <span className="text-green-neon">"Rahul Bramhankar"</span>,
                </pre>
                <pre className="pl-4 text-text-primary">
                  status: <span className="text-cyan">"Available for Hire"</span>,
                </pre>
                <pre className="pl-4 text-text-secondary">
                  skills: <span className="text-yellow-400">[</span>
                </pre>
                <pre className="pl-8 text-green-neon">
                  "React.js", "Node.js", "Firebase",
                </pre>
                <pre className="pl-8 text-green-neon">
                  "REST APIs", "MySQL", "AWS ML"
                </pre>
                <pre className="pl-4 text-text-secondary">
                  <span className="text-yellow-400">]</span>,
                </pre>
                <pre className="pl-4 text-text-secondary">
                  currentlyExploring: <span className="text-yellow-400">[</span>
                </pre>
                <pre className="pl-8 text-cyan">
                  "Docker", "Spring Boot", "Solidity"
                </pre>
                <pre className="pl-4 text-text-secondary">
                  <span className="text-yellow-400">]</span>,
                </pre>
                <pre className="pl-4 text-text-primary">
                  contributions: <span className="text-green-neon">"Hackathon Best Solution Winner"</span>
                </pre>
                <pre className="text-text-secondary">&#125;;</pre>
                <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center space-x-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>UTF-8</span>
                  </span>
                  <span>Line 15, Col 2</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
