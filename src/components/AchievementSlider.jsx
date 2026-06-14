import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

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
    title: "Pandora Hackathon",
    desc: "Recognized for innovative design and execution in the AI for Smart Cities track.",
    year: "2026",
    badge: "🥈 Finalist"
  },
  {
    image: "/images/achievements/aws_cert.jpg",
    title: "AWS Certified Machine Learning",
    desc: "Completed comprehensive training on ML pipelines, SageMaker, and cloud model deployment.",
    year: "2025",
    badge: "🎓 Certified"
  }
];

export default function AchievementSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  // Autoplay logic
  useEffect(() => {
    if (isLightboxOpen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
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
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-16 relative">
      {/* Main Slider Panel */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden glass border border-border/40 group">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(e, info) => {
              if (info.offset.x > 80) handlePrev();
              else if (info.offset.x < -80) handleNext();
            }}
          >
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
            
            {/* Overlay Gradient with Details */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-color via-bg-color/40 to-transparent flex flex-col justify-end p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-cyan bg-cyan/10 px-2.5 py-0.5 rounded border border-cyan/25">
                  {slides[currentIndex].year}
                </span>
                <span className="font-mono text-xs text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/25">
                  {slides[currentIndex].badge}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
                {slides[currentIndex].title}
              </h3>
              <p className="text-text-secondary text-sm md:text-base max-w-2xl leading-relaxed">
                {slides[currentIndex].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hover Overlay Maximize Button */}
        <button 
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-surface-color/60 border border-border/40 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md hover:bg-cyan/15 hover:border-cyan/40"
        >
          <Maximize2 className="w-4 h-4 text-cyan" />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-surface-color/60 border border-border/40 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md hover:bg-cyan/15 hover:border-cyan/40"
        >
          <ChevronLeft className="w-5 h-5 text-cyan" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-surface-color/60 border border-border/40 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md hover:bg-cyan/15 hover:border-cyan/40"
        >
          <ChevronRight className="w-5 h-5 text-cyan" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2.5 mt-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-cyan' : 'w-2 bg-text-muted/40 hover:bg-cyan/55'
            }`}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
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
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10"
              />
              <div className="mt-4 text-center">
                <h4 className="text-white text-lg font-bold">{slides[currentIndex].title}</h4>
                <p className="text-gray-400 text-sm">{slides[currentIndex].desc}</p>
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
    </div>
  );
}
