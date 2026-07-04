import { registerRoot, Composition, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence, AbsoluteFill, Img, staticFile } from 'remotion';
import React from 'react';

// ----- Apple Commercial Motion Graphic -----
const AppleAd = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animation helpers
  const fadeIn = (delay = 0) => {
    return interpolate(
      spring({
        frame: frame - delay,
        fps,
        config: { damping: 100, stiffness: 200, mass: 0.5 },
      }),
      [0, 1],
      [0, 1]
    );
  };

  const slideUp = (delay = 0) => {
    const progress = spring({
      frame: frame - delay,
      fps,
      config: { damping: 100, stiffness: 200, mass: 0.5 },
    });
    return interpolate(progress, [0, 1], [60, 0]);
  };

  const scaleIn = (delay = 0) => {
    const progress = spring({
      frame: frame - delay,
      fps,
      config: { damping: 100, stiffness: 200, mass: 0.5 },
    });
    return interpolate(progress, [0, 1], [0.8, 1]);
  };

  // Background gradient
  const gradientStyle = {
    background: `linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)`,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  return (
    <AbsoluteFill style={gradientStyle}>
      {/* Main Title – appears first */}
      <Sequence from={0} durationInFrames={40}>
        <div
          style={{
            opacity: fadeIn(0),
            transform: `translateY(${slideUp(0)}px) scale(${scaleIn(0)})`,
            fontFamily: 'Helvetica Neue, sans-serif',
            fontWeight: 'bold',
            fontSize: 80,
            color: 'white',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            letterSpacing: '2px',
            textAlign: 'center',
          }}
        >
          The Future.
        </div>
      </Sequence>

      {/* Product (iPhone-like) – appears after title */}
      <Sequence from={30} durationInFrames={80}>
        <div
          style={{
            opacity: fadeIn(30),
            transform: `translateY(${slideUp(30)}px) scale(${scaleIn(30)})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}
        >
          <svg
            width={300}
            height={600}
            viewBox="0 0 300 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Phone body */}
            <rect
              x="10"
              y="10"
              width="280"
              height="580"
              rx="40"
              fill="url(#phoneGradient)"
              stroke="white"
              strokeWidth="2"
              opacity="0.9"
            />
            {/* Screen */}
            <rect
              x="20"
              y="20"
              width="260"
              height="520"
              rx="30"
              fill="#1c1c1e"
            />
            {/* Dynamic Island */}
            <rect
              x="110"
              y="25"
              width="80"
              height="25"
              rx="12"
              fill="#2c2c2e"
            />
            {/* Camera */}
            <circle cx="150" cy="37" r="8" fill="#3a3a3c" />
            <circle cx="150" cy="37" r="4" fill="#5a5a5c" />
            {/* Glowing reflection animation */}
            <rect
              x="30"
              y="30"
              width="240"
              height="500"
              rx="25"
              fill="url(#screenGlow)"
              opacity={interpolate(
                spring({
                  frame: frame - 30,
                  fps,
                  config: { damping: 20, stiffness: 80, mass: 1 },
                }),
                [0, 1],
                [0.1, 0.4]
              )}
            />
            <defs>
              <linearGradient id="phoneGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2b2d42" />
                <stop offset="100%" stopColor="#8d99ae" />
              </linearGradient>
              <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4facfe" />
                <stop offset="100%" stopColor="#00f2fe" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </Sequence>

      {/* Tagline – appears at the end */}
      <Sequence from={80} durationInFrames={40}>
        <div
          style={{
            opacity: fadeIn(80),
            transform: `translateY(${slideUp(80)}px)`,
            fontFamily: 'Helvetica Neue, sans-serif',
            fontWeight: '300',
            fontSize: 28,
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '4px',
            marginTop: 30,
            textAlign: 'center',
          }}
        >
          Designed by Apple in California
        </div>
      </Sequence>

      {/* Subtle rotating ring background effect */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.05)',
          transform: `rotate(${frame * 0.2}deg)`,
          top: '50%',
          left: '50%',
          marginTop: -400,
          marginLeft: -400,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.03)',
          transform: `rotate(${-frame * 0.15}deg)`,
          top: '50%',
          left: '50%',
          marginTop: -300,
          marginLeft: -300,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

// ----- Remotion Root -----
const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AppleAd"
        component={AppleAd}
        durationInFrames={150} // 5 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
