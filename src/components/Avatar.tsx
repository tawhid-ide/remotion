import { useCurrentFrame, spring, useVideoConfig, Img, staticFile, AbsoluteFill } from 'remotion';

export const Avatar = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Point starting at frame 60 (2 seconds in)
  const pointAnimation = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // Switch image after the animation starts
  const isPointing = frame > 65;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <Img
        src={staticFile(isPointing ? 'avatar-pointing.png' : 'avatar-neutral.png')}
        style={{
          position: 'absolute',
          bottom: '-40px',
          right: '-20px',
          width: '400px',
          transform: `translateY(${pointAnimation * -20}px) scale(${
            1 + pointAnimation * 0.02
          })`,
        }}
      />
    </AbsoluteFill>
  );
};
