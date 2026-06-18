import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { resumeData } from '../data/resumeData';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// ── Icon map for common skills ───────────────────────────────────────────────
const ICON = {
  'Java':         '☕',
  'JavaScript':   '🟨',
  'HTML':         '🌐',
  'CSS':          '🎨',
  'React.js':     '⚛️',
  'Node.js':      '🟢',
  'REST APIs':    '🔗',
  'Hibernate':    '🗄️',
  'MySQL':        '🐬',
  'MongoDB':      '🍃',
  'PostgreSQL':   '🐘',
  'Firebase':     '🔥',
  'Supabase':     '⚡',
  'AWS (ML/SageMaker)': '☁️',
  'Git':          '🌿',
  'GitHub':       '🐙',
  'Postman':      '📮',
  'VS Code':      '💙',
  'Vite':         '⚡',
  'Agile':        '🔄',
  'CI/CD basics': '🚀',
  'CRUD':         '📋',
  'Tailwind CSS': '🌊',
  'Spring Boot':  '🌱',
};

// ── Ticker row ───────────────────────────────────────────────────────────────
function TickerRow({ skills, direction = 'left', speed = 30 }) {
  // Duplicate enough times for seamless loop
  const repeated = [...skills, ...skills, ...skills, ...skills];
  const duration = `${speed}s`;
  const animClass = direction === 'left' ? 'animate-ticker-left' : 'animate-ticker-right';

  return (
    <div className="relative overflow-hidden w-full py-1">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-bg to-transparent pointer-events-none" />

      <div
        className={`flex gap-3 w-max ${animClass}`}
        style={{ animationDuration: duration }}
      >
        {repeated.map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/70 bg-surface/80 text-text-secondary text-sm font-sans whitespace-nowrap hover:border-cyan/50 hover:text-cyan hover:bg-cyan/5 transition-colors cursor-default select-none"
          >
            <span className="text-base leading-none">{ICON[skill] ?? '✦'}</span>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const radarData = {
    labels: resumeData.skills.radar.labels,
    datasets: [
      {
        label: 'Proficiency (%)',
        data: resumeData.skills.radar.data,
        backgroundColor: 'rgba(0, 212, 255, 0.15)',
        borderColor: '#00D4FF',
        borderWidth: 2,
        pointBackgroundColor: '#00D4FF',
        pointBorderColor: 'var(--bg-color)',
        pointHoverBackgroundColor: '#39FF14',
        pointHoverBorderColor: 'var(--bg-color)',
        pointRadius: 4,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(30, 45, 69, 0.4)' },
        grid:       { color: 'rgba(30, 45, 69, 0.4)' },
        pointLabels: {
          display: false
        },
        ticks: { display: false, maxTicksLimit: 5 },
        suggestedMin: 50,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0D1421',
        titleFont: { family: 'Outfit', size: 12, weight: 'bold' },
        bodyFont: { family: 'JetBrains Mono', size: 12 },
        borderColor: '#1E2D45',
        borderWidth: 1,
        displayColors: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const categories = resumeData.skills.categories;

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-bold font-sans tracking-tight text-text-primary">
            <span className="text-cyan font-mono mr-2">&lt;</span>
            Skills
            <span className="text-cyan font-mono ml-2">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-cyan rounded mt-2 mx-auto md:mx-0 shadow-[0_0_8px_#00D4FF]" />
        </div>

        {/* Radar + tickers grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">

          {/* Radar chart */}
          <div className="lg:col-span-5 h-[360px] flex flex-col justify-between bg-surface/40 border border-border/60 rounded-2xl p-6 shadow-sm chart-container relative overflow-hidden">
            <div className="absolute top-4 left-4 flex items-center space-x-1.5 font-mono text-xs text-text-muted z-10">
              <span>●</span>
              <span>PROFICIENCY RADAR</span>
            </div>
            <div className="w-full h-full pt-6 relative flex items-center justify-center z-0">
              <Radar data={radarData} options={radarOptions} />
              
              {/* Sonar sweep overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6 mt-6 z-10">
                <div className="w-[220px] h-[220px] rounded-full relative flex items-center justify-center">
                  {/* Concentric Sonar Rings */}
                  <div className="absolute inset-0 rounded-full border border-cyan/10 animate-[pulse_2s_infinite]" />
                  <div className="absolute w-[66%] h-[66%] rounded-full border border-cyan/5" />
                  <div className="absolute w-[33%] h-[33%] rounded-full border border-cyan/5" />
                  
                  {/* Sonar sweep beam */}
                  <div 
                    className="absolute inset-0 rounded-full animate-[spin_6s_linear_infinite]"
                    style={{
                      background: 'conic-gradient(from 0deg, rgba(0, 212, 255, 0.12) 0deg, rgba(0, 212, 255, 0) 120deg)'
                    }}
                  />
                </div>
              </div>

              {/* Floating HTML Labels */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6 mt-6 z-20">
                <div className="w-[220px] h-[220px] relative">
                  
                  {/* 1. Frontend */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div 
                      className="animate-float font-mono font-bold text-[9px] sm:text-[10px] text-text-primary bg-bg/85 border border-border/40 px-2 py-0.5 rounded shadow-sm whitespace-nowrap select-none"
                      style={{ animationDelay: '0s', animationDuration: '4.5s' }}
                    >
                      Frontend
                    </div>
                  </div>

                  {/* 2. Backend */}
                  <div className="absolute top-[22%] -right-[34px]">
                    <div 
                      className="animate-float font-mono font-bold text-[9px] sm:text-[10px] text-text-primary bg-bg/85 border border-border/40 px-2 py-0.5 rounded shadow-sm whitespace-nowrap select-none"
                      style={{ animationDelay: '0.7s', animationDuration: '5s' }}
                    >
                      Backend
                    </div>
                  </div>

                  {/* 3. Database */}
                  <div className="absolute bottom-[22%] -right-[40px]">
                    <div 
                      className="animate-float font-mono font-bold text-[9px] sm:text-[10px] text-text-primary bg-bg/85 border border-border/40 px-2 py-0.5 rounded shadow-sm whitespace-nowrap select-none"
                      style={{ animationDelay: '1.4s', animationDuration: '4.8s' }}
                    >
                      Database
                    </div>
                  </div>

                  {/* 4. Cloud */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <div 
                      className="animate-float font-mono font-bold text-[9px] sm:text-[10px] text-text-primary bg-bg/85 border border-border/40 px-2 py-0.5 rounded shadow-sm whitespace-nowrap select-none"
                      style={{ animationDelay: '2.1s', animationDuration: '4.2s' }}
                    >
                      Cloud
                    </div>
                  </div>

                  {/* 5. Tools & Git */}
                  <div className="absolute bottom-[22%] -left-[48px]">
                    <div 
                      className="animate-float font-mono font-bold text-[9px] sm:text-[10px] text-text-primary bg-bg/85 border border-border/40 px-2 py-0.5 rounded shadow-sm whitespace-nowrap select-none"
                      style={{ animationDelay: '1.0s', animationDuration: '4.6s' }}
                    >
                      Tools & Git
                    </div>
                  </div>

                  {/* 6. Java & DSA */}
                  <div className="absolute top-[22%] -left-[48px]">
                    <div 
                      className="animate-float font-mono font-bold text-[9px] sm:text-[10px] text-text-primary bg-bg/85 border border-border/40 px-2 py-0.5 rounded shadow-sm whitespace-nowrap select-none"
                      style={{ animationDelay: '1.7s', animationDuration: '5.2s' }}
                    >
                      Java & DSA
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Category cards with individual badges */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <div key={i} className="glass rounded-xl p-4 flex flex-col border border-border/40 hover:border-cyan/35 hover:-translate-y-0.5 transition-all duration-300">
                <p className="font-mono text-xs font-semibold text-cyan uppercase tracking-widest mb-3.5 flex items-center justify-between">
                  <span>{cat.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan/10 text-cyan-dim border border-cyan/15 font-sans lowercase">
                    {cat.skills.length} skills
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/75 bg-surface/65 text-text-secondary text-xs font-sans hover:border-cyan/50 hover:text-cyan hover:bg-cyan/5 transition-all cursor-default select-none"
                    >
                      <span className="text-sm">{ICON[skill] ?? '✦'}</span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-width ticker row (Single scrolling line for all skills) ── */}
      <div className="w-full overflow-hidden mt-6">
        <TickerRow
          skills={categories.flatMap(cat => cat.skills)}
          direction="left"
          speed={60}
        />
      </div>
    </section>
  );
}
