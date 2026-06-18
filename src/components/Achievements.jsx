import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2, Award, Cloud, GraduationCap } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const slides = [
  {
    image: "/images/achievements/techathon_winner.jpeg",
    title: "Winner - Techathon 3.0",
    desc: "Best Solution Award for EcoBounty, an AI-powered environmental reporting platform.",
    year: "2026",
    badge: "🏆 1st Place"
  },
  {
    image: "/images/achievements/pandora_hackathon.jpeg",
    title: "Certificate of Appreciation - Pandora Hackathon",
    desc: "Recognized for innovative design and execution in the AI for Smart Cities track.",
    year: "2026",
    badge: "🏆 Best Solution"
  },
  {
    image: "/images/achievements/talent_battle.png",
    title: "Java & DSA Internship - Talent Battle Pvt. Ltd.",
    desc: "Completed intensive training in Java programming, OOP principles, and algorithmic problem-solving.",
    year: "2025",
    badge: "🎓 Certified"
  },
  {
    image: "/images/achievements/aws_cert.jpg",
    title: "AWS Certified Machine Learning - Specialty Prep",
    desc: "Completed comprehensive training on ML pipelines, SageMaker, and cloud model deployment.",
    year: "2025",
    badge: "🎓 Certified"
  }
];

export default function Achievements() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  // Autoplay logic
  useEffect(() => {
    if (isLightboxOpen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isLightboxOpen]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0
    })
  };

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
    <section id="achievements" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-bold font-sans tracking-tight text-text-primary">
            <span className="text-cyan font-mono mr-2">&lt;</span>
            Achievements
            <span className="text-cyan font-mono ml-2">/&gt;</span>
          </h2>
          <div className="h-1 w-20 bg-cyan rounded mt-2 mx-auto md:mx-0 shadow-[0_0_8px_#00D4FF]" />
        </div>

        {/* Side-by-Side Compact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Compact visual certificate slider */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-grow glass border border-border/40 rounded-2xl overflow-hidden flex flex-col group relative h-full">
              {/* Slider header */}
              <div className="px-4 py-2 border-b border-border/30 bg-surface/50 flex items-center justify-between font-mono text-[10px] text-text-muted">
                <span>● CERTIFICATE VIEWER</span>
                <span className="text-cyan-dim">{currentIndex + 1} / {slides.length}</span>
              </div>

              {/* Slide image block */}
              <div className="relative aspect-[4/3] w-full bg-bg/25 flex items-center justify-center overflow-hidden border-b border-border/25">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full cursor-zoom-in p-4 flex items-center justify-center"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <img
                      src={slides[currentIndex].image}
                      alt={slides[currentIndex].title}
                      className="max-w-full max-h-full object-contain rounded select-none pointer-events-none"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Hover overlay utility buttons */}
                <button 
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-surface/70 border border-border/50 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm hover:bg-cyan/10 hover:border-cyan/40"
                  title="Expand Certificate"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-cyan" />
                </button>

                {/* Left/Right nav buttons */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/70 border border-border/50 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm hover:bg-cyan/10 hover:border-cyan/40"
                >
                  <ChevronLeft className="w-4 h-4 text-cyan" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/70 border border-border/50 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm hover:bg-cyan/10 hover:border-cyan/40"
                >
                  <ChevronRight className="w-4 h-4 text-cyan" />
                </button>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-1.5 py-2 border-b border-border/25 bg-surface/20">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-5 bg-cyan' : 'w-1.5 bg-text-muted/40 hover:bg-cyan/50'
                    }`}
                  />
                ))}
              </div>

              {/* Details inside the card */}
              <div className="p-4 flex-grow flex flex-col justify-center bg-surface/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] text-cyan bg-cyan/10 px-2 py-0.5 rounded border border-cyan/25">
                    {slides[currentIndex].year}
                  </span>
                  <span className="font-mono text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/25">
                    {slides[currentIndex].badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-text-primary font-sans leading-snug">
                  {slides[currentIndex].title}
                </h4>
                <p className="text-text-muted text-xs leading-relaxed font-sans mt-1">
                  {slides[currentIndex].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Timeline List */}
          <div className="lg:col-span-7 flex flex-col justify-start gap-4">
            {resumeData.achievements.map((ach, idx) => {
              const isWinner = ach.title.includes('Winner');
              const isCurrentSlide = slides[currentIndex].title === ach.title;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    const slideIdx = slides.findIndex(s => s.title === ach.title);
                    if (slideIdx !== -1) {
                      setDirection(slideIdx > currentIndex ? 1 : -1);
                      setCurrentIndex(slideIdx);
                    }
                  }}
                  className={`glass rounded-xl p-4 sm:p-5 flex items-start space-x-4 border transition-all duration-300 cursor-pointer ${
                    isCurrentSlide 
                      ? 'border-cyan/50 bg-cyan/[0.03] shadow-[0_0_12px_rgba(0,212,255,0.05)] translate-x-1' 
                      : 'border-border/30 hover:border-cyan/35 bg-surface/10 hover:bg-surface/20'
                  } ${isWinner && !isCurrentSlide ? 'border-amber-500/20 bg-amber-500/[0.01]' : ''}`}
                >
                  {/* Icon wrapper */}
                  <div className={`p-2.5 rounded-lg bg-surface border flex-shrink-0 transition-colors mt-0.5 ${
                    isCurrentSlide 
                      ? 'border-cyan/40 text-cyan bg-cyan/5' 
                      : isWinner 
                        ? 'border-amber-500/30 text-amber-400' 
                        : 'border-border text-text-secondary'
                  }`}>
                    {getIcon(ach.title)}
                  </div>

                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-bold text-text-primary font-sans leading-snug">
                        {ach.title}
                      </h3>
                      <span className="font-mono text-xs text-cyan-dim bg-cyan/5 px-2 py-0.5 rounded border border-cyan/15 flex-shrink-0 mt-0.5">
                        {ach.year}
                      </span>
                    </div>
                    <p className="text-text-secondary dark:text-text-muted text-xs sm:text-sm font-sans leading-relaxed mt-1">
                      {ach.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10 shadow-2xl bg-black/50 p-2"
              />
              <div className="mt-4 text-center">
                <h4 className="text-white text-lg font-bold">{slides[currentIndex].title}</h4>
                <p className="text-gray-400 text-sm mt-1">{slides[currentIndex].desc}</p>
              </div>
            </motion.div>

            {/* Lightbox Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
