import React from 'react';
import { SpatialCanvas } from './components/SpatialCanvas';
import { ErrorBoundary } from './components/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <SpatialCanvas />
    </ErrorBoundary>
  );
};

export default App;