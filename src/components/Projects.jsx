import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, Cpu, BrainCircuit, Globe, Code, X, Info } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock scroll when details modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

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
                            <p className="text-xs text-text-secondary leading-relaxed font-sans mt-2.5 bg-surface p-3 rounded-lg border border-border/30">
                              {proj.solution || proj.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="w-full mt-4 py-2 px-4 rounded-lg bg-cyan/5 hover:bg-cyan/15 border border-cyan/15 hover:border-cyan/35 text-cyan text-xs font-mono transition-all text-center flex items-center justify-center space-x-2 shadow-sm"
                    >
                      <span>View Details & Visuals</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom footer/links */}
                  <div className="p-6 pt-0 border-t border-border/20 bg-surface/20 flex flex-col justify-end space-y-4">
                    {/* Tech stack chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-text-secondary bg-surface border border-border px-2 py-0.5 rounded"
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

      {/* Immersive Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-4xl bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row my-8"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Left Side: Mockup Image */}
              <div className="md:w-1/2 w-full bg-bg border-b md:border-b-0 md:border-r border-border relative flex items-center justify-center p-4 md:p-6 min-h-[300px]">
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.title} screenshot mockup`}
                  className="w-full h-auto max-h-[420px] object-contain rounded-lg border border-border/60 shadow-lg"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan bg-surface/95 border border-cyan/30 px-2.5 py-1 rounded backdrop-blur-sm shadow-sm">
                    System View
                  </span>
                </div>
              </div>

              {/* Right Side: Details & Content */}
              <div className="md:w-1/2 w-full p-6 md:p-8 flex flex-col justify-between max-h-[80vh] md:max-h-[600px] overflow-y-auto">
                
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs font-mono text-cyan bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20">
                        {selectedProject.category}
                      </span>
                      <h3 className="text-2xl font-bold text-text-primary mt-2 font-sans">
                        {selectedProject.title}
                      </h3>
                    </div>
                    
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-1.5 rounded-full bg-surface hover:bg-surface border border-border text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs font-mono text-cyan-dim mb-6">
                    {selectedProject.tagline}
                  </p>

                  <div className="space-y-4">
                    {/* Problem Statement */}
                    <div>
                      <h4 className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        The Problem
                      </h4>
                      <p className="text-sm text-text-secondary font-sans leading-relaxed">
                        {selectedProject.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="text-xs font-mono font-bold text-green-neon flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-neon" />
                        The Solution
                      </h4>
                      <p className="text-sm text-text-secondary font-sans leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>

                    {/* Full Tech Stack */}
                    <div>
                      <h4 className="text-xs font-mono font-bold text-cyan flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.detailedTech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono text-text-secondary bg-surface border border-border px-2 py-0.5 rounded shadow-sm hover:border-cyan/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="mt-8 pt-4 border-t border-border/40 flex justify-between items-center text-sm font-mono">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-text-secondary hover:text-text-primary bg-surface hover:bg-surface border border-border px-4 py-2 rounded-lg transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-bg font-bold bg-gradient-to-r from-cyan to-cyan-dim hover:shadow-cyan-glow px-4 py-2 rounded-lg transition-all"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
