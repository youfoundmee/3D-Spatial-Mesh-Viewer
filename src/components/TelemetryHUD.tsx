import React, { useState, useEffect } from 'react';
import { telemetrySimulator } from '../utils/mockTelemetryStream';
import { Activity, Play, Square } from 'lucide-react';

export const TelemetryHUD: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    telemetrySimulator.start(30);
    return () => telemetrySimulator.stop();
  }, []);

  const toggleStream = () => {
    if (isStreaming) {
      telemetrySimulator.stop();
      setIsStreaming(false);
    } else {
      telemetrySimulator.start(30);
      setIsStreaming(true);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '12px 16px',
        color: '#f8fafc',
        fontFamily: 'sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 10,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Activity size={18} color={isStreaming ? '#22c55e' : '#64748b'} />
      <div style={{ fontSize: '13px' }}>
        <div style={{ fontWeight: 600 }}>Spatial Telemetry Stream</div>
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
          {isStreaming ? 'Live • 30 updates/sec' : 'Paused'}
        </div>
      </div>
      <button
        onClick={toggleStream}
        style={{
          background: isStreaming ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
          border: `1px solid ${isStreaming ? '#ef4444' : '#22c55e'}`,
          color: isStreaming ? '#fca5a5' : '#86efac',
          borderRadius: '6px',
          padding: '6px 10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
        }}
      >
        {isStreaming ? <Square size={12} /> : <Play size={12} />}
        {isStreaming ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};