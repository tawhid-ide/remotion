import { Composition } from 'remotion';
import { Video } from './Video';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyVideo"
      component={Video}
      durationInFrames={600} // 20 seconds at 30fps
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
