import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { SceneLayout } from '../components/SceneLayout';
import { BrutalText } from '../components/BrutalText';

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({ frame, fps, config: { damping: 15 } });
  const pulse = Math.sin(frame / 5) * 0.05 + 1; // Pulsing effect

  return (
    <SceneLayout sceneNumber={5}>
      <div style={{ transform: `scale(${textSpring})`, textAlign: 'center' }}>
        <BrutalText size={110} color="#E63946">
          $1 TRILLION
        </BrutalText>
        <BrutalText size={60}>in 24 hours.</BrutalText>

        <div style={{ marginTop: '80px' }}>
          <BrutalText size={50}>Comment</BrutalText>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#1A1A1A',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: '50px',
              padding: '20px 50px',
              borderRadius: '16px',
              border: '6px solid #E63946',
              transform: `scale(${pulse})`,
              marginTop: '10px',
            }}
          >
            "CLAUDE"
          </div>
          <BrutalText size={30} color="#666" style={{ marginTop: '20px' }}>
            and I'll send you nothing.
          </BrutalText>
        </div>
      </div>
    </SceneLayout>
  );
};
