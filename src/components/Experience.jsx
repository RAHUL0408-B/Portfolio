import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center md:text-left mb-16">
          <h2 className="text-3xl font-bold font-sans tracking-tight text-text-primary">
            <span className="text-cyan font-mono mr-2">&lt;</span>
            Work Experience
            <span className="text-cyan font-mono ml-2">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-cyan rounded mt-2 mx-auto md:mx-0 shadow-[0_0_8px_#00D4FF]" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-border/80 ml-4 md:ml-6 space-y-12 text-left">
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-10">
              
              {/* Timeline dot */}
              <span className="absolute -left-[17px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-surface border border-cyan/40 shadow-cyan-glow/10 z-10">
                <Briefcase className="w-3.5 h-3.5 text-cyan" />
              </span>

              {/* Card */}
              <div className="glass rounded-xl p-6 sm:p-8 hover:border-cyan/20 transition-all duration-300">
                
                {/* Meta info header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-border/40">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary font-sans">
                      {exp.role}
                    </h3>
                    <p className="text-cyan-dim font-mono text-sm mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-xs font-mono text-text-secondary">
                    <span className="flex items-center space-x-1.5 bg-surface px-2.5 py-1.5 rounded-lg border border-border">
                      <Calendar className="w-3.5 h-3.5 text-cyan-dim" />
                      <span>{exp.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1.5 bg-surface px-2.5 py-1.5 rounded-lg border border-border">
                      <MapPin className="w-3.5 h-3.5 text-cyan-dim" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Details points */}
                <ul className="space-y-2.5 text-text-secondary text-sm font-sans list-disc list-outside pl-4 leading-relaxed">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="hover:text-text-primary transition-colors">
                      {pt}
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
