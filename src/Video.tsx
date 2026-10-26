import { AbsoluteFill, Audio, staticFile, Sequence, useVideoConfig } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Avatar } from './components/Avatar';

export const Video = () => {
  const { fps } = useVideoConfig();
  const sceneDuration = 4 * fps; // 120 frames

  return (
    <AbsoluteFill style={{ backgroundColor: '#F4F4F0' }}>
      {/* Background Music with Ducking */}
      <Audio
        src={staticFile('bgm.mp3')}
        volume={(frame) => {
          // Duck the BGM whenever the voiceover is speaking
          // Adjust these frame ranges based on your actual voiceover timing
          const voiceoverSegments = [
            { start: 10, end: 100 },
            { start: 130, end: 220 },
            { start: 250, end: 340 },
            { start: 370, end: 460 },
            { start: 490, end: 590 },
          ];
          const isVoiceoverActive = voiceoverSegments.some(
            (seg) => frame >= seg.start && frame <= seg.end
          );
          return isVoiceoverActive ? 0.15 : 0.5; // Duck to 15% volume
        }}
      />

      {/* Voiceover Track */}
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

      {/* Persistent Avatar */}
      <Avatar />
    </AbsoluteFill>
  );
};
