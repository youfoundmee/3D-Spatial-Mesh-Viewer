import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { InstancedMeshViewer } from './InstancedMeshViewer';
import { NodeInspector } from './NodeInspector';
import { TelemetryHUD } from './TelemetryHUD';
import { useWebSocketSync } from '../hooks/useWebSocketSync';

interface SpatialCanvasProps {
  wsUrl?: string;
}

export const SpatialCanvas: React.FC<SpatialCanvasProps> = ({ wsUrl }) => {
  useWebSocketSync(wsUrl);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#0d0e12' }}>
      <TelemetryHUD />
      <NodeInspector />
      <Canvas camera={{ position: [25, 25, 25], fov: 60 }}>
        <Stats className="stats-panel" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[15, 30, 20]} intensity={1.2} />
        <InstancedMeshViewer />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};