import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-surface/20 py-8 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="font-mono text-sm text-text-muted">
          <span>&copy; {currentYear} </span>
          <span className="text-text-secondary hover:text-cyan transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Rahul Bramhankar
          </span>
          <span>. Built from scratch with React & Tailwind.</span>
        </div>

        {/* Social Icons links */}
        <div className="flex items-center space-x-5">
          <a
            href={resumeData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-cyan hover:scale-110 transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={resumeData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-cyan hover:scale-110 transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${resumeData.personal.email}`}
            className="text-text-secondary hover:text-cyan hover:scale-110 transition-all"
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
