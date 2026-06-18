import React from 'react';
import { Calendar, MapPin, Github, ExternalLink } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center md:text-left mb-16">
          <h2 className="text-3xl font-bold font-sans tracking-tight text-text-primary">
            <span className="text-cyan font-mono mr-2">&lt;</span>
            Work Experience
            <span className="text-cyan font-mono ml-2">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-cyan rounded mt-2 mx-auto md:mx-0 shadow-[0_0_8px_#00D4FF]" />
        </div>

        {/* Compact Vertical Timeline */}
        <div className="relative border-l-2 border-border/40 ml-4 md:ml-8 pl-6 sm:pl-8 space-y-12 text-left">
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Node Point (pulsing dot) */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 flex items-center justify-center">
                <span className="relative flex h-4 w-4">
                  <span className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] absolute inline-flex h-full w-full rounded-full bg-cyan/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-bg border-2 border-cyan shadow-[0_0_6px_#00D4FF]"></span>
                </span>
              </div>

              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-text-primary font-sans group-hover:text-cyan transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    <span className="text-cyan-dim font-mono text-xs font-semibold">{exp.company}</span>
                    
                    {/* GitHub & Live links */}
                    {(exp.github || exp.live) && (
                      <span className="flex items-center gap-2 text-[10px] font-sans">
                        <span className="text-border/60">•</span>
                        {exp.github && (
                          <a 
                            href={exp.github} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-text-muted hover:text-cyan transition-colors flex items-center gap-1 font-mono"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>repo</span>
                          </a>
                        )}
                        {exp.github && exp.live && <span className="text-border/60">|</span>}
                        {exp.live && (
                          <a 
                            href={exp.live} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-text-muted hover:text-cyan transition-colors flex items-center gap-1 font-mono"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>live</span>
                          </a>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Duration & Location */}
                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-text-secondary sm:text-right">
                  <span className="flex items-center gap-1.5 bg-surface px-2.5 py-1 rounded border border-border/60">
                    <Calendar className="w-3.5 h-3.5 text-cyan-dim" />
                    <span>{exp.duration}</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-surface px-2.5 py-1 rounded border border-border/60">
                    <MapPin className="w-3.5 h-3.5 text-cyan-dim" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* Bullet Points in compact layout */}
              <ul className="space-y-2 text-text-secondary text-xs sm:text-sm font-sans pl-4 list-disc list-outside leading-relaxed">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="hover:text-text-primary transition-colors">
                    {pt}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
