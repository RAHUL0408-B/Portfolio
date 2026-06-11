import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, Cpu, BrainCircuit, Globe, Code } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const categories = ['All', 'Web', 'AI', 'IoT'];

  const filteredProjects = resumeData.projects.filter((proj) => {
    if (filter === 'All') return true;
    return proj.category.includes(filter);
  });

  const getCategoryIcon = (category) => {
    if (category.includes('AI') && category.includes('IoT')) {
      return <div className="flex space-x-1"><BrainCircuit className="w-4 h-4 text-cyan" /><Cpu className="w-4 h-4 text-green-neon" /></div>;
    }
    if (category.includes('AI')) return <BrainCircuit className="w-4 h-4 text-cyan" />;
    if (category.includes('IoT')) return <Cpu className="w-4 h-4 text-green-neon" />;
    return <Globe className="w-4 h-4 text-cyan-dim" />;
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold font-sans tracking-tight text-text-primary">
              <span className="text-cyan font-mono mr-2">&lt;</span>
              Projects
              <span className="text-cyan font-mono ml-2">/&gt;</span>
            </h2>
            <div className="h-1 w-20 bg-cyan rounded mt-2 mx-auto md:mx-0 shadow-[0_0_8px_#00D4FF]" />
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 bg-surface/50 border border-border p-1 rounded-lg w-fit mx-auto md:mx-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setExpandedIndex(null);
                }}
                className={`font-mono text-xs sm:text-sm px-4 py-2 rounded-md transition-all ${
                  filter === cat
                    ? 'bg-cyan text-bg font-bold shadow-cyan-glow'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => {
              const isEcoBounty = proj.title === 'EcoBounty';
              const isExpanded = expandedIndex === idx;

              return (
                <motion.div
                  key={proj.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`glass rounded-xl overflow-hidden shadow-card hover:shadow-cyan-glow/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                    isEcoBounty ? 'border border-amber-500/40 relative' : ''
                  }`}
                >
                  
                  {/* Highlights/Award Banner */}
                  {isEcoBounty && (
                    <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 text-bg font-bold text-center py-1 text-[11px] font-mono tracking-wider flex items-center justify-center space-x-1.5 z-10 uppercase">
                      <span>{proj.badge}</span>
                    </div>
                  )}

                  {/* Top content */}
                  <div className={`p-6 flex-grow ${isEcoBounty ? 'pt-9' : ''}`}>
                    {/* Header info */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center space-x-2 text-xs font-mono text-cyan-dim bg-cyan/5 px-2.5 py-1 rounded-md border border-cyan/10">
                        {getCategoryIcon(proj.category)}
                        <span>{proj.category}</span>
                      </div>
                      {proj.badge && !isEcoBounty && (
                        <span className="text-[10px] font-mono font-medium text-green-neon bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                          {proj.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-text-primary font-sans group-hover:text-cyan transition-colors mb-2">
                      {proj.title}
                    </h3>
                    
                    <p className="text-xs font-mono text-cyan-dim mb-4 line-clamp-1">
                      {proj.tagline}
                    </p>

                    <p className="text-text-secondary text-sm font-sans mb-4 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>

                    {/* How it works accordion */}
                    <div className="border-t border-border/40 mt-4 pt-3">
                      <button
                        onClick={() => toggleExpand(idx)}
                        className="flex items-center justify-between w-full font-mono text-xs text-text-muted hover:text-cyan transition-colors"
                      >
                        <span>HOW IT WORKS</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-text-secondary leading-relaxed font-sans mt-2.5 bg-[#0a111c] p-3 rounded-lg border border-border/30">
                              {proj.howItWorks || proj.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Bottom footer/links */}
                  <div className="p-6 pt-0 border-t border-border/20 bg-surface/20 flex flex-col justify-end space-y-4">
                    {/* Tech stack chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-text-secondary bg-[#121c2c] border border-border px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* External links */}
                    <div className="flex justify-between items-center text-sm font-mono pt-2 border-t border-border/30">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 text-cyan-dim hover:text-cyan transition-colors"
                      >
                        <span>Live Preview</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
