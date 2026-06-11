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

// Register ChartJS modules
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Skills() {
  const radarData = {
    labels: resumeData.skills.radar.labels,
    datasets: [
      {
        label: 'Proficiency (%)',
        data: resumeData.skills.radar.data,
        backgroundColor: 'rgba(0, 212, 255, 0.2)',
        borderColor: '#00D4FF',
        borderWidth: 2,
        pointBackgroundColor: '#00D4FF',
        pointBorderColor: '#080C14',
        pointHoverBackgroundColor: '#39FF14',
        pointHoverBorderColor: '#080C14',
        pointRadius: 4,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(30, 45, 69, 0.4)',
        },
        grid: {
          color: 'rgba(30, 45, 69, 0.4)',
        },
        pointLabels: {
          color: '#8899AA',
          font: {
            family: 'JetBrains Mono',
            size: 11,
          },
        },
        ticks: {
          display: false,
          maxTicksLimit: 5,
        },
        suggestedMin: 50,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
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

  return (
    <section id="skills" className="py-20 bg-surface/30 relative">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Radar Chart */}
          <div className="lg:col-span-5 h-[350px] flex items-center justify-center bg-surface/40 border border-border/60 rounded-2xl p-6 shadow-sm chart-container relative">
            <div className="absolute top-4 left-4 flex items-center space-x-1.5 font-mono text-xs text-text-muted">
              <span>●</span>
              <span>PROFICIENCY RADAR</span>
            </div>
            <div className="w-full h-full pt-6">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>

          {/* Right: Detailed lists */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {resumeData.skills.categories.map((cat, idx) => (
              <div
                key={idx}
                className="glass rounded-xl p-5 hover:border-cyan/20 transition-all duration-300"
              >
                <h3 className="font-mono text-sm font-semibold text-cyan mb-3 uppercase tracking-wider">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-surface/85 border border-border/80 text-text-secondary font-sans text-sm px-3.5 py-1.5 rounded-lg hover:border-cyan/40 hover:text-text-primary hover:shadow-cyan-glow/5 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
