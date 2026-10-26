import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { SceneLayout } from '../components/SceneLayout';
import { BrutalText } from '../components/BrutalText';

export const Scene4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({ frame, fps, config: { damping: 20 } });

  // Animate bars
  const bar1Height = interpolate(frame, [20, 60], [0, 150], { extrapolateRight: 'clamp' });
  const bar2Height = interpolate(frame, [40, 80], [0, 250], { extrapolateRight: 'clamp' });
  const bar3Height = interpolate(frame, [60, 100], [0, 400], { extrapolateRight: 'clamp' });

  return (
    <SceneLayout sceneNumber={4}>
      <div style={{ transform: `scale(${textSpring})`, textAlign: 'center' }}>
        <BrutalText size={70}>SOCIAL MEDIA</BrutalText>
        <BrutalText size={90} color="#2A9D8F">
          ON AUTOPILOT
        </BrutalText>

        {/* Animated Bar Chart */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '30px',
            height: '450px',
            marginTop: '40px',
          }}
        >
          <div style={{ width: '80px', height: bar1Height, backgroundColor: '#E9C46A', border: '4px solid #1A1A1A', borderRadius: '8px' }} />
          <div style={{ width: '80px', height: bar2Height, backgroundColor: '#F4A261', border: '4px solid #1A1A1A', borderRadius: '8px' }} />
          <div style={{ width: '80px', height: bar3Height, backgroundColor: '#E76F51', border: '4px solid #1A1A1A', borderRadius: '8px' }} />
        </div>
        <BrutalText size={40} color="#666" style={{ marginTop: '20px' }}>
          (Growth Not Included)
        </BrutalText>
      </div>
    </SceneLayout>
  );
};
