# Achievements Slider Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate a premium, responsive horizontal achievements slider carousel with a fullscreen lightbox view into the lower Achievements section of the portfolio.

**Architecture:** Create a self-contained React slider component using Framer Motion for animations and Lucide icons for UI controls. Render it inside the existing Achievements page, feeding it local images stored in the public assets folder.

**Tech Stack:** React, Tailwind CSS, Framer Motion, Lucide React

---

### Task 1: Generate Mock Images

**Files:**
- Create: `public/images/achievements/techathon_winner.png`
- Create: `public/images/achievements/pandora_hackathon.png`
- Create: `public/images/achievements/aws_cert.png`

- [ ] **Step 1: Generate Techathon Winner dummy image**
  Use `generate_image` tool with:
  * Prompt: "A high-fidelity modern digital certificate for a Hackathon Winner. Sleek dark background with gold accents, glowing blue lines, text reading 'Techathon 3.0 Winner - Best Solution EcoBounty', futuristic certificate style."
  * ImageName: "techathon_winner"
  Wait for it to save as an artifact, then move it to `public/images/achievements/techathon_winner.png`.

- [ ] **Step 2: Generate Pandora Hackathon dummy image**
  Use `generate_image` tool with:
  * Prompt: "A high-fidelity digital certificate of appreciation for a Smart Cities hackathon. Sleek dark background with cyan accents, digital grid lines, text reading 'Pandora Hackathon - AI for Smart Cities', professional modern certificate."
  * ImageName: "pandora_hackathon"
  Wait for it to save as an artifact, then move it to `public/images/achievements/pandora_hackathon.png`.

- [ ] **Step 3: Generate AWS Certificate dummy image**
  Use `generate_image` tool with:
  * Prompt: "A professional AWS Machine Learning Specialty certificate style design. Sleek modern layout with AWS orange and dark blue colors, text reading 'AWS Certified Machine Learning - Specialty Prep completion', clean modern branding."
  * ImageName: "aws_cert"
  Wait for it to save as an artifact, then move it to `public/images/achievements/aws_cert.png`.

- [ ] **Step 4: Commit images**
  Run:
  ```bash
  git add public/images/achievements/
  git commit -m "assets: add dummy hackathon and certificate images"
  ```

---

### Task 2: Implement AchievementSlider Component

**Files:**
- Create: `src/components/AchievementSlider.jsx`

- [ ] **Step 1: Create AchievementSlider.jsx with full sliding and lightbox features**
  Create `src/components/AchievementSlider.jsx` with the following code:
  ```jsx
  import React, { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

  const slides = [
    {
      image: "/images/achievements/techathon_winner.png",
      title: "Winner - Techathon 3.0",
      desc: "Best Solution Award for EcoBounty, an AI-powered environmental reporting platform.",
      year: "2026",
      badge: "🏆 1st Place"
    },
    {
      image: "/images/achievements/pandora_hackathon.png",
      title: "Pandora Hackathon",
      desc: "Recognized for innovative design and execution in the AI for Smart Cities track.",
      year: "2026",
      badge: "🥈 Finalist"
    },
    {
      image: "/images/achievements/aws_cert.png",
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
            >
              <img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                className="w-full h-full object-cover select-none"
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
            className="absolute top-4 right-4 p-2.5 rounded-full bg-surface/60 border border-border/40 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md hover:bg-cyan/15 hover:border-cyan/40"
          >
            <Maximize2 className="w-4 h-4 text-cyan" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-surface/60 border border-border/40 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md hover:bg-cyan/15 hover:border-cyan/40"
          >
            <ChevronLeft className="w-5 h-5 text-cyan" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-surface/60 border border-border/40 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md hover:bg-cyan/15 hover:border-cyan/40"
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
  ```

- [ ] **Step 2: Commit AchievementSlider component**
  Run:
  ```bash
  git add src/components/AchievementSlider.jsx
  git commit -m "feat: implement AchievementSlider component"
  ```

---

### Task 3: Integrate AchievementSlider into Achievements Section

**Files:**
- Modify: `src/components/Achievements.jsx`

- [ ] **Step 1: Render AchievementSlider inside Achievements.jsx**
  Modify `src/components/Achievements.jsx` to import and render `AchievementSlider` below the Title block and above the grid:
  ```diff
  diff --git a/src/components/Achievements.jsx b/src/components/Achievements.jsx
  --- a/src/components/Achievements.jsx
  +++ b/src/components/Achievements.jsx
  @@ -2,2 +2,3 @@
   import { Award, ShieldAlert, GraduationCap, Cloud } from 'lucide-react';
   import { resumeData } from '../data/resumeData';
  +import AchievementSlider from './AchievementSlider';
   
   export default function Achievements() {
  @@ -31,2 +32,5 @@
           </div>
   
  +        {/* Visual Achievements Slider */}
  +        <AchievementSlider />
  +
           {/* Grid of achievement cards */}
  ```

- [ ] **Step 2: Commit integration changes**
  Run:
  ```bash
  git add src/components/Achievements.jsx
  git commit -m "feat: integrate AchievementSlider into Achievements section"
  ```

---

### Task 4: Final Verification

**Files:**
- Modify: None

- [ ] **Step 1: Check Dev Server**
  Make sure Vite dev server is running, or start it via `npm run dev`. Navigate to `http://localhost:5173/` or the active dev server port.
  Verify that:
  - The new slider is visible and autoplay works.
  - Controls work (left/right arrows, dot indicators).
  - Hovering pauses autoplay.
  - Clicking a slide opens the lightbox.
  - Lightbox controls work, and clicking outside or pressing close closes it.
