import { registerRoot, Composition } from 'remotion';
import React from 'react';

// একটি সাধারণ ডেমো ভিডিও কম্পোনেন্ট
const MyVideo = () => {
  return (
    <div style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: 60, fontColor: 'black' }}>
      Hello Remotion!
    </div>
  );
};

// রিমোশনের রুট হিসেবে এটি রেজিস্টার করা হচ্ছে
const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={MyVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
    
