import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Spatial Engine Context Failure:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#0d0e12',
            color: '#f8fafc',
            fontFamily: 'sans-serif',
            gap: '16px',
          }}
        >
          <AlertTriangle size={48} color="#ef4444" />
          <h2 style={{ fontSize: '20px', fontWeight: 600 }}>WebGL Context Lost</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '420px', textAlign: 'center' }}>
            {this.state.error?.message || 'An unexpected GPU memory or rendering context failure occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: '#0284c7',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            <RefreshCw size={14} /> Restart Spatial Engine
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}