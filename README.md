# 3D Spatial Mesh Viewer

[![CI/CD Pipeline](https://github.com/youfoundmee/3D-Spatial-Mesh-Viewer/actions/workflows/ci.yml/badge.svg)](https://github.com/youfoundmee/3D-Spatial-Mesh-Viewer/actions)
[![Live Demo](https://img.shields.io/badge/demo-live_viewport-brightgreen)](https://youfoundmee.github.io/3D-Spatial-Mesh-Viewer/)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.x-blue)](https://nodejs.org/)

An enterprise-grade, real-time 3D spatial visualization platform engineered with **React**, **TypeScript**, **Three.js**, **React Three Fiber (R3F)**, and **Zustand**. Designed for massive geometric asset inspection and high-frequency telemetry streaming, the engine renders and queries **50,000+ instanced 3D nodes at a stable 60 FPS**.

---

## Live Demo

🚀 **[Explore the Live Interactive Viewport](https://youfoundmee.github.io/3D-Spatial-Mesh-Viewer/)**

---

## Technical Architecture & Performance Highlights

* **3D Octree Spatial Partitioning**: Replaced linear spatial lookups $O(N)$ with a custom 3D Octree partitioning algorithm ($O(\log N)$), enabling high-speed spatial range queries and spatial indexing across tens of thousands of mesh elements.
* **GPU Instanced Mesh Rendering (`THREE.InstancedMesh`)**: Eliminates draw-call bottlenecks by batching up to **50,000+ geometric meshes** into a single GPU draw call, maintaining sub-16ms frame render times.
* **Octree-Accelerated Frustum Culling**: Evaluates spatial node bounding points against active camera frustum matrices inside the frame loop (`useFrame`), culling off-screen transform matrices to optimize GPU allocation.
* **Low-Latency Telemetry Engine**: Integrates Zustand with internal JavaScript `Map` data structures to process high-frequency (30Hz) state updates with zero memory leaks and minimal React virtual DOM re-render overhead.
* **Automated CI/CD Pipeline**: GitHub Actions workflow executing strict TypeScript type checking (`tsc`), Jest unit test suites (`ts-jest`), and automated static deployment to GitHub Pages on Node 20 runtime.

---

## Tech Stack

* **Core Framework**: React 19, TypeScript, Vite
* **3D Graphics & Rendering**: Three.js, `@react-three/fiber`, `@react-three/drei`
* **Spatial Indexing & State**: Custom 3D Octree Architecture, Zustand
* **Testing & Quality Assurance**: Jest, `ts-jest`, `@testing-library/react`
* **CI/CD & Hosting**: GitHub Actions, GitHub Pages (Node.js v20.x)

---

## Getting Started

### Prerequisites

* **Node.js**: `>= 20.12.0`
* **npm**: `>= 9.x`

### Installation & Local Setup

```bash
# Clone repository
git clone [https://github.com/youfoundmee/3D-Spatial-Mesh-Viewer.git](https://github.com/youfoundmee/3D-Spatial-Mesh-Viewer.git)

# Navigate to project directory
cd 3D-Spatial-Mesh-Viewer

# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript compilation check
npx tsc --noEmit

# Execute Jest unit test suite
npm test

# Build production bundle
npm run build
