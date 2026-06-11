import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { ShieldCheck, Award, Briefcase, Code } from 'lucide-react';
import { resumeData } from '../data/resumeData';

// Safe CountUp resolver for React 19 / Vite module resolution fallback
const CountUpComponent = typeof CountUp === 'function' 
  ? CountUp 
  : (CountUp && CountUp.default ? CountUp.default : () => null);

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getIcon = (label) => {
    if (label.includes('Teams')) return <Award className="w-6 h-6 text-cyan" />;
    if (label.includes('Projects')) return <Code className="w-6 h-6 text-green-neon" />;
    if (label.includes('Awards')) return <ShieldCheck className="w-6 h-6 text-amber-400" />;
    return <Briefcase className="w-6 h-6 text-cyan" />;
  };

  return (
    <section id="about" className="py-20 bg-surface/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-bold font-sans tracking-tight text-text-primary">
            <span className="text-cyan font-mono mr-2">&lt;</span>
            About Me
            <span className="text-cyan font-mono ml-2">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-cyan rounded mt-2 mx-auto md:mx-0 shadow-[0_0_8px_#00D4FF]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <p className="text-text-secondary leading-relaxed font-sans text-base sm:text-lg">
              {resumeData.personal.about}
            </p>
            <p className="text-text-secondary leading-relaxed font-sans text-base">
              I thrive on building scalable, user-centric full-stack web applications and collaborating in agile teams. I love tackling complex problems, participating in hackathons, and optimizing workflows to reduce friction and onboarding time.
            </p>
            
            {/* Currently Exploring Grid */}
            <div className="pt-4">
              <h4 className="font-mono text-sm font-semibold text-cyan mb-3 uppercase tracking-wider">
                Currently Exploring:
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {resumeData.personal.explore.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[#111c2e] border border-cyan/15 text-cyan-dim font-mono text-xs px-3.5 py-1.5 rounded-md hover:border-cyan hover:text-cyan transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div ref={ref} className="lg:col-span-5 grid grid-cols-2 gap-4">
            {resumeData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass rounded-xl p-5 flex flex-col items-center justify-center text-center group hover:border-cyan/35 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="mb-3 p-2 rounded-lg bg-surface border border-border group-hover:border-cyan/30 transition-colors">
                  {getIcon(stat.label)}
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-text-primary">
                  {inView ? (
                    <CountUpComponent start={0} end={stat.value} duration={2.5} separator="," />
                  ) : (
                    '0'
                  )}
                  {stat.suffix}
                </div>
                <div className="text-xs text-text-secondary font-sans font-medium mt-1 uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
