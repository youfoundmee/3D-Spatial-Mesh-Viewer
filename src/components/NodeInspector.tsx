import React from 'react';
import { useSpatialStore } from '../store/useSpatialStore';
import { SpatialState } from '../types/spatial';
import { X, Box } from 'lucide-react';

export const NodeInspector: React.FC = () => {
  const selectedNodeId = useSpatialStore((s: SpatialState) => s.selectedNodeId);
  const nodes = useSpatialStore((s: SpatialState) => s.nodes);
  const selectNode = useSpatialStore((s: SpatialState) => s.selectNode);

  if (!selectedNodeId) return null;
  const node = nodes.get(selectedNodeId);
  if (!node) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '280px',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '16px',
        color: '#f8fafc',
        fontFamily: 'sans-serif',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box size={18} color="#60a5fa" />
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Node Inspector</span>
        </div>
        <button
          onClick={() => selectNode(null)}
          style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <span style={{ color: '#94a3b8' }}>ID: </span>
          <code style={{ color: '#38bdf8' }}>{node.id}</code>
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>Color: </span>
          <span
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: node.color,
              borderRadius: '2px',
              marginRight: '6px',
              verticalAlign: 'middle',
            }}
          />
          <code>{node.color}</code>
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>Position: </span>
          <code>[{node.position.map((n: number) => n.toFixed(2)).join(', ')}]</code>
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>Rotation: </span>
          <code>[{node.rotation.map((n: number) => n.toFixed(2)).join(', ')}]</code>
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>Scale: </span>
          <code>[{node.scale.map((n: number) => n.toFixed(2)).join(', ')}]</code>
        </div>
      </div>
    </div>
  );
};