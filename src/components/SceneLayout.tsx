import React from 'react';
import { AbsoluteFill } from 'remotion';

interface SceneLayoutProps {
  children: React.ReactNode;
  sceneNumber: number;
  totalScenes?: number;
}

export const SceneLayout: React.FC<SceneLayoutProps> = ({
  children,
  sceneNumber,
  totalScenes = 5,
}) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      {/* Main Brutalist Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
          border: '8px solid #1A1A1A',
          borderRadius: '24px',
          boxShadow: '12px 12px 0px #1A1A1A',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Scene Tag */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            backgroundColor: '#1A1A1A',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: '32px',
            padding: '12px 24px',
            borderRadius: '12px',
          }}
        >
          {sceneNumber}/{totalScenes}
        </div>
        {children}
      </div>
    </AbsoluteFill>
  );
};
