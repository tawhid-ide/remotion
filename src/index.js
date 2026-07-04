import { registerRoot, Composition } from 'remotion';
import React from 'react';
import { AppleAd } from './AppleAd';

// Apple-স্টাইল কমার্শিয়াল — 1920x1080, 30fps, ৫১০ ফ্রেম (~17 সেকেন্ড)
const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AppleStyleAd"
        component={AppleAd}
        durationInFrames={510}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
