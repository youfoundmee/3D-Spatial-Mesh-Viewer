export interface MeshNode {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}

export interface SpatialState {
  nodes: Map<string, MeshNode>;
  selectedNodeId: string | null;
  setNodes: (nodes: MeshNode[]) => void;
  updateNode: (id: string, update: Partial<MeshNode>) => void;
  selectNode: (id: string | null) => void;
}