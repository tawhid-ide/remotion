import { useCurrentFrame, spring, useVideoConfig, interpolate, Easing } from 'remotion';
import { SceneLayout } from '../components/SceneLayout';
import { BrutalText } from '../components/BrutalText';

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({ frame, fps, config: { damping: 20 } });
  // Strikethrough line animates from 30 to 90 frames
  const lineWidth = interpolate(frame, [30, 90], [0, 100], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <SceneLayout sceneNumber={1}>
      <div style={{ transform: `scale(${textSpring})`, textAlign: 'center' }}>
        <BrutalText size={100}>CLAUDE</BrutalText>
        <BrutalText size={70} color="#666">
          just killed
        </BrutalText>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <BrutalText size={90} color="#E63946" italic>
            CAR DRIVERS.
          </BrutalText>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '0%',
              width: `${lineWidth}%`,
              height: '8px',
              backgroundColor: '#E63946',
              transform: 'translateY(-50%)',
            }}
          />
        </div>
      </div>
    </SceneLayout>
  );
};
