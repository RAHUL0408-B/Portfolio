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
          color: '#8899AA',
          font: { family: 'JetBrains Mono', size: 11 },
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">

          {/* Radar chart */}
          <div className="lg:col-span-5 h-[340px] flex items-center justify-center bg-surface/40 border border-border/60 rounded-2xl p-6 shadow-sm chart-container relative">
            <div className="absolute top-4 left-4 flex items-center space-x-1.5 font-mono text-xs text-text-muted">
              <span>●</span>
              <span>PROFICIENCY RADAR</span>
            </div>
            <div className="w-full h-full pt-6">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>

          {/* Category labels */}
          <div className="lg:col-span-7 space-y-4">
            {categories.map((cat, i) => (
              <div key={i} className="glass rounded-xl px-5 py-3">
                <p className="font-mono text-xs text-cyan uppercase tracking-widest mb-1">{cat.name}</p>
                <p className="text-text-muted text-xs font-sans">{cat.skills.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-width ticker rows ─────────────────────────────────────── */}
      <div className="w-full space-y-4 overflow-hidden">
        {categories.map((cat, i) => (
          <TickerRow
            key={i}
            skills={cat.skills}
            direction={i % 2 === 0 ? 'left' : 'right'}
            speed={45 + i * 10}
          />
        ))}
      </div>
    </section>
  );
}
