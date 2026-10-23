import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Medal,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

const certificateTitles = new Set([
  'Spring Boot 3, Spring 6 & Hibernate - Udemy',
  'Java & DSA Internship - Talent Battle Pvt. Ltd.',
  'AWS Certified Machine Learning - Specialty Prep',
]);

const achievementMeta = {
  '3rd Place — DogFood 2026 (Broadsheet)': {
    image: 'https://pawan03.vercel.app/assets/Screenshot%202026-10-01%20135252-DhHQQCbx.png',
    badge: '3RD PLACE • $350',
    context: 'DOGFOOD 2026',
  },
  'Winner - Techathon 3.0': {
    image: '/images/achievements/techathon_winner.jpeg',
    badge: 'BEST SOLUTION',
    context: 'TECHATHON 3.0',
  },
  'Certificate of Appreciation - Pandora Hackathon': {
    image: '/images/achievements/pandora_hackathon.jpeg',
    badge: 'APPRECIATION',
    context: 'PANDORA HACKATHON',
  },
};

const certificateMeta = {
  'Spring Boot 3, Spring 6 & Hibernate - Udemy': {
    image: '/images/achievements/udemy_spring_boot.png',
    label: 'BACKEND DEVELOPMENT',
    skills: ['Spring Boot', 'Spring Security', 'Hibernate'],
  },
  'Java & DSA Internship - Talent Battle Pvt. Ltd.': {
    image: '/images/achievements/talent_battle.png',
    label: 'PROFESSIONAL TRAINING',
    skills: ['Java', 'OOP', 'DSA'],
  },
  'AWS Certified Machine Learning - Specialty Prep': {
    image: '/images/achievements/aws_cert.jpg',
    label: 'CLOUD & MACHINE LEARNING',
    skills: ['SageMaker', 'ML Pipelines', 'Deployment'],
  },
};

const achievementEntries = resumeData.achievements.filter(
  (entry) => !certificateTitles.has(entry.title)
);

const certificates = resumeData.achievements
  .filter((entry) => certificateTitles.has(entry.title))
  .map((entry) => ({
    ...entry,
    ...(certificateMeta[entry.title] ?? {
      image: '/images/achievements/udemy_spring_boot.png',
      label: 'PROFESSIONAL CERTIFICATE',
      skills: [],
    }),
  }));

const slides = certificates.map((certificate) => ({
  ...certificate,
  context: certificate.label,
  badge: 'CERTIFIED',
  previewMode: 'carousel',
}));

const achievementCardMeta = {
  '3rd Place — DogFood 2026 (Broadsheet)': {
    skills: ['3rd Place', '$350 Prize', '194 Projects'],
  },
  'Winner - Techathon 3.0': {
    skills: ['Best Solution', 'EcoBounty', 'Winner'],
  },
  'Certificate of Appreciation - Pandora Hackathon': {
    skills: ['AI for Smart Cities', 'Innovation', 'Recognition'],
  },
};

const achievementCards = achievementEntries.map((entry) => {
  const meta = achievementMeta[entry.title] ?? {
    image: '/images/achievements/techathon_winner.jpeg',
    badge: 'RECOGNITION',
    context: 'PORTFOLIO HIGHLIGHT',
  };
  const cardMeta = achievementCardMeta[entry.title] ?? {
    skills: ['Competitive Build', 'Product Delivery', 'Recognition'],
  };

  return {
    ...entry,
    ...meta,
    ...cardMeta,
    label: meta.context,
    previewMode: 'card',
  };
});

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 90 : -90, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({ x: direction < 0 ? 90 : -90, opacity: 0, scale: 0.98 }),
};

export default function Achievements() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (preview) return undefined;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((index) => (index === slides.length - 1 ? 0 : index + 1));
    }, 6500);

    return () => clearInterval(timer);
  }, [preview]);

  const showSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const showPrevious = () => {
    setDirection(-1);
    setCurrentIndex((index) => (index === 0 ? slides.length - 1 : index - 1));
  };

  const showNext = () => {
    setDirection(1);
    setCurrentIndex((index) => (index === slides.length - 1 ? 0 : index + 1));
  };

  const openPreview = (item) => setPreview(item);

  const openPreviewSlide = (offset) => {
    setDirection(offset);
    setCurrentIndex((index) => {
      const nextIndex = offset > 0
        ? (index === slides.length - 1 ? 0 : index + 1)
        : (index === 0 ? slides.length - 1 : index - 1);
      setPreview(slides[nextIndex]);
      return nextIndex;
    });
  };

  const getIcon = (title) => {
    if (certificateTitles.has(title)) return <BadgeCheck className="h-5 w-5" />;
    if (title.includes('3rd Place')) return <Medal className="h-5 w-5" />;
    if (title.includes('Winner') || title.includes('Techathon')) return <Trophy className="h-5 w-5" />;
    return <Award className="h-5 w-5" />;
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-cyan/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-glow/10 blur-[100px]" />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-11 max-w-3xl"
        >
          <div id="certificates" className="mb-3 flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.22em] text-cyan">
            <BadgeCheck className="h-3.5 w-3.5" />
            VERIFIED LEARNING
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Certificates <span className="font-mono text-cyan">/&gt;</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
            Technical credentials presented through an interactive learning archive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <motion.article
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="group lg:col-span-5"
          >
            <div className="relative h-full overflow-hidden rounded-2xl border border-cyan/25 bg-surface/80 shadow-cyan-glow">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
              <div className="flex items-center justify-between border-b border-border/50 bg-cyan/[0.04] px-4 py-3 font-mono text-[10px] font-bold tracking-[0.16em] text-text-muted">
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" /> FEATURED CREDENTIAL</span>
                <span className="text-cyan">{String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden bg-bg/50">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.button
                    key={currentSlide.title}
                    type="button"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => openPreview(currentSlide)}
                    className="absolute inset-0 block h-full w-full cursor-zoom-in p-3 text-left"
                    aria-label={`Open ${currentSlide.title} certificate`}
                  >
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="h-full w-full rounded-xl object-contain transition duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="absolute inset-3 rounded-xl bg-gradient-to-t from-bg/65 via-transparent to-transparent" />
                  </motion.button>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-bg/75 p-2.5 text-text-primary opacity-0 backdrop-blur-md transition hover:border-cyan/60 hover:text-cyan group-hover:opacity-100 focus:opacity-100"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-bg/75 p-2.5 text-text-primary opacity-0 backdrop-blur-md transition hover:border-cyan/60 hover:text-cyan group-hover:opacity-100 focus:opacity-100"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openPreview(currentSlide)}
                  className="absolute right-4 top-4 rounded-lg border border-white/15 bg-bg/75 p-2 text-cyan opacity-0 backdrop-blur-md transition hover:border-cyan/60 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Expand certificate image"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="border-b border-border/40 px-4 py-3">
                <div className="flex justify-center gap-1.5">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => showSlide(index)}
                      aria-label={`Show ${slide.title} certificate`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'w-8 bg-cyan shadow-[0_0_10px_rgba(0,212,255,0.8)]' : 'w-1.5 bg-text-muted/40 hover:bg-cyan/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold tracking-wider">
                  <span className="rounded border border-cyan/30 bg-cyan/10 px-2 py-1 text-cyan">{currentSlide.context}</span>
                  <span className="rounded border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-amber-400">{currentSlide.badge}</span>
                  <span className="ml-auto text-text-muted">{currentSlide.year}</span>
                </div>
                <h3 className="text-xl font-bold leading-snug text-text-primary">{currentSlide.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{currentSlide.desc}</p>
              </div>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <div className="relative h-full overflow-hidden rounded-2xl border border-border/60 bg-surface/45 p-3 sm:p-4">
              <div className="mb-2 flex items-center justify-between px-2 py-2 font-mono text-[10px] font-bold tracking-[0.16em] text-text-muted">
                <span>CERTIFICATE LOG</span>
                <span className="text-cyan">{certificates.length} ENTRIES</span>
              </div>
              <div className="space-y-3">
                {certificates.map((certificate, index) => {
                  const slideIndex = slides.findIndex((slide) => slide.title === certificate.title);
                  const isCurrent = slideIndex === currentIndex;
                  const certificateContext = slides[slideIndex]?.context ?? 'CERTIFICATE';

                  return (
                    <motion.button
                      key={certificate.title}
                      type="button"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => showSlide(slideIndex)}
                      className={`group/item w-full rounded-xl border p-4 text-left transition sm:p-5 ${
                        isCurrent
                          ? 'border-cyan/50 bg-cyan/[0.06] shadow-[0_0_24px_rgba(0,212,255,0.08)]'
                          : 'border-border/50 bg-bg/[0.16] hover:border-cyan/30 hover:bg-surfaceHover/60'
                      }`}
                    >
                      <div className="flex gap-3 sm:gap-4">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                          isCurrent ? 'border-cyan/40 bg-cyan/10 text-cyan' : 'border-border bg-surface text-text-secondary'
                        }`}>
                          {getIcon(certificate.title)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="mb-1 font-mono text-[10px] font-bold tracking-[0.14em] text-cyan-dim">
                                {String(index + 1).padStart(2, '0')} · {certificateContext}
                              </p>
                              <h3 className="text-base font-bold leading-snug text-text-primary sm:text-lg">{certificate.title}</h3>
                            </div>
                            <span className="shrink-0 font-mono text-xs text-text-muted">{certificate.year}</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{certificate.desc}</p>
                          <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-wider text-cyan opacity-70 transition group-hover/item:opacity-100">
                            VIEW CREDENTIAL <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          id="achievements"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mt-16 border-t border-border/60 pt-12"
        >
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.22em] text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                RECOGNITION ARCHIVE
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Achievements <span className="font-mono text-amber-400">/&gt;</span>
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-text-secondary sm:text-right">
              Competitive milestones and product wins, presented in the credential-card format.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {achievementCards.map((achievement, index) => (
              <motion.article
                key={achievement.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group/cert relative overflow-hidden rounded-2xl border border-border/60 bg-surface/65 shadow-card transition-colors hover:border-amber-400/40"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-300 to-transparent" />
                <button
                  type="button"
                  onClick={() => openPreview(achievement)}
                  className="relative block w-full overflow-hidden bg-bg/30 p-4 text-left"
                  aria-label={`Open ${achievement.title} achievement`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border/60 bg-bg/50">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="h-full w-full object-contain p-1 transition duration-500 group-hover/cert:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/75 via-transparent to-transparent opacity-70" />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-lg border border-amber-400/35 bg-bg/80 px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-wider text-amber-400 opacity-0 backdrop-blur-sm transition group-hover/cert:opacity-100 focus-within:opacity-100">
                      PREVIEW <Maximize2 className="h-3 w-3" />
                    </span>
                  </div>
                </button>

                <div className="p-5 pt-2">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-amber-400">{achievement.label}</span>
                    <span className="font-mono text-xs text-text-muted">{achievement.year}</span>
                  </div>
                  <h4 className="text-lg font-bold leading-snug text-text-primary">{achievement.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{achievement.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {achievement.skills.map((skill) => (
                      <span key={skill} className="rounded-md border border-border bg-bg/40 px-2 py-1 font-mono text-[10px] text-text-secondary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b101b] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[10px] font-bold tracking-[0.16em] text-gray-400 sm:px-5">
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan" /> {preview.previewMode === 'carousel' ? 'CERTIFICATE SHOWCASE' : 'ACHIEVEMENT PREVIEW'}</span>
                <button type="button" onClick={() => setPreview(null)} className="rounded-md p-1 text-gray-300 transition hover:bg-white/10 hover:text-white" aria-label="Close preview">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
                <img src={preview.image} alt={preview.title} className="mx-auto max-h-[62vh] w-auto max-w-full rounded-lg object-contain" />
                <div className="mx-auto mt-5 max-w-3xl text-center">
                  <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-cyan">{preview.year}</p>
                  <h4 className="mt-2 text-xl font-bold text-white sm:text-2xl">{preview.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{preview.desc}</p>
                </div>
              </div>

              {preview.previewMode === 'carousel' && (
                <div className="flex justify-center gap-3 border-t border-white/10 p-3">
                  <button type="button" onClick={() => openPreviewSlide(-1)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 font-mono text-[10px] font-bold tracking-wider text-gray-300 transition hover:border-cyan/60 hover:text-cyan">
                    <ChevronLeft className="h-3.5 w-3.5" /> PREVIOUS
                  </button>
                  <button type="button" onClick={() => openPreviewSlide(1)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 font-mono text-[10px] font-bold tracking-wider text-gray-300 transition hover:border-cyan/60 hover:text-cyan">
                    NEXT <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
