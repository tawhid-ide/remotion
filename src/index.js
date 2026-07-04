import React from 'react';
import { registerRoot, Composition, useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from 'remotion';

// ------------------------------------------------------------------
// 1. Apple Logo SVG (minimalist leaf + apple silhouette)
// ------------------------------------------------------------------
const AppleLogo: React.FC<{ scale?: number; opacity?: number }> = ({ scale = 1, opacity = 1 }) => (
  <svg
    viewBox="0 0 40 48"
    width={40 * scale}
    height={48 * scale}
    style={{ opacity, display: 'block' }}
    fill="white"
  >
    <path d="M26.5 10.2c-1.4 0-2.8.6-3.8 1.6-.9.9-1.6 2.1-1.6 3.4 0 1.3.5 2.4 1.4 3.3.9.9 2.2 1.6 3.6 1.6 1.4 0 2.8-.6 3.8-1.6.9-.9 1.6-2.1 1.6-3.4 0-1.3-.6-2.5-1.5-3.4-.9-.9-2.1-1.5-3.5-1.5zm-5.6 21.5c-1.1 0-2-.4-2.8-1.2-.8-.8-1.2-1.7-1.2-2.8 0-1.1.4-2 1.2-2.8.8-.8 1.7-1.2 2.8-1.2 1.1 0 2 .4 2.8 1.2.8.8 1.2 1.7 1.2 2.8 0 1.1-.4 2-1.2 2.8-.8.8-1.7 1.2-2.8 1.2zM20 40c-2.4 0-4.4-.8-5.8-2.2-1.4-1.4-2.2-3.2-2.2-5.4 0-2.2.8-4 2.2-5.4 1.4-1.4 3.4-2.2 5.8-2.2s4.4.8 5.8 2.2c1.4 1.4 2.2 3.2 2.2 5.4 0 2.2-.8 4-2.2 5.4C24.4 39.2 22.4 40 20 40z" />
  </svg>
);

// ------------------------------------------------------------------
// 2. iPhone 15 Pro outline (side/front stylized vector)
// ------------------------------------------------------------------
const iPhoneSVG: React.FC<{ scale?: number; rotation?: number }> = ({ scale = 1, rotation = 0 }) => (
  <div
    style={{
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      transformOrigin: 'center center',
    }}
  >
    <svg width="240" height="500" viewBox="0 0 240 500" fill="none">
      {/* Outer frame – titanium edge */}
      <rect x="4" y="4" width="232" height="492" rx="40" stroke="#B9A68E" strokeWidth="8" />
      {/* Body – darker inner */}
      <rect x="10" y="10" width="220" height="480" rx="36" fill="#1C1C1E" />
      {/* Screen glass */}
      <rect x="18" y="18" width="204" height="464" rx="30" fill="#0A0A0C" />
      {/* Dynamic Island */}
      <rect x="80" y="28" width="80" height="28" rx="14" fill="#1C1C1E" />
      {/* Bottom home indicator (subtle) */}
      <rect x="100" y="460" width="40" height="4" rx="2" fill="#3A3A3C" />
      {/* Side buttons – left */}
      <rect x="0" y="120" width="6" height="30" rx="3" fill="#B9A68E" />
      <rect x="0" y="170" width="6" height="50" rx="3" fill="#B9A68E" />
      {/* Right side button */}
      <rect x="234" y="200" width="6" height="60" rx="3" fill="#B9A68E" />
      {/* Camera bump (back outline – simplified) */}
      <rect x="60" y="420" width="120" height="120" rx="60" fill="#1C1C1E" stroke="#B9A68E" strokeWidth="4" />
      <circle cx="120" cy="470" r="25" fill="#0A0A0C" stroke="#3A3A3C" strokeWidth="2" />
      <circle cx="90" cy="450" r="12" fill="#0A0A0C" stroke="#3A3A3C" strokeWidth="2" />
      <circle cx="150" cy="450" r="12" fill="#0A0A0C" stroke="#3A3A3C" strokeWidth="2" />
    </svg>
  </div>
);

// ------------------------------------------------------------------
// 3. Word‑by‑word reveal component (staggered opacity + translation)
// ------------------------------------------------------------------
const StaggeredText: React.FC<{
  words: string[];
  startFrame: number;
  wordGap?: number;
  initialY?: number;
  color?: string;
  fontSize?: number;
}> = ({ words, startFrame, wordGap = 8, initialY = 30, color = 'white', fontSize = 64 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4em' }}>
      {words.map((word, i) => {
        const delay = i * wordGap;
        const wordStart = startFrame + delay;
        const progress = spring({
          frame: frame - wordStart,
          fps,
          config: { damping: 12, stiffness: 100 },
        });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const y = interpolate(progress, [0, 1], [initialY, 0]);

        return (
          <span
            key={i}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              color,
              fontSize,
              fontWeight: 600,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// ------------------------------------------------------------------
// 4. Main Commercial Component
// ------------------------------------------------------------------
const AppleCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ---- scene durations (in frames) ----
  const LOGO_END = 40;
  const INTRO_END = 80;
  const DEVICE_END = 130;
  const TEXT_REVEAL_END = 180;
  const OUTRO_START = 180;
  const TOTAL = 210; // 7 sec at 30 fps

  // ---- dynamic background gradient (smooth mood shift) ----
  const gradientShift = interpolate(frame, [0, TOTAL], [0, 1]);
  const bgHue = interpolate(gradientShift, [0, 0.4, 0.7, 1], [220, 225, 215, 220]); // subtle blue/gray travel
  const bgLight = interpolate(gradientShift, [0, 0.5, 1], [8, 12, 8]);

  // ---- scene 1: Apple logo with spring scale + fade ----
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
    delay: 5,
  });
  const logoOpacity = interpolate(frame, [0, 15, LOGO_END, LOGO_END + 15], [0, 1, 1, 0]);

  // ---- scene 2: "Introducing" words ----
  const introWords = ['Introducing'];

  // ---- scene 3: iPhone device entrance (scale + rotation) ----
  const deviceProgress = spring({
    frame: frame - DEVICE_END + 30, // start before DEVICE_END for overlap
    fps,
    config: { damping: 14, stiffness: 70 },
    delay: 0,
  });
  // Device appears slightly later, peaking around 90-130
  const deviceScale = interpolate(
    spring({
      frame: frame - 80,
      fps,
      config: { damping: 12, stiffness: 90 },
    }),
    [0, 1],
    [0.7, 1]
  );
  const deviceRotation = interpolate(
    spring({
      frame: frame - 85,
      fps,
      config: { damping: 20, stiffness: 80 },
    }),
    [0, 1],
    [15, 0]
  );
  const deviceOpacity = interpolate(frame, [75, 90], [0, 1], { extrapolateRight: 'clamp' });

  // ---- scene 4: product name "iPhone 15 Pro" plus tagline ----
  const productWords = ['iPhone', '15', 'Pro'];
  const tagline = ['Titanium.', 'So strong.', 'So light.'];

  // ---- scene 5: outro (logo + end) ----
  const outroOpacity = interpolate(frame, [OUTRO_START, OUTRO_START + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const outroScale = spring({
    frame: frame - OUTRO_START,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at center, hsl(${bgHue}, 50%, ${bgLight}%), hsl(${bgHue - 10}, 40%, 4%))`,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      }}
    >
      {/* ---------- SCENE 1: Apple logo ---------- */}
      {frame < LOGO_END + 20 && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <AppleLogo scale={logoScale * 1.5} opacity={logoOpacity} />
        </AbsoluteFill>
      )}

      {/* ---------- SCENE 2: Introducing ---------- */}
      {frame > 25 && frame < INTRO_END + 20 && (
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 80,
          }}
        >
          <StaggeredText
            words={introWords}
            startFrame={30}
            wordGap={5}
            initialY={20}
            fontSize={48}
            color="rgba(255,255,255,0.9)"
          />
        </AbsoluteFill>
      )}

      {/* ---------- SCENE 3: Device ---------- */}
      {frame > 70 && frame < DEVICE_END + 30 && (
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            opacity: deviceOpacity,
          }}
        >
          <iPhoneSVG scale={deviceScale} rotation={deviceRotation} />
        </AbsoluteFill>
      )}

      {/* ---------- SCENE 4: Product text and tagline ---------- */}
      {frame > 110 && (
        <>
          {/* Main product name */}
          <AbsoluteFill
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 280,
              transition: 'all 0.3s',
            }}
          >
            <StaggeredText
              words={productWords}
              startFrame={120}
              wordGap={12}
              initialY={40}
              fontSize={96}
              color="white"
            />
          </AbsoluteFill>

          {/* Tagline */}
          <AbsoluteFill
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 160,
            }}
          >
            <StaggeredText
              words={tagline}
              startFrame={150}
              wordGap={15}
              initialY={30}
              fontSize={40}
              color="rgba(255,255,255,0.7)"
            />
          </AbsoluteFill>
        </>
      )}

      {/* ---------- SCENE 5: Outro (logo + subtle text) ---------- */}
      {frame >= OUTRO_START && (
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            opacity: outroOpacity,
            gap: 30,
          }}
        >
          <AppleLogo scale={outroScale * 1.3} opacity={1} />
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: 'white',
              letterSpacing: '0.3em',
              marginTop: 30,
            }}
          >
            WATCH THE FILM
          </div>
        </AbsoluteFill>
      )}

      {/* subtle vignette overlay (always) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.3) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------
// 5. Remotion root registration
// ------------------------------------------------------------------
const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AppleCommercial"
      component={AppleCommercial}
      durationInFrames={210} // 7 seconds at 30 fps
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(RemotionRoot);
