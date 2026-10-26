import { useCurrentFrame, spring, useVideoConfig, interpolate, Easing } from 'remotion';
import { SceneLayout } from '../components/SceneLayout';
import { BrutalText } from '../components/BrutalText';

export const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({ frame, fps, config: { damping: 20 } });
  // Spinning core
  const rotation = interpolate(frame, [0, 120], [0, 360], {
    easing: Easing.linear,
  });
  const scale = spring({ frame: frame - 20, fps, config: { damping: 10 } });

  return (
    <SceneLayout sceneNumber={3}>
      <div style={{ transform: `scale(${textSpring})`, textAlign: 'center' }}>
        <BrutalText size={70}>I put Claude</BrutalText>
        <BrutalText size={80} color="#FF8C00">
          on my back
        </BrutalText>
        {/* Animated Core */}
        <div
          style={{
            margin: '40px auto',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            backgroundColor: '#1A1A1A',
            border: '8px solid #FF8C00',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `rotate(${rotation}deg) scale(${scale})`,
            boxShadow: '0px 0px 60px #FF8C00',
          }}
        >
          <span style={{ fontSize: '100px', color: '#FF8C00' }}>⚙️</span>
        </div>
        <BrutalText size={60} color="#666">
          ...now he's doing toilet for me.
        </BrutalText>
      </div>
    </SceneLayout>
  );
};
