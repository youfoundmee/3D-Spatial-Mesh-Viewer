import type { MeshNode } from '../types/spatial';

export interface BoundingBox {
  min: [number, number, number];
  max: [number, number, number];
}

export class OctreeNode {
  bounds: BoundingBox;
  capacity: number;
  nodes: MeshNode[] = [];
  children: OctreeNode[] = [];
  divided: boolean = false;

  constructor(bounds: BoundingBox, capacity = 16) {
    this.bounds = bounds;
    this.capacity = capacity;
  }

  subdivide(): void {
    const [minX, minY, minZ] = this.bounds.min;
    const [maxX, maxY, maxZ] = this.bounds.max;
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const midZ = (minZ + maxZ) / 2;

    const childBounds: BoundingBox[] = [
      { min: [minX, minY, minZ], max: [midX, midY, midZ] },
      { min: [midX, minY, minZ], max: [maxX, midY, midZ] },
      { min: [minX, midY, minZ], max: [midX, maxY, midZ] },
      { min: [midX, midY, minZ], max: [maxX, maxY, midZ] },
      { min: [minX, minY, midZ], max: [midX, midY, maxZ] },
      { min: [midX, minY, midZ], max: [maxX, midY, maxZ] },
      { min: [minX, midY, midZ], max: [midX, maxY, maxZ] },
      { min: [midX, midY, midZ], max: [maxX, maxY, maxZ] },
    ];

    this.children = childBounds.map((b) => new OctreeNode(b, this.capacity));
    this.divided = true;
  }

  insert(node: MeshNode): boolean {
    if (!this.containsPoint(node.position)) return false;

    if (this.nodes.length < this.capacity && !this.divided) {
      this.nodes.push(node);
      return true;
    }

    if (!this.divided) this.subdivide();

    for (const child of this.children) {
      if (child.insert(node)) return true;
    }

    return false;
  }

  private containsPoint(point: [number, number, number]): boolean {
    return (
      point[0] >= this.bounds.min[0] &&
      point[0] <= this.bounds.max[0] &&
      point[1] >= this.bounds.min[1] &&
      point[1] <= this.bounds.max[1] &&
      point[2] >= this.bounds.min[2] &&
      point[2] <= this.bounds.max[2]
    );
  }

  queryRange(range: BoundingBox, found: MeshNode[] = []): MeshNode[] {
    if (!this.intersects(range)) return found;

    for (const node of this.nodes) {
      if (
        node.position[0] >= range.min[0] &&
        node.position[0] <= range.max[0] &&
        node.position[1] >= range.min[1] &&
        node.position[1] <= range.max[1] &&
        node.position[2] >= range.min[2] &&
        node.position[2] <= range.max[2]
      ) {
        found.push(node);
      }
    }

    if (this.divided) {
      for (const child of this.children) {
        child.queryRange(range, found);
      }
    }

    return found;
  }

  private intersects(range: BoundingBox): boolean {
    return !(
      range.min[0] > this.bounds.max[0] ||
      range.max[0] < this.bounds.min[0] ||
      range.min[1] > this.bounds.max[1] ||
      range.max[1] < this.bounds.min[1] ||
      range.min[2] > this.bounds.max[2] ||
      range.max[2] < this.bounds.min[2]
    );
  }
}