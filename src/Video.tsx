import { AbsoluteFill, Audio, staticFile, Sequence, useVideoConfig } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';

export const Video = () => {
  const { fps } = useVideoConfig();
  const sceneDuration = 4 * fps; // 120 frames (4 seconds per scene)

  return (
    <AbsoluteFill style={{ backgroundColor: '#F4F4F0' }}>
      
      {/* Voiceover Track Only */}
      <Audio src={staticFile('voiceover.mp3')} volume={1.0} />

      {/* Scenes */}
      <Sequence from={0} durationInFrames={sceneDuration}>
        <Scene1 />
      </Sequence>
      <Sequence from={sceneDuration} durationInFrames={sceneDuration}>
        <Scene2 />
      </Sequence>
      <Sequence from={sceneDuration * 2} durationInFrames={sceneDuration}>
        <Scene3 />
      </Sequence>
      <Sequence from={sceneDuration * 3} durationInFrames={sceneDuration}>
        <Scene4 />
      </Sequence>
      <Sequence from={sceneDuration * 4} durationInFrames={sceneDuration}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
