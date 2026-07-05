import React from 'react';
import {
  registerRoot,
  Composition,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from 'remotion';

// ------------------------------------------------------------------
// 1. Apple Logo SVG (unchanged)
// ------------------------------------------------------------------
const AppleLogo: React.FC<{ scale?: number; opacity?: number }> = ({
  scale = 1,
  opacity = 1,
}) => (
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
// 2. iPhone SVG (unchanged)
// ------------------------------------------------------------------
const iPhoneSVG: React.FC<{ scale?: number; rotation?: number }> = ({
  scale = 1,
  rotation = 0,
}) => (
  <div
    style={{
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      transformOrigin: 'center center',
    }}
  >
    <svg width="240" height="500" viewBox="0 0 240 500" fill="none">
      <rect
        x="4"
        y="4"
        width="232"
        height="492"
        rx="40"
        stroke="#B9A68E"
        strokeWidth="8"
      />
      <rect x="10" y="10" width="220" height="480" rx="36" fill="#1C1C1E" />
      <rect x="18" y="18" width="204" height="464" rx="30" fill="#0A0A0C" />
      <rect x="80" y="28" width="80" height="28" rx="14" fill="#1C1C1E" />
      <rect x="100" y="460" width="40" height="4" rx="2" fill="#3A3A3C" />
      <rect x="0" y="120" width="6" height="30" rx="3" fill="#B9A68E" />
      <rect x="0" y="170" width="6" height="50" rx="3" fill="#B9A68E" />
      <rect x="234" y="200" width="6" height="60" rx="3" fill="#B9A68E" />
      <rect
        x="60"
        y="420"
        width="120"
        height="120"
        rx="60"
        fill="#1C1C1E"
        stroke="#B9A68E"
        strokeWidth="4"
      />
      <circle cx="120" cy="470" r="25" fill="#0A0A0C" stroke="#3A3A3C" strokeWidth="2" />
      <circle cx="90" cy="450" r="12" fill="#0A0A0C" stroke="#3A3A3C" strokeWidth="2" />
      <circle cx="150" cy="450" r="12" fill="#0A0A0C" stroke="#3A3A3C" strokeWidth="2" />
    </svg>
  </div>
);

// ------------------------------------------------------------------
// 3. StaggeredText (unchanged core logic)
// ------------------------------------------------------------------
const StaggeredText: React.FC<{
  words: string[];
  startFrame: number;
  wordGap?: number;
  initialY?: number;
  color?: string;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({
  words,
  startFrame,
  wordGap = 8,
  initialY = 30,
  color = 'white',
  fontSize = 64,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.4em',
        ...style,
      }}
    >
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
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
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
// 4. NEW: Gradient Orb (subtle background pulse)
// ------------------------------------------------------------------
const GradientOrb: React.FC<{
  startFrame: number;
  endFrame: number;
  color: string;
  size: number;
  x: number;
  y: number;
}> = ({ startFrame, endFrame, color, size, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const disappear = interpolate(frame, [endFrame - 10, endFrame], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = appear * disappear;
  const scale = interpolate(appear, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)`,
        opacity,
        transform: `scale(${scale})`,
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }}
    />
  );
};

// ------------------------------------------------------------------
// 5. NEW: Floating Particles (slow drifting)
// ------------------------------------------------------------------
const Particle: React.FC<{
  startFrame: number;
  endFrame: number;
  x: (progress: number) => number;
  y: (progress: number) => number;
  size: number;
  color: string;
}> = ({ startFrame, endFrame, x, y, size, color }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 10, endFrame - 10, endFrame],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x(progress),
        top: y(progress),
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        opacity,
        boxShadow: `0 0 10px ${color}`,
        pointerEvents: 'none',
      }}
    />
  );
};

// ------------------------------------------------------------------
// 6. NEW: Circular Reveal (scene transition mask)
// ------------------------------------------------------------------
const CircularReveal: React.FC<{
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
  reverse?: boolean;
}> = ({ children, startFrame, endFrame, reverse = false }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 20, stiffness: 90 },
  });
  const clamped = interpolate(progress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const radiusPx = interpolate(
    reverse ? 1 - clamped : clamped,
    [0, 1],
    [0, Math.max(width, height) * 0.7]
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        clipPath: `circle(${radiusPx}px at 50% 50%)`,
        WebkitClipPath: `circle(${radiusPx}px at 50% 50%)`,
      }}
    >
      {children}
    </div>
  );
};

// ------------------------------------------------------------------
// 7. NEW: Decorative Rotating Rings
// ------------------------------------------------------------------
const RotatingRing: React.FC<{
  startFrame: number;
  endFrame: number;
  radius: number;
  strokeColor: string;
  strokeWidth: number;
  rotationSpeed: number; // degrees per frame
  centerX: number;
  centerY: number;
}> = ({
  startFrame,
  endFrame,
  radius,
  strokeColor,
  strokeWidth,
  rotationSpeed,
  centerX,
  centerY,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 15, endFrame - 15, endFrame],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );
  const rotation = frame * rotationSpeed;

  const circumference = 2 * Math.PI * radius;
  const dashLength = circumference * 0.25;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      style={{
        position: 'absolute',
        left: centerX - radius,
        top: centerY - radius,
        opacity,
        transform: `rotate(${rotation}deg)`,
        pointerEvents: 'none',
      }}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dashLength} ${circumference}`}
        strokeLinecap="round"
      />
    </svg>
  );
};

// ------------------------------------------------------------------
// 8. MAIN COMMERCIAL (300 frames / 10 sec)
// ------------------------------------------------------------------
const AppleCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // --- TIMINGS (scaled to 10s) ---
  const LOGO_END = 57;
  const INTRO_START = 43;      // reveal begins
  const DEVICE_REVEAL = 100;   // circular reveal starts
  const DEVICE_END = 229;
  const OUTRO_START = 257;
  const TOTAL = 300;

  // --- Dynamic background gradient ---
  const gradientShift = interpolate(frame, [0, TOTAL], [0, 1]);
  const bgHue = interpolate(gradientShift, [0, 0.3, 0.7, 1], [230, 220, 210, 230]);
  const bgLight = interpolate(gradientShift, [0, 0.5, 1], [6, 10, 6]);

  // --- Logo animation ---
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
    delay: 7,
  });
  const logoOpacity = interpolate(frame, [0, 21, LOGO_END, LOGO_END + 15], [0, 1, 1, 0]);

  // --- iPhone animation ---
  const deviceScale = interpolate(
    spring({ frame: frame - 114, fps, config: { damping: 12, stiffness: 90 } }),
    [0, 1],
    [0.7, 1]
  );
  const deviceRotation = interpolate(
    spring({ frame: frame - 121, fps, config: { damping: 20, stiffness: 80 } }),
    [0, 1],
    [15, 0]
  );
  const deviceOpacity = interpolate(frame, [107, 129], [0, 1], { extrapolateRight: 'clamp' });

  // --- Camera pull-back effect (zoom out slightly) ---
  const cameraZoom = interpolate(frame, [90, 200], [1.05, 1], { extrapolateRight: 'clamp' });

  // --- Outro ---
  const outroOpacity = interpolate(frame, [OUTRO_START, OUTRO_START + 29], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const outroScale = spring({
    frame: frame - OUTRO_START,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // --- Text content ---
  const productWords = ['iPhone', '15', 'Pro'];
  const tagline = ['Titanium.', 'So strong.', 'So light.'];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, hsl(${bgHue}, 40%, ${bgLight}%), hsl(${bgHue - 20}, 50%, 3%))`,
        overflow: 'hidden',
      }}
    >
      {/* ---------- Orbs & Particles (throughout) ---------- */}
      <GradientOrb
        startFrame={0}
        endFrame={80}
        color="hsl(220, 70%, 60%)"
        size={600}
        x={width * 0.3}
        y={height * 0.2}
      />
      <GradientOrb
        startFrame={70}
        endFrame={170}
        color="hsl(35, 80%, 55%)"
        size={500}
        x={width * 0.7}
        y={height * 0.5}
      />
      <GradientOrb
        startFrame={160}
        endFrame={300}
        color="hsl(210, 60%, 50%)"
        size={700}
        x={width * 0.5}
        y={height * 0.3}
      />

      {/* Floating light particles */}
      <Particle
        startFrame={30}
        endFrame={200}
        x={(p) => width * 0.1 + p * width * 0.3}
        y={(p) => height * 0.2 + Math.sin(p * Math.PI * 2) * 50}
        size={4}
        color="rgba(255,255,255,0.6)"
      />
      <Particle
        startFrame={60}
        endFrame={250}
        x={(p) => width * 0.8 - p * width * 0.4}
        y={(p) => height * 0.6 + Math.cos(p * Math.PI * 3) * 80}
        size={6}
        color="rgba(180,160,130,0.5)"
      />
      <Particle
        startFrame={150}
        endFrame={300}
        x={(p) => width * 0.3 + p * width * 0.4}
        y={(p) => height * 0.1 + p * height * 0.2}
        size={3}
        color="rgba(255,255,255,0.4)"
      />

      {/* ---------- SCENE 1: Apple Logo ---------- */}
      {frame < LOGO_END + 15 && (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <AppleLogo scale={logoScale * 1.5} opacity={logoOpacity} />
        </AbsoluteFill>
      )}

      {/* ---------- SCENE 2: Introducing (circular reveal from logo) ---------- */}
      {frame >= INTRO_START && (
        <CircularReveal startFrame={INTRO_START} endFrame={INTRO_START + 25}>
          <AbsoluteFill
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 80,
            }}
          >
            <StaggeredText
              words={['Introducing']}
              startFrame={INTRO_START + 5}
              wordGap={5}
              initialY={20}
              fontSize={52}
              color="rgba(255,255,255,0.95)"
            />
          </AbsoluteFill>
        </CircularReveal>
      )}

      {/* ---------- SCENE 3: Device with surrounding rings ---------- */}
      {frame > 90 && (
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${cameraZoom})`,
            opacity: deviceOpacity,
          }}
        >
          {/* Titanium metallic ring */}
          <RotatingRing
            startFrame={110}
            endFrame={240}
            radius={220}
            strokeColor="#D4AF37"
            strokeWidth={2}
            rotationSpeed={0.5}
            centerX={width / 2}
            centerY={height / 2}
          />
          <RotatingRing
            startFrame={115}
            endFrame={235}
            radius={280}
            strokeColor="#B9A68E"
            strokeWidth={1}
            rotationSpeed={-0.4}
            centerX={width / 2}
            centerY={height / 2}
          />

          {/* iPhone */}
          <iPhoneSVG scale={deviceScale} rotation={deviceRotation} />
        </AbsoluteFill>
      )}

      {/* ---------- SCENE 4: Product name (metallic gradient text) ---------- */}
      {frame > 157 && (
        <>
          <AbsoluteFill
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 280,
            }}
          >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Metallic gradient background for text */}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #E0C08B, #FFFFFF 40%, #C0A060 80%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontSize: 96,
                  fontWeight: 700,
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  letterSpacing: '-0.02em',
                  filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.3))',
                }}
              >
                <StaggeredText
                  words={productWords}
                  startFrame={171}
                  wordGap={12}
                  initialY={40}
                  fontSize={96}
                  color="inherit" // inherit gradient
                  style={{ background: 'none' }}
                />
              </span>
            </div>
          </AbsoluteFill>

          <AbsoluteFill
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 160,
            }}
          >
            <StaggeredText
              words={tagline}
              startFrame={214}
              wordGap={15}
              initialY={30}
              fontSize={40}
              color="rgba(255,255,255,0.7)"
            />
          </AbsoluteFill>
        </>
      )}

      {/* ---------- SCENE 5: Outro ---------- */}
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

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------
// 9. Remotion root (10s)
// ------------------------------------------------------------------
const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AppleCommercial"
      component={AppleCommercial}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(RemotionRoot);
