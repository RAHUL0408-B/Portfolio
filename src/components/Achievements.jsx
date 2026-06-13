import React from 'react';
import { Award, ShieldAlert, GraduationCap, Cloud } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import AchievementSlider from './AchievementSlider';

export default function Achievements() {
  const getIcon = (title) => {
    if (title.includes('Winner') || title.includes('Techathon')) {
      return <Award className="w-6 h-6 text-amber-400" />;
    }
    if (title.includes('Pandora')) {
      return <Award className="w-6 h-6 text-cyan" />;
    }
    if (title.includes('AWS')) {
      return <Cloud className="w-6 h-6 text-sky-400" />;
    }
    return <GraduationCap className="w-6 h-6 text-green-neon" />;
  };

  return (
    <section id="achievements" className="py-20 bg-surface/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-bold font-sans tracking-tight text-text-primary">
            <span className="text-cyan font-mono mr-2">&lt;</span>
            Achievements & Certifications
            <span className="text-cyan font-mono ml-2">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-cyan rounded mt-2 mx-auto md:mx-0 shadow-[0_0_8px_#00D4FF]" />
        </div>

        {/* Visual Achievements Slider */}
        <AchievementSlider />

        {/* Grid of achievement cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {resumeData.achievements.map((ach, idx) => {
            const isWinner = ach.title.includes('Winner');

            return (
              <div
                key={idx}
                className={`glass rounded-xl p-6 flex items-start space-x-4 hover:border-cyan/25 hover:-translate-y-0.5 transition-all duration-300 ${
                  isWinner ? 'border border-amber-500/25' : ''
                }`}
              >
                {/* Icon wrapper */}
                <div className={`p-3 rounded-lg bg-surface border border-border flex-shrink-0 ${
                  isWinner ? 'border-amber-500/30' : ''
                }`}>
                  {getIcon(ach.title)}
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-mono text-xs text-cyan-dim bg-cyan/5 px-2.5 py-0.5 rounded border border-cyan/15">
                      {ach.year}
                    </span>
                    {isWinner && (
                      <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                        ★ TOP 1.25%
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary font-sans">
                    {ach.title}
                  </h3>
                  <p className="text-text-secondary text-sm font-sans leading-relaxed">
                    {ach.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
