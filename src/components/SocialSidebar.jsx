import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const links = [
  {
    icon: Github,
    href: resumeData.personal.github,
    label: 'GitHub',
    external: true,
  },
  {
    icon: Linkedin,
    href: resumeData.personal.linkedin,
    label: 'LinkedIn',
    external: true,
  },
  {
    icon: Mail,
    href: `mailto:${resumeData.personal.email}`,
    label: 'Email',
    external: false,
  },
];

export default function SocialSidebar() {
  return (
    <>
      {/* ── Left floating sidebar (desktop) ─────────────────────────── */}
      <div className="fixed left-5 bottom-0 z-50 hidden lg:flex flex-col items-center gap-5 pb-0">
        {links.map(({ icon: Icon, href, label, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="group relative text-text-muted hover:text-cyan transition-all duration-300 hover:-translate-y-1"
          >
            <Icon className="w-5 h-5" strokeWidth={1.7} />
            {/* Tooltip */}
            <span className="absolute left-8 top-1/2 -translate-y-1/2 text-xs font-mono bg-surface border border-border/60 text-cyan px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {label}
            </span>
          </a>
        ))}
        {/* Vertical line */}
        <div className="w-px h-20 bg-gradient-to-b from-border/60 to-transparent mt-1" />
      </div>

      {/* ── Bottom bar (mobile) ──────────────────────────────────────── */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex lg:hidden items-center gap-6 px-6 py-3 rounded-full bg-surface/80 backdrop-blur-md border border-border/50 shadow-lg">
        {links.map(({ icon: Icon, href, label, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="text-text-muted hover:text-cyan transition-colors duration-200"
          >
            <Icon className="w-5 h-5" strokeWidth={1.7} />
          </a>
        ))}
      </div>
    </>
  );
}
