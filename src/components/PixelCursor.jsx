import React, { useEffect, useRef } from 'react';

// ─── Speech Bubble Messages ───────────────────────────────────────────────────
const MESSAGES = [
  "I've walked five miles and I'm still stuck in this section.",
  "My pixel-legs are getting quite the workout!",
  "Ooh, nice projects you have here! 👀",
  "Still following you… as a loyal companion! ⚔️",
  "Have you checked out the Projects section yet?",
  "This developer really knows their craft!",
  "Beep boop! Pixel guardian at your service!",
  "Click something! Go on, I dare you!",
  "Level 99 Developer detected! 🎮",
  "I follow your cursor like a loyal knight! 🗡️",
  "Loading awesomeness… done! You're welcome. ✨",
];

const SCALE = 3;        // px per pixel-art pixel
const CW    = 22;       // canvas logical width  (in pixel-art pixels)
const CH    = 32;       // canvas logical height

// ─── Pixel art character drawing (procedural) ─────────────────────────────────
function drawCharacter(ctx, walkPhase, isMoving, scale) {
  // Walk cycle values (quantised to keep the pixel-art feel)
  const wave      = isMoving ? Math.sin(walkPhase * Math.PI * 2) : 0;
  const bob       = isMoving ? Math.round(Math.abs(wave) * 1.5) : 0;
  const legOff    = isMoving ? Math.round(wave * 3.5) : 0;   // ±3 pixel swing
  const armOff    = isMoving ? Math.round(-wave * 2.5) : 0;  // opposite to legs

  // Helper: fill a pixel-art rect (coordinates in logic pixels)
  const r = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(
      Math.round(x) * scale,
      (Math.round(y) + bob) * scale,
      Math.round(w) * scale,
      Math.round(h) * scale,
    );
  };

  // ── Helmet / Hair ──────────────────────────────────────────────────────────
  r(6, 0, 10, 1, '#14381c');   // very top
  r(5, 1, 12, 1, '#1a4a24');
  r(4, 2, 14, 2, '#246b34');
  r(4, 2, 14, 1, '#34924a');   // highlight top edge
  r(3, 4,  2, 2, '#1a4a24');   // left ear flap
  r(17,4,  2, 2, '#1a4a24');   // right ear flap
  r(5, 4, 12, 1, '#34924a');   // helmet highlight band

  // Visor
  r(4, 3,  14, 2, '#2c5880');  // visor dark
  r(5, 3,  12, 1, '#4a80b0');  // visor highlight
  r(4, 4,   2, 1, '#1c3860');  // visor left end
  r(16,4,   2, 1, '#1c3860');  // visor right end

  // ── Face ──────────────────────────────────────────────────────────────────
  r(5,  6, 12, 5, '#ecc07a');  // skin base
  r(5,  6, 12, 1, '#d4a05a');  // top shadow
  r(5, 10, 12, 1, '#c49050');  // chin shadow

  // Eyes — white
  r(6,  7, 2, 2, '#f8f2e2');
  r(14, 7, 2, 2, '#f8f2e2');
  // Pupils
  r(7,  8, 1, 1, '#101428');
  r(15, 8, 1, 1, '#101428');
  // Eyebrows
  r(6,  6, 3, 1, '#1a4a24');
  r(13, 6, 3, 1, '#1a4a24');

  // ── Neck ──────────────────────────────────────────────────────────────────
  r(9, 11, 4, 1, '#d4a05a');

  // ── Left arm (swings forward with +wave) ──────────────────────────────────
  const lArmY = 12 + armOff;
  r(1, lArmY,     3, 7, '#2a4468');   // upper arm
  r(1, lArmY + 7, 3, 3, '#ecc07a');  // hand

  // ── Right arm (swings back with +wave) ─────────────────────────────────────
  const rArmY = 12 - armOff;
  r(18, rArmY,     3, 7, '#2a4468');
  r(18, rArmY + 7, 3, 3, '#ecc07a');

  // ── Torso / Armour ────────────────────────────────────────────────────────
  r(4, 12, 14, 8, '#263e5a');  // body
  r(5, 12, 12, 1, '#3a5e7a');  // top shoulder shine
  r(5, 16, 12, 1, '#3a5e7a');  // mid shine
  r(8, 13,  6, 5, '#3a6080');  // chest plate
  r(9, 14,  4, 1, '#52a0c8');  // chest plate highlight
  r(10,13,  2, 1, '#f8c830');  // badge / detail

  // ── Belt ──────────────────────────────────────────────────────────────────
  r(4, 20, 14, 2, '#6a5020');
  r(5, 20, 12, 1, '#8a7030');  // belt highlight
  r(10,20,  2, 2, '#c0a040');  // buckle

  // ── Left leg (forward on +wave) ───────────────────────────────────────────
  const lLeg = -legOff;  // forward = up
  r(5, 22 + lLeg, 5, 6, '#243858');
  r(4, 28 + lLeg, 7, 2, '#180e04');   // boot
  r(4, 27 + lLeg, 3, 1, '#342014');   // boot highlight

  // ── Right leg (back on +wave) ─────────────────────────────────────────────
  const rLeg = legOff;
  r(12, 22 + rLeg, 5, 6, '#243858');
  r(11, 28 + rLeg, 7, 2, '#180e04');
  r(11, 27 + rLeg, 3, 1, '#342014');
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function PixelCursor() {
  const canvasRef = useRef(null);
  const bubbleRef = useRef(null);
  const dotRef    = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const canvas  = canvasRef.current;
    const bubble  = bubbleRef.current;
    const dot     = dotRef.current;
    const ctx     = canvas.getContext('2d');

    canvas.width  = CW * SCALE;
    canvas.height = CH * SCALE + SCALE * 8; // extra room for leg swing

    // ── State (all in a ref to avoid React re-renders) ────────────────────
    const s = {
      // Raw mouse
      mouseX: -300, mouseY: -300,
      // Smoothed character origin (bottom-centre of sprite)
      charX: -300, charY: -300,
      // Motion
      walkPhase: 0,
      isMoving: false,
      facingLeft: false,
      // Bubble
      bubbleVisible: false,
      idleTime: 0,
      msgIdx: 0,
      prevCharX: -300,
      lastTime: performance.now(),
    };

    // ── Bubble helpers ────────────────────────────────────────────────────
    let hideTimer = null;
    function showBubble(text) {
      clearTimeout(hideTimer);
      bubble.textContent = text;
      bubble.style.opacity  = '1';
      bubble.style.transform = 'scale(1) translateY(0)';
      s.bubbleVisible = true;
      hideTimer = setTimeout(() => {
        bubble.style.opacity   = '0';
        bubble.style.transform = 'scale(0.85) translateY(6px)';
        setTimeout(() => { s.bubbleVisible = false; }, 350);
      }, 4500);
    }

    // ── Main animation loop ───────────────────────────────────────────────
    function loop(now) {
      const dt = Math.min((now - s.lastTime) / 1000, 0.05);
      s.lastTime = now;

      // Lerp character position toward cursor (smooth follow)
      const speed = 10;
      s.charX += (s.mouseX - s.charX) * (1 - Math.exp(-speed * dt));
      s.charY += (s.mouseY - s.charY) * (1 - Math.exp(-speed * dt));

      // Direction & movement detection
      const dx = s.charX - s.prevCharX;
      s.isMoving = Math.abs(dx) > 0.3 || Math.abs(s.charY - (s.mouseY - 1)) > 0.3;

      // Speed-up walk phase based on movement
      const moveSpd = Math.min(Math.abs(dx) / 3, 1);
      if (s.isMoving) {
        s.walkPhase = (s.walkPhase + dt * (3 + moveSpd * 4)) % 1;
        s.idleTime  = 0;
      } else {
        s.idleTime += dt;
        if (s.idleTime > 2.8 && !s.bubbleVisible) {
          showBubble(MESSAGES[s.msgIdx % MESSAGES.length]);
          s.msgIdx++;
          s.idleTime = 0;
        }
      }

      if (dx < -0.4) s.facingLeft = true;
      else if (dx > 0.4) s.facingLeft = false;

      s.prevCharX = s.charX;

      // ── Position canvas ──
      const cx = s.charX - (CW * SCALE) / 2;
      const cy = s.charY - CH * SCALE;
      canvas.style.transform = `translate(${cx}px, ${cy}px)`;

      // ── Mirror context for facing direction ──
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      if (s.facingLeft) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      drawCharacter(ctx, s.walkPhase, s.isMoving, SCALE);
      ctx.restore();

      // ── Position dot at exact cursor ──
      dot.style.transform = `translate(${s.mouseX - 4}px, ${s.mouseY - 4}px)`;

      // ── Position speech bubble ──
      const bubbleOnLeft = s.charX > window.innerWidth * 0.55;
      bubble.style.left   = bubbleOnLeft ? `${s.charX - 240}px` : `${s.charX + 20}px`;
      bubble.style.top    = `${cy - 100}px`;

      // Tail direction
      bubble.dataset.dir = bubbleOnLeft ? 'right' : 'left';

      rafRef.current = requestAnimationFrame(loop);
    }

    // ── Event listeners ───────────────────────────────────────────────────
    function onMove(e) {
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
    }
    function onClick() {
      showBubble(MESSAGES[s.msgIdx % MESSAGES.length]);
      s.msgIdx++;
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(hideTimer);
    };
  }, []);

  // Don't render anything on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <style>{`
        /* Hide native cursor site-wide */
        *, *::before, *::after { cursor: none !important; }

        /* Canvas for the pixel character */
        .pc-canvas {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 99997;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
          will-change: transform;
        }

        /* Tiny glowing dot = exact cursor tip */
        .pc-dot {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          background: #00D4FF;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          box-shadow: 0 0 0 2px rgba(0,212,255,0.3), 0 0 12px #00D4FF;
          will-change: transform;
        }

        /* Speech bubble — pixel-art retro style */
        .pc-bubble {
          position: fixed;
          top: 0; left: 0;
          background: #ffffff;
          color: #101428;
          border: 3px solid #101428;
          border-radius: 6px;
          padding: 10px 14px;
          max-width: 210px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.6;
          box-shadow: 4px 4px 0 #101428;
          pointer-events: none;
          z-index: 99998;
          opacity: 0;
          transform: scale(0.85) translateY(6px);
          transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          will-change: opacity, transform;
        }

        /* Bubble tail pointing DOWN (character is below bubble) */
        .pc-bubble::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 18px;
          border: 7px solid transparent;
          border-top-color: #101428;
        }
        .pc-bubble::before {
          content: '';
          position: absolute;
          bottom: -11px;
          left: 19px;
          border: 6px solid transparent;
          border-top-color: #ffffff;
          z-index: 1;
        }

        /* Tail on right side when bubble is to the right of character */
        .pc-bubble[data-dir="right"]::after {
          left: auto;
          right: 18px;
        }
        .pc-bubble[data-dir="right"]::before {
          left: auto;
          right: 19px;
        }
      `}</style>

      {/* Pixel character canvas */}
      <canvas ref={canvasRef} className="pc-canvas" />

      {/* Exact cursor dot */}
      <div ref={dotRef} className="pc-dot" />

      {/* Speech bubble */}
      <div ref={bubbleRef} className="pc-bubble" data-dir="left" />
    </>
  );
}
