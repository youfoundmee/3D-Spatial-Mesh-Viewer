import { describe, it, expect } from '@jest/globals';
import { OctreeNode, type BoundingBox } from '../utils/Octree';
import type { MeshNode } from '../types/spatial';

describe('Octree Spatial Index Engine', () => {
  const rootBounds: BoundingBox = {
    min: [-100, -100, -100],
    max: [100, 100, 100],
  };

  it('should successfully insert nodes within bounds', () => {
    const octree = new OctreeNode(rootBounds, 2);
    const node: MeshNode = {
      id: 'test-1',
      position: [10, 10, 10],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#00ff00',
    };

    expect(octree.insert(node)).toBe(true);
  });

  it('should query nodes accurately within a 3D bounding box', () => {
    const octree = new OctreeNode(rootBounds, 2);
    const node: MeshNode = {
      id: 'test-in-range',
      position: [5, 5, 5],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#00ff00',
    };

    octree.insert(node);

    const range: BoundingBox = {
      min: [0, 0, 0],
      max: [10, 10, 10],
    };

    const results = octree.queryRange(range);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('test-in-range');
  });
});