import { useCurrentFrame, spring, useVideoConfig, random } from 'remotion';
import { SceneLayout } from '../components/SceneLayout';
import { BrutalText } from '../components/BrutalText';

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({ frame, fps, config: { damping: 20 } });

  // Glitch effect: rapidly offset text after frame 60
  const glitchOffset = frame > 60 ? random(frame) * 10 - 5 : 0;
  // Pixelation effect: scale down a duplicate text
  const pixelScale = frame > 80 ? 0.5 + random(frame) * 0.1 : 1;
  const pixelOpacity = frame > 80 ? 0.3 : 1;

  return (
    <SceneLayout sceneNumber={2}>
      <div style={{ transform: `scale(${textSpring})`, textAlign: 'center' }}>
        <BrutalText size={100}>LEVER</BrutalText>
        <BrutalText size={90} color="#E63946" italic>
          WORKERS?
        </BrutalText>
        <div style={{ position: 'relative' }}>
          <BrutalText size={60} color="#666">
            Gone.
          </BrutalText>
          {/* Glitch overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: glitchOffset,
              opacity: 0.5,
              transform: `scale(${pixelScale})`,
            }}
          >
            <BrutalText size={60} color="#FF0055">
              Gone.
            </BrutalText>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
};
