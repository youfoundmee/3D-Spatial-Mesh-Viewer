import React from 'react';
import { useSpatialStore } from '../store/useSpatialStore';
import { MeshNode } from '../types/spatial';
import { Sliders, Layers } from 'lucide-react';

export const ViewportControls: React.FC = () => {
  const nodes = useSpatialStore((s) => s.nodes);
  const setNodes = useSpatialStore((s) => s.setNodes);

  const generateNodes = (count: number) => {
    const newNodes: MeshNode[] = [];
    const radius = Math.cbrt(count) * 4;

    for (let i = 0; i < count; i++) {
      newNodes.push({
        id: `node-${i}`,
        position: [
          (Math.random() - 0.5) * radius * 2,
          (Math.random() - 0.5) * radius * 2,
          (Math.random() - 0.5) * radius * 2,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: [0.8 + Math.random() * 0.4, 0.8 + Math.random() * 0.4, 0.8 + Math.random() * 0.4],
        color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
      });
    }
    setNodes(newNodes);
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '14px 18px',
        color: '#f8fafc',
        fontFamily: 'sans-serif',
        zIndex: 10,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <Sliders size={16} color="#38bdf8" />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>Mesh Density Controls</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
        <Layers size={14} />
        <span>Active Meshes: <strong style={{ color: '#f8fafc' }}>{nodes.size}</strong></span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        {[500, 2500, 5000, 10000].map((count) => (
          <button
            key={count}
            onClick={() => generateNodes(count)}
            style={{
              background: nodes.size === count ? '#0284c7' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#f8fafc',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {count.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
};