# 3D Spatial Mesh Viewer

A high-performance, real-time 3D spatial visualization platform engineered with **React**, **TypeScript**, **Three.js**, **React Three Fiber (R3F)**, and **Zustand**. Built to visualize high-density 3D geometric datasets and real-time telemetry feeds at a stable **60 FPS**.

---

## Technical Architecture & Performance Highlights

* **GPU Instanced Mesh Rendering (`THREE.InstancedMesh`)**: Eliminates draw-call bottlenecks by batching 2,500+ geometric meshes into a single GPU draw call, maintaining sub-16ms frame times.
* **View-Frustum Culling Pipeline**: Computes bounding sphere spatial intersections against camera frustum projection matrices on every frame tick (`useFrame`), skipping off-screen geometry processing.
* **Low-Latency Telemetry Engine**: Leverages Zustand with internal JavaScript `Map` data structures to process high-frequency WebSocket state mutations without triggering full virtual DOM re-renders.
* **Modular Component Architecture**: Decoupled rendering stage, state orchestration, and data contract layers adhering to strict TypeScript interfaces.

---

## Tech Stack

* **Core Engine**: React 18, TypeScript, Vite
* **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
* **State Management**: Zustand
* **Tooling**: ESLint, WebSockets, Git

---

## Getting Started

### Prerequisites
* Node.js >= 18.x
* npm >= 9.x

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
