# Design Specification: Achievements Slider

This document specifies the architecture, components, and integration of a premium achievements/hackathon image slider (carousel) for the Portfolio website.

## 1. Goals & Placement
* Introduce a highly visual horizontal carousel section inside the existing Achievements component.
* Keep the existing text-based achievement cards grid intact below the new visual slider to maintain detailed descriptions and dates.
* Provide 3 high-quality dummy hackathon/certificate images that the user can easily replace with their own images.
* Add a fullscreen lightbox zoom view for selected images.

## 2. Directory & Component Structure
* **Component file**: `src/components/AchievementSlider.jsx`
* **Static Assets**:
  * `/public/images/achievements/techathon_winner.png`
  * `/public/images/achievements/pandora_hackathon.png`
  * `/public/images/achievements/aws_cert.png`

## 3. Detailed Component Spec (`AchievementSlider.jsx`)
* **State**:
  * `currentIndex`: Active index of the slide image.
  * `isLightboxOpen`: Boolean to control fullscreen zoom overlays.
  * `lightboxIndex`: Active index of the lightbox viewer.
* **Dependencies**:
  * `framer-motion`: For slide exit/entry transitions, swiping, and lightbox zoom animation.
  * `lucide-react`: For `ChevronLeft`, `ChevronRight`, `Maximize2`, `X` icons.
* **Interactions**:
  * Autoplay with pause on hover.
  * Drag-to-swipe behavior on touch screens.
  * Left and Right navigation buttons (arrows).
  * Navigation dots showing slide progress.
  * Clicking the image opens the Fullscreen Lightbox.

## 4. Verification Plan
* Start development server: `npm run dev` and navigate to local address.
* Verify responsiveness on desktop, tablet, and mobile views.
* Verify autoplay transitions, manual navigation (dots/arrows), and lightbox functionality.
