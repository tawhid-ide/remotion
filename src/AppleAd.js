import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont();

/* ============================================================
   ১) কনফিগ — এখান থেকে প্রোডাক্টের নাম, লাইন, কালার বদলান
   Everything you'll want to customize lives right here.
   ============================================================ */
const CONFIG = {
  productName: 'NOVA',
  eyebrow: 'INTRODUCING',
  line1: 'Engineered to perform.',
  line1Sub: 'Premium materials. Precision build.',
  line2: 'Smarter. Faster. Lighter.',
  line2Sub: 'Performance that keeps up with you.',
  statement: 'This changes everything.',
  ctaLine: 'Available soon.',
  accent: '#CBA35C', // warm champagne gold — swap to '#22d3ee' for Michom cyan
  bg: '#050506',
  textPrimary: '#F5F5F7',
};

/* ---------- Reusable device shape (pure CSS, no external assets) ---------- */
const ProductShape = ({ accent, glowShift = 0, scale = 1 }) => (
  <div
    style={{
      width: 380 * scale,
      height: 560 * scale,
      borderRadius: 54 * scale,
      background: 'linear-gradient(155deg, #26262a 0%, #131315 55%, #08080a 100%)',
      border: '1px solid rgba(255,255,255,0.09)',
      boxShadow:
        'inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -16px 34px rgba(0,0,0,0.65), 0 60px 100px rgba(0,0,0,0.55)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 14 * scale,
        borderRadius: 40 * scale,
        background: `radial-gradient(circle at ${50 + glowShift}% 22%, ${accent}4d, #050506 68%)`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${-45 + glowShift}%`,
          width: '55%',
          height: '100%',
          background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.14), transparent)',
          transform: 'skewX(-18deg)',
        }}
      />
    </div>
  </div>
);

/* ---------- Cinematic grain overlay, sits on top of everything ---------- */
const Grain = () => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.045, mixBlendMode: 'overlay' }}>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

/* ============================================================
   ২) সিন ১ — ইন্ট্রো: আলো এক জায়গায় জড়ো হচ্ছে (সিগনেচার মোমেন্ট)
   Scene 1 — Intro: light energy converges toward center
   ============================================================ */
const IntroScene = ({ accent, bg }) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 22), [-1, 1], [0.85, 1.25]);
  const fadeOut = interpolate(frame, [50, 70], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rayCount = 10;
  const rays = new Array(rayCount).fill(0).map((_, i) => {
    const angle = (360 / rayCount) * i;
    const travel = interpolate(frame, [8, 55], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.cubic),
    });
    const rayOpacity = interpolate(frame, [8, 28, 55], [0, 0.9, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return { angle, travel, rayOpacity };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bg, opacity: fadeOut }}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        {rays.map((r, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 2,
              height: 220 * r.travel + 16,
              background: `linear-gradient(to bottom, transparent, ${accent})`,
              opacity: r.rayOpacity,
              transform: `rotate(${r.angle}deg) translateY(-${120 * r.travel + 30}px)`,
            }}
          />
        ))}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}, transparent 70%)`,
            transform: `scale(${pulse})`,
            filter: 'blur(1.5px)',
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ============================================================
   ৩) সিন ২ — প্রোডাক্ট রিভিল
   Scene 2 — Product reveal: spring-in, slow tilt, soft reflection
   ============================================================ */
const ProductRevealScene = ({ accent, bg, productName, eyebrow, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 90, mass: 1 } });
  const rotateY = interpolate(frame, [0, duration], [-14, 14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });
  const floatY = Math.sin(frame / 28) * 10;
  const exitOpacity = interpolate(frame, [duration - 20, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const eyebrowOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nameOpacity = interpolate(frame, [45, 68], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nameY = interpolate(frame, [45, 68], [14, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: bg, opacity: exitOpacity }}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', perspective: 1200 }}>
        <div style={{ transform: `translateY(${floatY}px) scale(${scale}) rotateY(${rotateY}deg)` }}>
          <ProductShape accent={accent} />
        </div>
        <div
          style={{
            position: 'absolute',
            transform: `translateY(${300 + floatY}px) scale(${scale}, ${-scale})`,
            opacity: 0.2,
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 65%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 65%)',
          }}
        >
          <ProductShape accent={accent} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 130 }}>
        <div
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 8,
            color: accent,
            opacity: eyebrowOpacity,
            marginBottom: 14,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 10,
            color: '#fff',
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
          }}
        >
          {productName}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ============================================================
   ৪) সিন ৩ ও ৪ — ফিচার হাইলাইট (দুই কলাম, একটা বাম-ডান ফ্লিপ হয়)
   Scenes 3 & 4 — Feature split-screens, layout flips for rhythm
   ============================================================ */
const FeatureScene = ({ accent, bg, textPrimary, headline, subtext, flip = false, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textX = interpolate(frame, [0, 26], [flip ? -50 : 50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const productScale = spring({ frame, fps, config: { damping: 16, stiffness: 100 } });
  const exitOpacity = interpolate(frame, [duration - 18, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sweep = interpolate(frame, [6, duration - 6], [-22, 22], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        opacity: exitOpacity,
        display: 'flex',
        flexDirection: flip ? 'row-reverse' : 'row',
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ transform: `scale(${productScale * 0.82})` }}>
          <ProductShape accent={accent} glowShift={sweep} />
        </div>
      </div>
      <div style={{ flex: 1, padding: '0 90px', opacity: textOpacity, transform: `translateX(${textX}px)` }}>
        <div style={{ fontFamily, fontSize: 62, fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: -1.5 }}>
          {headline}
        </div>
        {subtext ? (
          <div style={{ fontFamily, fontSize: 25, fontWeight: 400, color: 'rgba(245,245,247,0.58)', marginTop: 22 }}>
            {subtext}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================
   ৫) সিন ৫ — ট্যাগলাইন: শব্দ একটার পর একটা ফোকাসে আসবে
   Scene 5 — Tagline: words blur into focus, one after another
   ============================================================ */
const TaglineScene = ({ bg, textPrimary, text, duration }) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  const exitOpacity = interpolate(frame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bg, opacity: exitOpacity, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1400, padding: 40 }}>
        {words.map((word, i) => {
          const delay = i * 6;
          const wordOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const blur = interpolate(frame, [delay, delay + 15], [12, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <span
              key={i}
              style={{
                fontFamily,
                fontSize: 86,
                fontWeight: 800,
                color: textPrimary,
                opacity: wordOpacity,
                filter: `blur(${blur}px)`,
                marginRight: 24,
                letterSpacing: -2,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================
   ৬) সিন ৬ — লোগো / এন্ড কার্ড
   Scene 6 — Logo / end card
   ============================================================ */
const LogoScene = ({ bg, accent, textPrimary, productName, ctaLine, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 18, stiffness: 140 } });
  const lineWidth = interpolate(frame, [10, 40], [0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [duration - 20, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bg, opacity: fadeOut, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${scale})` }}>
        <div style={{ fontFamily, fontSize: 54, fontWeight: 700, color: textPrimary, letterSpacing: 10 }}>
          {productName}
        </div>
        <div style={{ width: lineWidth, height: 3, background: accent, marginTop: 22, borderRadius: 2 }} />
        <div
          style={{
            fontFamily,
            fontSize: 23,
            fontWeight: 400,
            color: 'rgba(245,245,247,0.55)',
            marginTop: 22,
            opacity: ctaOpacity,
          }}
        >
          {ctaLine}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================
   ৭) মূল টাইমলাইন — সব সিন এখানে সাজানো (মোট ৫১০ ফ্রেম = ১৭ সেকেন্ড @30fps)
   Main timeline — every scene sequenced (510 frames = 17s @ 30fps)
   ============================================================ */
export const AppleAd = () => {
  const { productName, eyebrow, line1, line1Sub, line2, line2Sub, statement, ctaLine, accent, bg, textPrimary } =
    CONFIG;

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      <Sequence from={0} durationInFrames={70}>
        <IntroScene accent={accent} bg={bg} />
      </Sequence>

      <Sequence from={70} durationInFrames={120}>
        <ProductRevealScene accent={accent} bg={bg} productName={productName} eyebrow={eyebrow} duration={120} />
      </Sequence>

      <Sequence from={190} durationInFrames={90}>
        <FeatureScene
          accent={accent}
          bg={bg}
          textPrimary={textPrimary}
          headline={line1}
          subtext={line1Sub}
          duration={90}
        />
      </Sequence>

      <Sequence from={280} durationInFrames={90}>
        <FeatureScene
          accent={accent}
          bg={bg}
          textPrimary={textPrimary}
          headline={line2}
          subtext={line2Sub}
          flip
          duration={90}
        />
      </Sequence>

      <Sequence from={370} durationInFrames={80}>
        <TaglineScene bg={bg} textPrimary={textPrimary} text={statement} duration={80} />
      </Sequence>

      <Sequence from={450} durationInFrames={60}>
        <LogoScene bg={bg} accent={accent} textPrimary={textPrimary} productName={productName} ctaLine={ctaLine} duration={60} />
      </Sequence>

      <Grain />
    </AbsoluteFill>
  );
};
