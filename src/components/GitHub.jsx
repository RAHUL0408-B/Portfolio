import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { GitBranch, GitCommit, Star, Award } from 'lucide-react';

export default function GitHub() {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'RAHUL0408-B';

  const theme = {
    dark: ['#0d1117', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <section id="github" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-bold font-sans tracking-tight text-text-primary">
            <span className="text-cyan font-mono mr-2">&lt;</span>
            GitHub Contributions
            <span className="text-cyan font-mono ml-2">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-cyan rounded mt-2 mx-auto md:mx-0 shadow-[0_0_8px_#00D4FF]" />
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8 border border-border/70 hover:border-cyan/20 transition-all duration-300">
          
          {/* Header Stats info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 border-b border-border/40 pb-6 text-left">
            <div className="flex items-center space-x-3.5">
              <div className="p-2.5 rounded-lg bg-cyan/5 border border-cyan/15">
                <GitCommit className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <h4 className="text-xs font-mono text-text-secondary uppercase tracking-wider">Consistency</h4>
                <p className="text-lg font-bold font-sans text-text-primary mt-0.5">Daily Commits</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="p-2.5 rounded-lg bg-green-neon/5 border border-green-neon/15">
                <GitBranch className="w-5 h-5 text-green-neon" />
              </div>
              <div>
                <h4 className="text-xs font-mono text-text-secondary uppercase tracking-wider">Open Source</h4>
                <p className="text-lg font-bold font-sans text-text-primary mt-0.5">Public Repos</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="p-2.5 rounded-lg bg-amber-400/5 border border-amber-400/15">
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-mono text-text-secondary uppercase tracking-wider">Engagement</h4>
                <p className="text-lg font-bold font-sans text-text-primary mt-0.5">Hackathon Contributor</p>
              </div>
            </div>
          </div>

          {/* GitHub Heatmap calendar */}
          <div className="flex flex-col items-center overflow-x-auto py-4">
            <div className="min-w-[700px] flex justify-center text-text-secondary font-mono text-xs">
              <GitHubCalendar
                username={username}
                blockSize={12}
                blockMargin={4}
                theme={theme}
                fontSize={12}
              />
            </div>
          </div>

          {/* Footer handle link */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-text-muted">
            <span>Graph matches real-time commits pulled from api.github.com</span>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 sm:mt-0 text-cyan-dim hover:text-cyan transition-colors"
            >
              @{username} on GitHub →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
